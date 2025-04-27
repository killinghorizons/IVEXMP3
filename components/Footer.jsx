// Components
import Logo from "@/components/Logo";

const Footer = () => {
  return (
    <footer className="px-5 bg-background border-t border-dark dark:border-light">
      <div className="max-w-xl mx-auto">
        <div className="flex items-center justify-between h-16">
          <Logo />
          &copy;KH
        </div>
      </div>
    </footer>
  );
};

export default Footer;
