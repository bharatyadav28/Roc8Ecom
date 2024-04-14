import {
  MdKeyboardArrowLeft as LeftArrow,
  MdKeyboardArrowRight as RightArrow,
} from "react-icons/md";

const NavBottom: React.FC = () => {
  return (
    <div className="flex items-center justify-center space-x-4 bg-gray-100  py-2 text-xs font-medium">
      <div className="ml-20">
        <LeftArrow />
      </div>
      <div>Get 10% off on business signup</div>
      <div>
        <RightArrow />
      </div>
    </div>
  );
};

export default NavBottom;
