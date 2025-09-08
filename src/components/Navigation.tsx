import { Link, useLocation } from "react-router-dom";
import { Button } from "./ui/button";

const Navigation = () => {
  const location = useLocation();

  const navItems = [
    { path: "/", label: "Home" },
    { path: "/about", label: "About" },
    { path: "/coaches", label: "Coaches" },
    { path: "/achievements", label: "Achievements" },
  ];

  return (
    <nav className="fixed top-0 w-full bg-background/95 backdrop-blur-sm border-b border-border z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo and Academy Name */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-r from-primary to-secondary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">RB</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">RB Horangee Do-Jang</h1>
              <p className="text-sm text-muted-foreground">Association</p>
            </div>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`nav-link ${
                  location.pathname === item.path ? "text-primary" : "text-foreground"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex items-center space-x-4">
            <Button variant="outline" size="sm" className="hidden sm:flex">
              CSR Inquiry
            </Button>
            <Button variant="power" size="sm">
              Free Trial
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;