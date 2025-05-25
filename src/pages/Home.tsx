import { posts } from '../data/posts';

export const Home = () => {
  return (
    <ul className="py-10 px-4 flex flex-col gap-8">
      {posts.map((post) => (
        <li className="border border-gray-300 p-4">
          <div className="flex justify-between">
            <div className="text-xs text-gray-500">
              {new Date(post.createdAt).toLocaleDateString()}
            </div>
            <div className="flex gap-2">
              {post.categories.map((category) => (
                <div className="border rounded border-blue-700 p-1 text-xs text-blue-700">
                  {category}
                </div>
              ))}
            </div>
          </div>
          <div className="text-2xl mt-2 mb-4">{`APIで取得した${post.title}`}</div>
          <div
            className="line-clamp-2"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </li>
      ))}
    </ul>
  );
};
