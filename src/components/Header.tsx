import { Link } from 'react-router';
export const Header = () => {
  return (
    <header className="bg-[#333] text-white flex justify-between p-6 font-bold">
      <Link to="/">Blog</Link>
      <Link to="/contact">お問い合わせ</Link>
    </header>
  );
};
