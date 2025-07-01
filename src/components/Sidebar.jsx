import { useState } from "react";
import logo from "../assets/cassette.png";
import { links } from "../assets/constants";
import { NavLink } from "react-router-dom";
import { RiCloseCircleLine, RiCloseLine } from "react-icons/ri";
import { HiOutlineMenu } from "react-icons/hi";

const Sidebar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const NavLinks = ({ handleClick }) => (
    <div className="mt-10">
      {links.map((item) => (
        <NavLink
          key={item.name}
          to={item.to}
          onClick={() => handleClick && handleClick()}
          className="flex flew-row justify-start items-center my-8 etxt-sm font-medium text-gray-400 hover:text-cyan-400"
        >
          <item.icon className="w-6 h-6 mr-2" />
          {item.name}
        </NavLink>
      ))}
    </div>
  );

  return (
    <div>
      <div className="md:flex hidden flex-col h-full w-[240px] py-10 px-4 bg-[#191624]">
        <img src={logo} alt="logo" className="w-full h-32 object-contain -hue-rotate-180" />
        <NavLinks />
      </div>

      <div className="absolute hover:cursor-pointer md:hidden block top-6 right-3">
        {mobileMenuOpen ? (
          <RiCloseLine className="w-6 h-6 text-white mr-2" onClick={()=> setMobileMenuOpen(false)} />
        ) : (
          <HiOutlineMenu onClick={()=> setMobileMenuOpen(true)} className="w-6 h-6 text-white mr-2" />
        )}
      </div>

            <div className={`absolute top-0 h-screen w-2/3 bg-gradient-to-tl from-white/10 to-[#483d8b] backdrop-blur-lg z-10 md:hidden smooth-transition p-6 ${mobileMenuOpen? 'left-0' : '-left-full'}`}>
        <img src={logo} alt="logo" className="w-full h-32 object-contain" />
        <NavLinks handleClick={()=>setMobileMenuOpen(false)} />
      </div>
    </div>
  );
};

export default Sidebar;
