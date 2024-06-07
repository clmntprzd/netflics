import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';
import About from './pages/About/About';
import Layout from './components/Layout/Layout';
import Counter from './pages/Counter/Counter';
import Users from './pages/Users/Users';
import Recommandation from './pages/Recommandation/Recommandation';
import Film from './pages/Film/Film';
import Search from './pages/Search/Search';
import Likes from './pages/Likes/Likes';
function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="counter" element={<Counter />} />
        <Route path="recommandation" element={<Recommandation />} />
        <Route path="users" element={<Users />} />
        <Route path="about" element={<About />} />
        <Route path="film" element={<Film />} />
        <Route path="search" element={<Search />} />
        <Route path="liked" element={<Likes />} />
      </Routes>
    </Layout>
  );
}

export default App;
