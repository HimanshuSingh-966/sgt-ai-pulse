import { Link } from "react-router-dom";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import sgtLogo from "@/assets/sgt-logo.png";
import aiClubLogo from "@/assets/ai-club-logo.png";

interface HeaderProps {
  onSearch?: (query: string) => void;
}

const Header = ({ onSearch }: HeaderProps) => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 py-3 md:py-4">
        <div className="flex items-center justify-between gap-2 md:gap-4">
          <Link to="/" className="flex items-center gap-2 md:gap-4">
            <img src={sgtLogo} alt="SGT University" className="h-10 md:h-12 w-auto" />
            <img src={aiClubLogo} alt="AI Club" className="h-10 md:h-12 w-auto" />
          </Link>
          
          {/* Desktop Navigation */}
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

          {/* Mobile Navigation */}
          <Sheet>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <nav className="flex flex-col gap-4 mt-8">
                <Link to="/" className="text-base font-medium transition-colors hover:text-primary py-2">
                  Home
                </Link>
                <Link to="/news" className="text-base font-medium transition-colors hover:text-primary py-2">
                  News
                </Link>
                <Link to="/events" className="text-base font-medium transition-colors hover:text-primary py-2">
                  Events
                </Link>
                <Link to="/research" className="text-base font-medium transition-colors hover:text-primary py-2">
                  Research
                </Link>
                <Link to="/admin/login" className="text-base font-medium transition-colors hover:text-accent py-2">
                  Admin
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Header;
