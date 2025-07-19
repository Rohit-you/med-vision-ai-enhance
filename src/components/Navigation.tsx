import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Brain, Menu, X, User, Upload, BarChart3, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/useAuth";
const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const {
    user,
    loading,
    signOut
  } = useAuth();
  const navigation = [{
    name: "Home",
    href: "/",
    icon: Brain
  }, {
    name: "Upload",
    href: "/upload",
    icon: Upload
  }, {
    name: "Dashboard",
    href: "/dashboard",
    icon: BarChart3
  }];
  const isActive = (path: string) => location.pathname === path;
  return <nav className="bg-card border-b border-border shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <Brain className="h-8 w-8 text-primary rounded-sm" />
              <span className="text-xl font-bold text-foreground">MedVision AI</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map(item => {
            const Icon = item.icon;
            return <Link key={item.name} to={item.href} className={cn("flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors", isActive(item.href) ? "text-primary bg-primary/10" : "text-muted-foreground hover:text-foreground hover:bg-accent")}>
                  <Icon className="h-4 w-4" />
                  <span>{item.name}</span>
                </Link>;
          })}
            {loading ? <div className="h-8 w-8 rounded-full bg-muted animate-pulse" /> : user ? <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user.user_metadata?.avatar_url} alt={user.email} />
                      <AvatarFallback>
                        {user.email?.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuItem disabled>
                    <User className="mr-2 h-4 w-4" />
                    <span>{user.email}</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={signOut}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Sign out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu> : <Button asChild variant="medical" size="sm">
                <Link to="/auth">
                  <User className="h-4 w-4" />
                  Sign In
                </Link>
              </Button>}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigation.map(item => {
            const Icon = item.icon;
            return <Link key={item.name} to={item.href} className={cn("flex items-center space-x-2 px-3 py-2 rounded-md text-base font-medium transition-colors", isActive(item.href) ? "text-primary bg-primary/10" : "text-muted-foreground hover:text-foreground hover:bg-accent")} onClick={() => setIsOpen(false)}>
                    <Icon className="h-4 w-4" />
                    <span>{item.name}</span>
                  </Link>;
          })}
              {loading ? <div className="h-8 w-full rounded bg-muted animate-pulse mt-4" /> : user ? <div className="mt-4 space-y-2">
                  <div className="px-3 py-2 text-sm text-muted-foreground">
                    {user.email}
                  </div>
                  <Button onClick={signOut} variant="outline" className="w-full">
                    <LogOut className="h-4 w-4 mr-2" />
                    Sign Out
                  </Button>
                </div> : <Button asChild variant="medical" className="w-full mt-4">
                  <Link to="/auth" onClick={() => setIsOpen(false)}>
                    <User className="h-4 w-4" />
                    Sign In
                  </Link>
                </Button>}
            </div>
          </div>}
      </div>
    </nav>;
};
export default Navigation;