import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { PostInfo } from '../components/Post/PostInfo';
import { Post } from '../types/post';

export const Detail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setIsLoading(true);
        const res = await fetch(
          `https://1hmfpsvto6.execute-api.ap-northeast-1.amazonaws.com/dev/posts/${id}`
        );
        const { post } = await res.json();
        setPost(post);
      } catch (error) {
        console.error(error);
        setError('記事の取得に失敗しました。');
      } finally {
        setIsLoading(false);
      }
    };
    fetchPost();
  }, [id]);

  if (error) return <div>{error}</div>;
  if (isLoading) return <div>読み込み中。。。。。。</div>;
  if (!post) return <div>記事が見つかりません</div>;

  return (
    <div className="my-12">
      <img className="px-4" src={post.thumbnailUrl} alt="" />
      <div className="py-4 px-8">
        <PostInfo createdAt={post.createdAt} categories={post.categories} />
        <div className="text-2xl mt-2 mb-4">{`APIで取得した${post.title}`}</div>
        <div dangerouslySetInnerHTML={{ __html: post.content }} />
      </div>
    </div>
  );
};
