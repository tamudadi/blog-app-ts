import { Route, Routes } from 'react-router';
import { Header } from './components/Header';
import { Contact } from './pages/Contact';
import { Detail } from './pages/Detail';
import { Home } from './pages/Home';

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/posts/:id" element={<Detail />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </>
  );
}

export default App;
