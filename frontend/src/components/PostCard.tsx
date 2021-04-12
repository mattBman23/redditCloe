import Link from 'next/link';
import { Fragment } from 'react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import classNames from 'classnames';

import { Post } from '../types';
import axios from 'axios';

dayjs.extend(relativeTime);

const ActionButton = ({ children }) => {
  return (
    <div className="px-1 py-1 mr-1 text-xs text-gray-500 rounded cursor-pointer hover:bg-gray-200">
      {children}
    </div>
  );
};

interface PostCardProps {
  post: Post;
}

export const PostCard = ({
  post: {
    identifier,
    slug,
    title,
    body,
    subName,
    createdAt,
    voteScore,
    userVote,
    username,
    commentCount,
    url,
  },
}: PostCardProps) => {
  const vote = async (value: number) => {
    try {
      const res = await axios.post('/misc/vote', {
        identifier,
        slug,
        value,
      });

      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div key={identifier} className="flex mb-4 bg-white rounded">
      <div className="w-10 py-3 text-center bg-gray-200 rounded-l">
        {/* up vote */}
        <div
          onClick={() => vote(1)}
          className="w-6 mx-auto text-gray-400 rounded cursor-pointer hover:bg-gray-300 hover:text-red-500"
        >
          <i
            className={classNames('icon-arrow-up', {
              'text-red-500': userVote === 1,
            })}
          />
        </div>
        <p>{voteScore}</p>
        {/* down vote */}
        <div
          onClick={() => vote(-1)}
          className="w-6 mx-auto text-gray-400 rounded cursor-pointer hover:bg-gray-300 hover:text-blue-500"
        >
          <i
            className={classNames('icon-arrow-down', {
              'text-blue-500': userVote === -1,
            })}
          />
        </div>
      </div>

      <div className="w-full p-2">
        <div className="flex items-center">
          <Link href={`/r/${subName}`}>
            <Fragment>
              <img
                src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50"
                className="w-6 h-6 mr-1 rounded-full cursor-pointer"
              />

              <a className="text-xs font-bold cursor-pointer hover:underline">
                /r/{subName}
              </a>
            </Fragment>
          </Link>
          <p className="text-gray-600 text xs">
            <span className="mx-1">•</span>
            Posted by{' '}
            <Link href={`/u/${username}`}>
              <a className="mx-1 hover:underline">/u/{username}</a>
            </Link>
            <Link href={`/r/${subName}/${identifier}/${slug}`}>
              <a className="mb-1 hover:underline">
                {dayjs(createdAt).fromNow()}
              </a>
            </Link>
          </p>
        </div>
        <Link href={url}>
          <a className="my-1 text-lg-font-medium">{title}</a>
        </Link>
        {body && <p className="my-1 text-sm">{body}</p>}

        <div className="flex">
          <Link href={url}>
            <a>
              <ActionButton>
                <i className="mr-1 fas fa-comment-alt fa-xs" />
                <span className="font-bold">{commentCount} Comments</span>
              </ActionButton>
            </a>
          </Link>
          <Link href={url}>
            <a>
              <ActionButton>
                <i className="mr-1 fas fa-share " />
                <span className="font-bold">Share</span>
              </ActionButton>
            </a>
          </Link>
          <Link href={url}>
            <a>
              <ActionButton>
                <i className="mr-1 fas fa-bookmark fa-xs" />
                <span className="font-bold">Save</span>
              </ActionButton>
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
};
