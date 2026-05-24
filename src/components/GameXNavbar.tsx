import { Search, Facebook, Youtube, Instagram, Menu, Sun, Moon, Send, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

export function GameXNavbar() {
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== "undefined") {
      return document.documentElement.classList.contains("dark");
    }
    return false;
  });

  const toggleTheme = () => {
    const newDark = !isDark;
    setIsDark(newDark);
    if (newDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setIsDark(true);
      document.documentElement.classList.add("dark");
    } else if (savedTheme === "light") {
      setIsDark(false);
      document.documentElement.classList.remove("dark");
    } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setIsDark(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  const socials = [
    { icon: <Send className="h-3.5 w-3.5" />, link: "https://t.me/pspgamers5" },
    { icon: <MessageCircle className="h-3.5 w-3.5" />, link: "https://whatsapp.com/channel/0029VacADTfGpLHLNmgVqx0C" },
    { icon: <Youtube className="h-3.5 w-3.5" />, link: "https://www.youtube.com/@DBZ_DarkLord" },
    { icon: <Facebook className="h-3.5 w-3.5" />, link: "https://facebook.com/pspgamers20" },
    { icon: <Instagram className="h-3.5 w-3.5" />, link: "https://www.instagram.com/darkl0rd249/" },
  ];

  return (
    <header className="w-full bg-background border-b border-border sticky top-0 z-50 transition-colors duration-300">
      {/* Top Bar */}
      <div className="border-b border-border hidden md:block">
        <div className="container mx-auto h-10 flex items-center justify-between px-4">
          <div className="text-[10px] uppercase tracking-[0.2em] font-bold text-primary">
            {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </div>
          <div className="flex items-center gap-4">
            {socials.map((social, i) => (
              <a 
                key={i} 
                href={social.link} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary hover:text-foreground transition-colors"
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Main Nav */}
      <div className="container mx-auto h-20 flex items-center justify-between px-4">
        <div className="flex items-center gap-3 group cursor-pointer" onClick={() => window.location.hash = ''}>
          <div className="relative h-14 w-14 overflow-hidden rounded-full border-2 border-primary shadow-[0_0_15px_rgba(255,0,0,0.4)] transition-transform duration-500 group-hover:scale-110">
            <img 
              src="https://storage.googleapis.com/dala-prod-public-storage/attachments/7f89296b-adfc-4ddb-863c-96e778ea84cd/1779639619545_IMG_20260418_185931_369.jpg" 
              alt="Logo"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="flex flex-col ml-1">
            <span className="text-2xl md:text-3xl font-black italic tracking-tighter uppercase leading-none text-primary whitespace-nowrap">
              𝕻𝕾𝕻 𝕲𝕬𝕸𝕰𝕽𝕾™
            </span>
            <span className="text-[8px] uppercase tracking-[0.4em] font-bold text-primary opacity-70">Esports & Gaming</span>
          </div>
        </div>

        <nav className="hidden lg:flex items-center gap-8">
          {['Home', 'News', 'Reviews', 'Hardware', 'Videos', 'Contact'].map((item) => (
            <a 
              key={item} 
              href="#" 
              className="text-[13px] font-black uppercase tracking-widest text-primary hover:text-foreground transition-colors border-b-2 border-transparent hover:border-primary pb-1"
            >
              {item}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <button 
            onClick={toggleTheme}
            className="text-primary hover:text-foreground transition-colors p-2 rounded-full hover:bg-primary/10"
            aria-label="Toggle Theme"
          >
            {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>
          
          <button className="text-primary hover:text-foreground transition-colors">
            <Search className="h-5 w-5" />
          </button>
          
          <Button variant="ghost" size="icon" className="lg:hidden text-primary">
            <Menu className="h-6 w-6" />
          </Button>
          
          <Button className="hidden md:flex bg-primary text-white hover:bg-foreground hover:text-background font-black uppercase tracking-tighter h-11 px-8 rounded-none shadow-[4px_4px_0_rgba(255,0,0,0.2)]">
            Subscribe
          </Button>
        </div>
      </div>
    </header>
  );
}