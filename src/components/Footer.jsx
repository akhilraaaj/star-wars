import { Link } from 'react-router-dom';  
import starWars from '../assets/star-wars.svg'; 
import logo from '../assets/logo.svg';

const Footer = () => {
  return (
    <footer className="footer foot items-center px-10 p-4 flex justify-between md:mt-1 mt-8">
      <aside className="flex items-center">
        <Link to="/">
          <img src={logo} alt="" width={40} height={40} className="ml-2" />
        </Link>
        <p className="ml-2 text-xl font-bold">Star Wars © 2024</p>
      </aside>
      <Link to="/">
        <img src={starWars} alt="" width={80} height={80} className="ml-2" />
      </Link>
    </footer>  
  );
};

export default Footer;
