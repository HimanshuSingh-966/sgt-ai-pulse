import { Link } from "react-router-dom";
import { Search, Activity } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import sgtLogo from "@/assets/sgt-logo.png";
import aiClubLogo from "@/assets/ai-club-logo.png";

interface HeaderProps {
  onSearch?: (query: string) => void;
}

const Header = ({ onSearch }: HeaderProps) => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-4">
          <Link to="/" className="flex items-center gap-4">
            <img src={sgtLogo} alt="SGT University" className="h-12 w-auto" />
            <img src={aiClubLogo} alt="AI Club" className="h-12 w-auto" />
          </Link>
          
          <nav className="hidden md:flex items-center gap-6">
            <Link to="/" className="text-sm font-medium transition-colors hover:text-primary">
              Home
            </Link>
            <Link to="/news" className="text-sm font-medium transition-colors hover:text-primary">
              News
            </Link>
            <Link to="/events" className="text-sm font-medium transition-colors hover:text-primary">
              Events
            </Link>
            <Link to="/research" className="text-sm font-medium transition-colors hover:text-primary">
              Research
            </Link>
            <Link to="/admin/login" className="text-sm font-medium transition-colors hover:text-accent">
              Admin
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
