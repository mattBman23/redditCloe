import { AppProps } from 'next/app';
import axios from 'axios';
import { useRouter } from 'next/router';

import { Navbar } from '../components/Navbar';
import '../styles/tailwind.css';
import '../styles/icons.css';
import { AuthProvider } from '../context/auth';

axios.defaults.baseURL = 'http://localhost:5050/api';
axios.defaults.withCredentials = true;

function App({ Component, pageProps }: AppProps) {
  const { pathname } = useRouter();
  const authRoutes = ['/register', '/login'];
  const authRoute = authRoutes.includes(pathname);
  return (
    <AuthProvider>
      {!authRoute && <Navbar />}
      <Component {...pageProps} />
    </AuthProvider>
  );
}

export default App;
