import axios from 'axios';
import Head from 'next/head';
import Link from 'next/link';
import { FormEvent, useState } from 'react';
import { useRouter } from 'next/router';

import { useAuthDispatch, useAuthState } from '../context/auth';
import InputGroup from '../components/InputGroup';

export default function Login() {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [errors, setErrors] = useState<any>({});

  const dispatch = useAuthDispatch();
  const { authenticated } = useAuthState();

  const router = useRouter();

  if (authenticated) router.push('/');

  const loginHandler = async (e: FormEvent) => {
    setErrors({});

    e.preventDefault();

    try {
      const res = await axios.post('/auth/login', {
        username,
        password,
      });

      dispatch('LOGIN', res.data);

      router.push('/');
    } catch (err) {
      setErrors(err.response.data);
    }
  };

  return (
    <div className="flex bg-white">
      <Head>
        <title>Login</title>
      </Head>

      <div
        className="h-screen bg-cover w-52"
        style={{ backgroundImage: "url('/assets/images/reddit.png')" }}
      ></div>

      <div className="flex flex-col justify-center pl-6">
        <div className="w-72">
          <h1 className="mb-4 text-lg font-bold">Login</h1>
          <form onSubmit={loginHandler}>
            <InputGroup
              className="mb-2"
              type="text"
              value={username}
              setValue={setUsername}
              placeholder="Username"
              error={errors.username}
            />
            <InputGroup
              className="mb-2"
              type="password"
              value={password}
              setValue={setPassword}
              placeholder="Password"
              error={errors.username}
            />

            <button
              type="submit"
              className="w-full py-2 mb-4 text-sm font-bold text-white uppercase transition duration-200 bg-blue-500 border border-blue-500 rounded hover:bg-blue-400 hover:border-blue-400"
            >
              Login
            </button>
          </form>
          <small>
            Not a redditor?
            <Link href="/register">
              <a className="ml-1 text-blue-500">Register</a>
            </Link>
          </small>
        </div>
      </div>
    </div>
  );
}
