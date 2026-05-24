import { Search, Facebook, Youtube, Instagram, Send, MessageCircle, Music2 } from "lucide-react";
import { BlogPost } from "@/lib/blogger-parser";

interface SidebarProps {
  popularPosts: BlogPost[];
  onPostClick: (post: BlogPost) => void;
}

export function GameXSidebar({ popularPosts, onPostClick }: SidebarProps) {
  const socials = [
    {
      name: "Telegram",
      icon: <Send className="h-4 w-4 text-[#229ED9]" />,
      link: "https://t.me/pspgamers5",
      count: "12k Fans",
      bg: "bg-[#229ED9]/10",
      border: "border-[#229ED9]/20"
    },
    {
      name: "WhatsApp",
      icon: <MessageCircle className="h-4 w-4 text-[#25D366]" />,
      link: "https://whatsapp.com/channel/0029VacADTfGpLHLNmgVqx0C",
      count: "8k Subs",
      bg: "bg-[#25D366]/10",
      border: "border-[#25D366]/20"
    },
    {
      name: "YouTube",
      icon: <Youtube className="h-4 w-4 text-[#FF0000]" />,
      link: "https://www.youtube.com/@DBZ_DarkLord",
      count: "25k Subs",
      bg: "bg-[#FF0000]/10",
      border: "border-[#FF0000]/20"
    },
    {
      name: "Facebook",
      icon: <Facebook className="h-4 w-4 text-[#1877F2]" />,
      link: "https://facebook.com/pspgamers20",
      count: "15k Fans",
      bg: "bg-[#1877F2]/10",
      border: "border-[#1877F2]/20"
    },
    {
      name: "Instagram",
      icon: <Instagram className="h-4 w-4 text-[#E4405F]" />,
      link: "https://www.instagram.com/darkl0rd249/",
      count: "22k Fans",
      bg: "bg-[#E4405F]/10",
      border: "border-[#E4405F]/20"
    },
    {
      name: "TikTok",
      icon: <Music2 className="h-4 w-4 text-[#000000] dark:text-white" />,
      link: "http://tiktok.com/@dark_lord249",
      count: "42k Likes",
      bg: "bg-primary/5",
      border: "border-primary/10"
    }
  ];

  return (
    <aside className="space-y-12">
      {/* Search Widget */}
      <div className="bg-card p-6 border border-primary/20">
        <h3 className="text-[14px] font-black uppercase tracking-widest mb-6 flex items-center gap-2 text-primary">
          <span className="h-4 w-1 bg-primary"></span> Search Blog
        </h3>
        <div className="relative">
          <input 
            type="text" 
            placeholder="Type and hit enter..." 
            className="w-full bg-background border border-primary/40 py-3 px-4 text-sm focus:outline-none focus:border-primary transition-colors text-primary placeholder:text-primary/40"
          />
          <Search className="absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 text-primary/60" />
        </div>
      </div>

      {/* Social Widget */}
      <div className="bg-card p-6 border border-primary/20">
        <h3 className="text-[14px] font-black uppercase tracking-widest mb-6 flex items-center gap-2 text-primary">
          <span className="h-4 w-1 bg-primary"></span> Follow Us
        </h3>
        <div className="grid grid-cols-2 gap-3">
          {socials.map((social) => (
            <a 
              key={social.name}
              href={social.link}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center gap-3 ${social.bg} p-3 cursor-pointer hover:scale-[1.02] transition-all border ${social.border}`}
            >
              {social.icon}
              <span className="text-[10px] font-bold uppercase text-primary">{social.count}</span>
            </a>
          ))}
        </div>
      </div>

      {/* Popular Posts */}
      <div className="bg-card p-6 border border-primary/20">
        <h3 className="text-[14px] font-black uppercase tracking-widest mb-6 flex items-center gap-2 text-primary">
          <span className="h-4 w-1 bg-primary"></span> Popular Posts
        </h3>
        {popularPosts.length > 0 ? (
          <div className="space-y-6">
            {popularPosts.map((post) => (
              <div 
                key={post.id} 
                className="flex gap-4 group cursor-pointer"
                onClick={() => onPostClick(post)}
              >
                <div className="h-16 w-16 shrink-0 overflow-hidden relative border border-primary/20">
                  <img src={post.thumbnail} alt={post.title} className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-500" />
                </div>
                <div>
                  <h4 className="text-[12px] font-black uppercase tracking-tight leading-tight group-hover:text-black dark:group-hover:text-white transition-colors line-clamp-2 italic text-primary">
                    {post.title}
                  </h4>
                  <p className="text-[10px] text-primary/60 mt-1 uppercase tracking-widest font-bold">
                    {new Date(post.published).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-4 border border-dashed border-primary/20">
            <p className="text-[10px] uppercase font-bold text-primary/40 italic">Waiting for intel...</p>
          </div>
        )}
      </div>

      {/* Categories / Labels */}
      <div className="bg-card p-6 border border-primary/20">
        <h3 className="text-[14px] font-black uppercase tracking-widest mb-6 flex items-center gap-2 text-primary">
          <span className="h-4 w-1 bg-primary"></span> Categories
        </h3>
        <div className="flex flex-wrap gap-2">
          {['News', 'Reviews', 'Hardware', 'eSports', 'Vids', 'Guides'].map((cat) => (
            <span key={cat} className="bg-background border border-primary/40 px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest hover:bg-primary hover:text-white dark:hover:text-black hover:border-primary cursor-pointer transition-all text-primary">
              {cat}
            </span>
          ))}
        </div>
      </div>
    </aside>
  );
}