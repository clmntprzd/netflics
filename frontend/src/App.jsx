import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';
import About from './pages/About/About';
import Layout from './components/Layout/Layout';
import Counter from './pages/Counter/Counter';
import Users from './pages/Users/Users';
import Genres from './pages/Genres/Genres';
import Film from './pages/Film/Film';
function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="counter" element={<Counter />} />
        <Route path="genres" element={<Genres />} />
        <Route path="users" element={<Users />} />
        <Route path="about" element={<About />} />
        <Route path="film" element={<Film />} />
      </Routes>
    </Layout>
  );
}

export default App;
