import axios from 'axios';
import Head from 'next/head';
import { useEffect, useState } from 'react';

import { Post } from '../types';
import { GetServerSideProps } from 'next';
import { PostCard } from '../components/PostCard';

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    axios
      .get('/posts')
      .then((res) => setPosts(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="pt-12">
      <Head>
        <title>Reddit</title>
      </Head>

      <div className="container flex pt-4">
        <div className="w-160">
          {posts.map((post) => (
            <PostCard post={post} key={post.identifier} />
          ))}
        </div>
      </div>
    </div>
  );
}

// export const getServerSideProps: GetServerSideProps = async (context) => {
//   try {
//     const res = await axios.get('/posts');

//     return {
//       props: { posts: res.data },
//     };
//   } catch (err) {
//     return {
//       props: { error: 'Something went wrong...' },
//     };
//   }
// };
