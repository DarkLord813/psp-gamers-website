import { BlogPost } from "@/lib/blogger-parser";
import { Calendar, User, MessageSquare } from "lucide-react";

interface GameXHeroProps {
  post: BlogPost;
  onClick: (post: BlogPost) => void;
}

export function GameXHero({ post, onClick }: GameXHeroProps) {
  const formattedDate = new Date(post.published).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div 
      className="relative w-full h-[500px] md:h-[650px] overflow-hidden group cursor-pointer border-b-4 border-primary"
      onClick={() => onClick(post)}
    >
      <img
        src={post.thumbnail}
        alt={post.title}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-white/90 via-white/40 to-transparent" />
      
      <div className="container relative mx-auto h-full flex flex-col justify-end pb-20 px-4">
        <div className="max-w-3xl animate-in slide-in-from-bottom-10 duration-700">
          <div className="flex items-center gap-4 mb-6">
            <span className="bg-primary text-white font-black text-xs uppercase px-4 py-1.5 tracking-[0.2em] shadow-[5px_5px_0_rgba(255,255,255,0.5)]">
              {post.category}
            </span>
          </div>
          
          <h2 className="text-4xl md:text-7xl font-black italic tracking-tighter uppercase text-primary mb-6 leading-[0.9] text-shadow-glow group-hover:text-black transition-colors">
            {post.title}
          </h2>
          
          <div className="flex items-center gap-6 text-[12px] font-bold uppercase tracking-[0.2em] text-primary">
            <span className="flex items-center gap-2"><Calendar className="h-4 w-4 text-primary" /> {formattedDate}</span>
            <span className="flex items-center gap-2"><User className="h-4 w-4 text-primary" /> By {post.author}</span>
            <span className="flex items-center gap-2 hidden sm:flex"><MessageSquare className="h-4 w-4 text-primary" /> 24 Comments</span>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 right-8 flex gap-3">
        <div className="h-3 w-12 bg-primary"></div>
        <div className="h-3 w-8 bg-black"></div>
        <div className="h-3 w-8 bg-black"></div>
      </div>
    </div>
  );
}