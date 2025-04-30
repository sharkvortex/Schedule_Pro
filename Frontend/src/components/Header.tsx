import ToggleTheme from "./TogleTheme";
import Username from "./Username";
import { Link } from "react-router-dom";
function Header() {
  return (
    <header className="sm:px-6 py-4 px-2  flex  sm:justify-between justify-end items-center transition-all ">
      <Link to={"/"}>
        <h1 className="sm:text-xl hidden sm:flex  font-bold">SCHEDULE PRO</h1>
      </Link>
      <div className="flex gap-5">
        <Username />
        <ToggleTheme />
      </div>
    </header>
  );
}

export default Header;
