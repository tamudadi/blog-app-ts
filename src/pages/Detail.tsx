import { useParams } from 'react-router';
import { PostInfo } from '../components/Post/PostInfo';
import { posts } from '../data/posts';

export const Detail = () => {
  const { id } = useParams<{ id: string }>();
  const post = posts.find((post) => post.id === Number(id));

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
