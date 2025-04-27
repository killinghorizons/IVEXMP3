// Components
import Logo from "@/components/Logo";
import ThemeToggle from "@/components/ThemeToggle";

const Navbar = () => {
  return (
    <header className="fixed top-0 left-0 w-full px-5 bg-background z-50 shadow-xl bg-light dark:bg-dark backdrop-blur-xs">
      <div className="max-w-xl mx-auto">
        <div className="flex items-center justify-between h-16">
          <Logo />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
