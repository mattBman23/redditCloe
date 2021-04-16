import axios from 'axios';
import Head from 'next/head';
import { Fragment, useEffect, useState } from 'react';

import { Post } from '../types';
import { GetServerSideProps } from 'next';
import { PostCard } from '../components/PostCard';
import useSWR from 'swr';

export default function Home() {
  const { data: posts } = useSWR('/posts');

  return (
    <Fragment>
      <Head>
        <title>Reddit</title>
      </Head>

      <div className="container flex pt-4">
        <div className="w-160">
          {posts?.map((post) => (
            <PostCard post={post} key={post.identifier} />
          ))}
        </div>
      </div>
    </Fragment>
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
