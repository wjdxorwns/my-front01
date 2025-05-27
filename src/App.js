import './App.css';
import './styles/Header.css';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Header from './components/Header';
import Footer from './components/Footer';
import Main from './pages/Main';
import Signup from './pages/Signup';
import Productdetail from './pages/productdetail';

function App() {
  return (
    <div className='app-container'>
    <BrowserRouter>
    <Header></Header>
    <div className='main-content'>
      <Routes>
        <Route path='/' element={<Main/>} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
         <Route path='/productdetail/:id' element={<Productdetail />} />
      </Routes>
      </div>
      <Footer></Footer>
    </BrowserRouter>
    </div>
  );
}

export default App;