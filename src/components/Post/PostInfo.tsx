type PostInfoProps = {
  createdAt: string;
  categories: string[];
};

export const PostInfo = ({ createdAt, categories }: PostInfoProps) => {
  return (
    <div className="flex justify-between">
      <div className="text-xs text-gray-500">
        {new Date(createdAt).toLocaleDateString()}
      </div>
      <div className="flex gap-2">
        {categories.map((category) => (
          <div
            key={category}
            className="border rounded border-blue-700 p-1 text-xs text-blue-700"
          >
            {category}
          </div>
        ))}
      </div>
    </div>
  );
};
