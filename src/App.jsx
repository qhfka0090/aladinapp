import './assets/css/style.scss'
import { Route, Routes } from 'react-router-dom';
import Header from './components/Header'
import Home from './pages/Home';
import Footer from './components/Footer';
import Cart from './pages/Cart';
import Product from './pages/Product';


function App() {

  return (
    <section>
      <Header />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path='/product/:id' element={<Product />} />
        <Route path='/cart' element={<Cart />} />
      </Routes>
      <Footer />
    </section>
  )
}

export default App
