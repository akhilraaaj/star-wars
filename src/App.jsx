import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Planets from './components/Planets';
import Residents from './components/Residents';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Page404 from './components/Page404'; 

const App = () => {
  return (
    <div className='overflow-x-hidden'>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Planets />} />
          <Route path="/planets/:name/residents" element={<Residents />} />
          <Route path="*" element={<Page404 />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
};

export default App;
