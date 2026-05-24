import { Gamepad2, Search, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-lg shadow-primary/20">
            <Gamepad2 className="h-6 w-6" />
          </div>
          <span className="text-xl font-black tracking-tighter uppercase italic">
            Cyber<span className="text-primary">Gaming</span>
          </span>
        </div>
        
        <div className="hidden md:flex items-center gap-8">
          <a href="#" className="text-sm font-medium hover:text-primary transition-colors">News</a>
          <a href="#" className="text-sm font-medium hover:text-primary transition-colors">Reviews</a>
          <a href="#" className="text-sm font-medium hover:text-primary transition-colors">Hardware</a>
          <a href="#" className="text-sm font-medium hover:text-primary transition-colors">eSports</a>
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary">
            <Search className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-5 w-5" />
          </Button>
          <Button className="hidden md:flex bg-primary hover:bg-primary/90">
            Join Community
          </Button>
        </div>
      </div>
    </nav>
  );
}