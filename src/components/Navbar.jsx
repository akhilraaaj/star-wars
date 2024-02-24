import { Link } from "react-router-dom"
import logo from '../assets/logo.svg'
import GitHub from '../assets/github.svg'

const Navbar = () => {
  return (
    <div className="flex justify-between shadow-xl">
      <div className="navbar nav bg-[rgb(238,46,43)] font-extrabold text-black">
        <Link to="/" className="flex-1 ml-4">
          <p className="text-2xl font-extrabold">Star Wars</p>
          <img src={logo} alt="" width={35} height={35} className="ml-2" />
        </Link>
        <div className="flex px-4">
          <a href="http://github.com/akhilraaaj" target='_blank'>
            <img src={GitHub} alt="" width={35} height={35} />
          </a>
        </div>
      </div>
    </div>
  )
}

export default Navbar;

{/* <div className="dropdown mb-72">
  <div tabIndex={0} role="button" className="btn m-1">
    Theme
    <svg width="12px" height="12px" className="h-2 w-2 fill-current opacity-60 inline-block" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048"><path d="M1799 349l242 241-1017 1017L7 590l242-241 775 775 775-775z"></path></svg>
  </div>
  <ul tabIndex={0} className="dropdown-content z-[1] p-2 shadow-2xl bg-base-300 rounded-box w-52">
     </ul>
</div> */}