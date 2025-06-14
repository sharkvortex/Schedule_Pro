import ToggleTheme from "./TogleTheme";
import Username from "./Username";
import { Link } from "react-router-dom";
import { StretchHorizontal } from "lucide-react";
function Header() {
  return (
    <header className="sm:px-6 py-4 px-4  flex  sm:justify-between justify-between items-center transition-all ">
      <Link className="flex items-center gap-x-4" to={"/"}>
        <StretchHorizontal />
        <h5 className="sm:text-xl justify-center hidden sm:flex font-medium">
          Sked Pro
        </h5>
        
        <span className="sr-only">Sked Pro</span>
      </Link>
      <div className="flex gap-5">
        <Username />
        <ToggleTheme />
      </div>
    </header>
  );
}

export default Header;
