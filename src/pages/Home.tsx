import { Link } from 'react-router';
import { PostInfo } from '../components/Post/PostInfo';
import { posts } from '../data/posts';

export const Home = () => {
  return (
    <ul className="py-10 px-4 flex flex-col gap-8">
      {posts.map((post) => (
        <li className="border border-gray-300 p-4">
          <Link to={`/posts/${post.id}`}>
            <PostInfo createdAt={post.createdAt} categories={post.categories} />
            <div className="text-2xl mt-2 mb-4">{`APIで取得した${post.title}`}</div>
            <div
              className="line-clamp-2"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </Link>
        </li>
      ))}
    </ul>
  );
};
