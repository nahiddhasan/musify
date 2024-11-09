import { BiLoaderCircle } from "react-icons/bi";
const ButtonLoader = ({ className }) => {
  return <BiLoaderCircle className={`animate-spin  ${className}`} />;
};

export default ButtonLoader;
