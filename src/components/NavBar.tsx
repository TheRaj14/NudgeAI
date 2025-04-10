
import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from '@/contexts/ThemeContext';
import { Home, ListTodo, Timer, Activity, User, Settings, Moon, Sun, LogOut } from 'lucide-react';
import { Button } from "@/components/ui/button";
import ThemeToggle from '@/components/ThemeToggle';

const NavBar: React.FC = () => {
  const { user, signOut } = useAuth();
  const { theme } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();

  const navigationItems = [
    {
      title: "Dashboard",
      href: "/dashboard",
      icon: Home,
    },
    {
      title: "Tasks",
      href: "/tasks",
      icon: ListTodo,
    },
    {
      title: "Focus",
      href: "/focus",
      icon: Timer,
    },
    {
      title: "Digital Wellbeing",
      href: "/wellbeing",
      icon: Activity,
    },
  ];

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const handleLogout = async () => {
    try {
      await signOut();
      navigate('/auth');
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <nav className="bg-black border-b border-gray-800 sticky top-0 z-50">
      <div className="container max-w-6xl mx-auto flex justify-between items-center py-4 px-4">
        <Link to="/" className="text-2xl font-bold neon-text">
          NUDGE
        </Link>

        <div className="flex items-center space-x-6">
          <div className="hidden md:flex space-x-4">
            {navigationItems.map((item) => (
              <Link
                key={item.title}
                to={item.href}
                className={`flex items-center space-x-2 text-sm font-medium transition-all duration-200 
                  ${isActive(item.href) 
                    ? 'text-green-400 neon-text' 
                    : 'text-gray-400 hover:text-green-400'
                  }`}
              >
                <item.icon className={`h-4 w-4 ${isActive(item.href) ? 'text-green-400' : 'text-gray-400'}`} />
                <span>{item.title}</span>
              </Link>
            ))}
          </div>

          {user ? (
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" onClick={handleLogout} className="text-gray-400 hover:text-red-400">
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
              <Link to="/profile" className="flex items-center space-x-2 text-sm font-medium text-gray-400 hover:text-green-400">
                <User className="h-4 w-4" />
                <span>Profile</span>
              </Link>
            </div>
          ) : (
            <Link to="/auth" className="text-sm font-medium text-gray-400 hover:text-green-400">
              Login
            </Link>
          )}

          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
