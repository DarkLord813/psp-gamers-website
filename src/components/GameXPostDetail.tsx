import { BlogPost } from "@/lib/blogger-parser";
import { Button } from "@/components/ui/button";
import { Calendar, User, ArrowLeft, Facebook, Twitter, Instagram, Bookmark } from "lucide-react";

interface GameXPostDetailProps {
  post: BlogPost;
  onBack: () => void;
}

export function GameXPostDetail({ post, onBack }: GameXPostDetailProps) {
  const formattedDate = new Date(post.published).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <article className="animate-in fade-in duration-500 bg-background">
      <div className="bg-card border-b border-border py-12 mb-12 transition-colors duration-300">
        <div className="container mx-auto max-w-4xl px-4">
          <Button 
            variant="link" 
            onClick={onBack} 
            className="text-primary p-0 mb-8 font-black uppercase tracking-widest text-[11px] hover:no-underline flex items-center gap-2"
          >
            <ArrowLeft className="h-3 w-3" /> Back to Feed
          </Button>
          
          <span className="text-primary font-black text-xs uppercase tracking-[0.3em] mb-4 block">
            {post.category}
          </span>
          
          <h1 className="text-3xl md:text-6xl font-black italic tracking-tighter uppercase text-primary mb-8 leading-[0.9]">
            {post.title}
          </h1>
          
          <div className="flex flex-wrap items-center gap-8 text-[11px] font-black uppercase tracking-widest text-primary/70 pt-8 border-t border-border">
            <span className="flex items-center gap-2"><Calendar className="h-4 w-4 text-primary" /> {formattedDate}</span>
            <span className="flex items-center gap-2"><User className="h-4 w-4 text-primary" /> {post.author}</span>
            <div className="ml-auto flex items-center gap-4">
              <Facebook className="h-4 w-4 hover:text-foreground cursor-pointer text-primary" />
              <Twitter className="h-4 w-4 hover:text-foreground cursor-pointer text-primary" />
              <Instagram className="h-4 w-4 hover:text-foreground cursor-pointer text-primary" />
              <Bookmark className="h-4 w-4 hover:text-foreground cursor-pointer text-primary" />
            </div>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto max-w-4xl px-4 pb-24">
        <div className="relative aspect-video mb-12 border-4 border-primary shadow-2xl overflow-hidden">
          <img src={post.thumbnail} alt={post.title} className="w-full h-full object-cover" />
        </div>
        
        {/* Rich Text Content Container with special mobile behavior */}
        <div className="blog-post-content border border-transparent">
          <div 
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </div>
        
        <div className="mt-20 p-12 bg-card border border-primary flex flex-col md:flex-row gap-10 items-center text-center md:text-left transition-colors duration-300">
          <div className="h-24 w-24 rounded-full bg-primary flex items-center justify-center shrink-0 border-4 border-background shadow-lg">
            <User className="h-12 w-12 text-white" />
          </div>
          <div className="flex-1">
            <h4 className="text-[10px] text-primary font-black uppercase tracking-[0.3em] mb-2">The Author</h4>
            <h3 className="text-2xl font-black italic uppercase text-primary mb-4 tracking-tighter">{post.author}</h3>
            <p className="text-primary text-sm leading-relaxed italic opacity-80 theme-invert-text">
              Professional gaming critic and tech enthusiast. Covering everything from the latest console leaks 
              to world-first speedruns. Part of the 𝕻𝕾𝕻 𝕲𝕬𝕸𝕰𝕽𝕾™ elite squad.
            </p>
          </div>
        </div>
      </div>
    </article>
  );
}