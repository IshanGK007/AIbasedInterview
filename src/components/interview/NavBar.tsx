import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Home, Settings, User, LogOut, Menu } from "lucide-react";
import LanguageSelector from "./LanguageSelector";
import { useNavigate } from "react-router-dom";

interface NavBarProps {
  onSettingsClick?: () => void;
}

const NavBar = ({ onSettingsClick = () => {} }: NavBarProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <nav className="bg-background border-b py-3 px-4 sticky top-0 z-10">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu className="h-5 w-5" />
          </Button>
          <h1
            className="text-xl font-bold cursor-pointer"
            onClick={() => navigate("/")}
          >
            AI Interview Coach
          </h1>
        </div>

        <div className="hidden md:flex items-center space-x-6">
          <Button variant="ghost" onClick={() => navigate("/")}>
            <Home className="h-4 w-4 mr-2" />
            Dashboard
          </Button>
          <Button variant="ghost" onClick={() => navigate("/practice")}>
            Practice
          </Button>
          <Button variant="ghost" onClick={() => navigate("/analytics")}>
            Analytics
          </Button>
          <Button variant="ghost" onClick={() => navigate("/history")}>
            History
          </Button>
        </div>

        <div className="flex items-center gap-3">
          <LanguageSelector />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=interview" />
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <User className="h-4 w-4 mr-2" />
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem onClick={onSettingsClick}>
                <Settings className="h-4 w-4 mr-2" />
                API Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <LogOut className="h-4 w-4 mr-2" />
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-background border-b shadow-lg p-4">
          <div className="flex flex-col space-y-2">
            <Button variant="ghost" onClick={() => navigate("/")}>
              <Home className="h-4 w-4 mr-2" />
              Dashboard
            </Button>
            <Button variant="ghost" onClick={() => navigate("/practice")}>
              Practice
            </Button>
            <Button variant="ghost" onClick={() => navigate("/analytics")}>
              Analytics
            </Button>
            <Button variant="ghost" onClick={() => navigate("/history")}>
              History
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
