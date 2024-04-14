import React from "react";
import Link from "next/link";
import { IoSearchOutline as SearchIcon } from "react-icons/io5";
import { FiShoppingCart as CartIcon } from "react-icons/fi";

import NavTop from "./NavTop";
import NavBottom from "./NavBottom";

interface linkItem {
  id: number;
  name: string;
}
const Navbar: React.FC = () => {
  const navLinks: linkItem[] = [
    {
      id: 1,
      name: "Cateogries",
    },
    {
      id: 2,
      name: "Sale",
    },
    {
      id: 3,
      name: "Clearance",
    },
    {
      id: 4,
      name: "New Stock",
    },
    {
      id: 5,
      name: "Trending",
    },
  ];

  const extraLinks = [
    {
      id: 1,
      icon: <SearchIcon />,
    },
    {
      id: 2,
      icon: <CartIcon />,
    },
  ];
  return (
    <nav className=" max-w-screen static  flex  flex-col   ">
      <div className="ms-auto ">
        <NavTop />
      </div>

      <div className="flex justify-between  px-7 pb-5 pt-2">
        <div className="nav-link  text-2xl font-bold">
          <Link href="#">ECOMMERCE</Link>
        </div>

        <ul className="nav-link  mt-3 flex space-x-3 font-medium">
          {navLinks.map((item: linkItem) => (
            <li key={item.id}>
              <Link href="#">{item.name}</Link>
            </li>
          ))}
        </ul>
        <ul className="nav-link mt-3 flex items-center space-x-5 text-xl font-normal">
          {extraLinks.map((item) => (
            <li key={item.id}>
              <Link href="#">{item.icon}</Link>
            </li>
          ))}
        </ul>
      </div>
      <NavBottom />
    </nav>
  );
};

export default Navbar;
