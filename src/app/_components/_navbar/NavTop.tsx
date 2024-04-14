import Link from "next/link";

const NavTop: React.FC = () => {
  const linkItems = [
    { id: 1, name: "Help" },
    { id: 2, name: "Order & Returns" },
    { id: 3, name: "Hi, John" },
  ];
  return (
    <ul className=" nav-link mr-7 mt-2 flex gap-3 text-xs text-[#64748b]">
      {linkItems.map((item) => (
        <li key={item.id}>
          <Link href="#">{item.name}</Link>
        </li>
      ))}
    </ul>
  );
};

export default NavTop;
