import { Mail, Globe, Linkedin, Twitter } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="border-t border-border bg-muted/30">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <h3 className="mb-4 text-lg font-bold">AI Club - SGT University</h3>
            <p className="text-sm text-muted-foreground">
              Empowering students with artificial intelligence knowledge and fostering innovation through collaborative learning.
            </p>
          </div>
          
          <div>
            <h4 className="mb-4 text-sm font-semibold">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="text-muted-foreground transition-colors hover:text-primary">
                  Home
                </Link>
              </li>
              <li>
                <Link to="#news" className="text-muted-foreground transition-colors hover:text-primary">
                  Latest News
                </Link>
              </li>
              <li>
                <Link to="#events" className="text-muted-foreground transition-colors hover:text-primary">
                  Events
                </Link>
              </li>
              <li>
                <Link to="/admin/login" className="text-muted-foreground transition-colors hover:text-primary">
                  Admin Login
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="mb-4 text-sm font-semibold">Contact Us</h4>
            <div className="space-y-3">
              <a href="mailto:aiclub@sgtuniversity.edu" className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary">
                <Mail className="h-4 w-4" />
                aiclub@sgtuniversity.edu
              </a>
              <a href="https://sgtuniversity.edu" className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary">
                <Globe className="h-4 w-4" />
                sgtuniversity.edu
              </a>
              <div className="flex gap-3 pt-2">
                <a href="#" className="text-muted-foreground transition-colors hover:text-primary">
                  <Twitter className="h-5 w-5" />
                </a>
                <a href="#" className="text-muted-foreground transition-colors hover:text-primary">
                  <Linkedin className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-8 border-t border-border pt-8 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} AI Club, SGT University. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
