import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { PostInfo } from '../components/Post/PostInfo';
import { Post } from '../data/posts';

export const Home = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(
          'https://1hmfpsvto6.execute-api.ap-northeast-1.amazonaws.com/dev/posts'
        );
        const { posts } = await res.json();
        setPosts(posts);
      } catch (error) {
        console.error(error);
        setError('記事の取得に失敗しました。');
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (error) return <div>{error}</div>;
  if (isLoading) return <div>読み込み中。。。。。。</div>;
  if (posts.length === 0) return <div>記事が見つかりません</div>;

  return (
    <ul className="py-10 px-4 flex flex-col gap-8">
      {posts.map((post) => (
        <li key={post.id} className="border border-gray-300 p-4">
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
