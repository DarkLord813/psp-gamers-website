import { BlogPost } from "@/lib/blogger-parser";
import { Calendar, User, ChevronRight } from "lucide-react";

interface GameXCardProps {
  post: BlogPost;
  onClick: (post: BlogPost) => void;
}

export function GameXCard({ post, onClick }: GameXCardProps) {
  const formattedDate = new Date(post.published).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div 
      className="group relative bg-white border border-primary/20 overflow-hidden transition-all hover:border-primary cursor-pointer shadow-sm hover:shadow-xl"
      onClick={() => onClick(post)}
    >
      <div className="relative aspect-[16/10] overflow-hidden border-b border-primary/10">
        <img
          src={post.thumbnail}
          alt={post.title}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute top-0 left-0 bg-primary text-white font-bold text-[10px] uppercase px-3 py-1 tracking-widest">
          {post.category}
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-white/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
      
      <div className="p-5">
        <div className="flex items-center gap-3 text-[10px] text-primary/60 uppercase tracking-widest mb-3">
          <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> {formattedDate}</span>
          <span className="flex items-center gap-1"><User className="h-3 w-3" /> {post.author}</span>
        </div>
        
        <h3 className="text-lg font-bold leading-snug mb-3 group-hover:text-black transition-colors line-clamp-2 uppercase italic tracking-tight text-primary">
          {post.title}
        </h3>
        
        <p className="text-sm text-primary/70 line-clamp-2 mb-4 leading-relaxed">
          {post.excerpt}
        </p>
        
        <div className="inline-flex items-center text-[11px] font-black uppercase tracking-tighter text-primary group-hover:gap-2 transition-all">
          Read More <ChevronRight className="h-3 w-3" />
        </div>
      </div>
    </div>
  );
}