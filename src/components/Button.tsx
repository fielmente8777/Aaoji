import Link from "next/link";
interface ButtonProps {
  href: string;
  label: string;
  className?: string;
  newTabe?: boolean;
}
const Button: React.FC<ButtonProps> = ({
  href,
  label,
  className = "",
  newTabe = false,
}) => {
  return (
    <Link
      href={href}
      target={newTabe ? "_blank" : "_self"}
      rel="noopener noreferrer"
      className={`text-white bg-primary text-base capitalize py-3 px-6 description2 avenir-book rounded-full font-medium  transition-all duration-300 ease-in-out hover:scale-[1.1] active:scale-100 ${className}`}
    >
      {label}
    </Link>
  );
};

export default Button;
