import { FaCopyright } from "react-icons/fa";

const Footer = () => {
  const footerYear = new Date().getFullYear();

  return (
    <footer className="footer p-4 mt-12 justify-center bg-secondary rounded-tr-full text-secondary-content">
      <div className="flex items-center">
        <p>Copyright</p>
        <FaCopyright />
        <p>{footerYear} lucius all right reserved</p>
      </div>
    </footer>
  );
};

export default Footer;
