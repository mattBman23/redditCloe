import axios from 'axios';
import Head from 'next/head';
import Link from 'next/link';
import { FormEvent, useState } from 'react';
import { useRouter } from 'next/router';
import InputGroup from '../components/InputGroup';
import { useAuthState } from '../context/auth';

export default function Register() {
  const [email, setEmail] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [password2, setPassword2] = useState<string>('');
  const [errors, setErrors] = useState<any>({});

  const { authenticated } = useAuthState();

  const router = useRouter();

  if (authenticated) router.push('/');

  const registerHandler = async (e: FormEvent) => {
    setErrors({});

    e.preventDefault();

    if (password2 !== password) {
      setErrors({
        password: 'Passwords does not match',
      });
      return;
    }

    try {
      await axios.post('/auth/register', {
        email,
        password,
        username,
      });

      router.push('/login');
    } catch (err) {
      setErrors(err.response.data);
    }
  };

  return (
    <div className="flex bg-white">
      <Head>
        <title>Register</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div
        className="h-screen bg-cover w-52"
        style={{ backgroundImage: "url('/assets/images/reddit.png')" }}
      ></div>

      <div className="flex flex-col justify-center pl-6">
        <div className="w-72">
          <h1 className="mb-4 text-lg font-bold">Sign Up</h1>
          <form onSubmit={registerHandler}>
            <InputGroup
              className="mb-2"
              type="email"
              value={email}
              setValue={setEmail}
              placeholder="Email"
              error={errors.email}
            />
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
              error={errors.password}
            />
            <InputGroup
              className="mb-4"
              type="password"
              value={password2}
              setValue={setPassword2}
              placeholder="Confirm Password"
              error={errors.password2}
            />

            <button
              type="submit"
              className="w-full py-2 mb-4 text-sm font-bold text-white uppercase transition duration-200 bg-blue-500 border border-blue-500 rounded hover:bg-blue-400 hover:border-blue-400"
            >
              Sign Up
            </button>
          </form>
          <small>
            Already a redditor?
            <Link href="/login">
              <a className="ml-1 text-blue-500">Login</a>
            </Link>
          </small>
        </div>
      </div>
    </div>
  );
}
