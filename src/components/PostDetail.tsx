import { BlogPost } from "@/lib/blogger-parser";
import { Button } from "@/components/ui/button";
import { Calendar, User, ArrowLeft, Share2, MessageSquare } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface PostDetailProps {
  post: BlogPost;
  onBack: () => void;
}

export function PostDetail({ post, onBack }: PostDetailProps) {
  const formattedDate = new Date(post.published).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <article className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="container mx-auto max-w-4xl px-4 py-8">
        <Button 
          variant="ghost" 
          onClick={onBack} 
          className="mb-8 hover:text-primary -ml-4"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Feed
        </Button>
        
        <header className="mb-8">
          <Badge className="mb-4 bg-primary text-primary-foreground">
            {post.category}
          </Badge>
          <h1 className="text-3xl md:text-5xl font-black tracking-tight mb-6 leading-tight">
            {post.title}
          </h1>
          
          <div className="flex flex-wrap items-center gap-6 text-muted-foreground border-y border-border/40 py-6">
            <div className="flex items-center gap-2">
              <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center">
                <User className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm font-bold text-foreground">{post.author}</p>
                <p className="text-xs">Gaming Journalist</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              <span className="text-sm">{formattedDate}</span>
            </div>
            
            <div className="flex items-center gap-2 ml-auto">
              <Button variant="outline" size="icon" className="rounded-full">
                <Share2 className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" className="rounded-full">
                <MessageSquare className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </header>
        
        <div className="relative aspect-video w-full overflow-hidden rounded-2xl mb-12 shadow-2xl">
          <img
            src={post.thumbnail}
            alt={post.title}
            className="h-full w-full object-cover"
          />
        </div>
        
        <div 
          className="prose prose-invert prose-lg max-w-none 
            prose-headings:font-black prose-headings:tracking-tight
            prose-p:text-muted-foreground prose-p:leading-relaxed
            prose-img:rounded-xl prose-img:shadow-lg
            prose-strong:text-foreground prose-a:text-primary hover:prose-a:underline"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
        
        <footer className="mt-16 pt-8 border-t border-border/40">
          <div className="bg-card/50 border border-border/40 rounded-2xl p-8 backdrop-blur-sm">
            <h3 className="text-xl font-bold mb-4">About the Author</h3>
            <div className="flex gap-4">
              <div className="h-16 w-16 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                <User className="h-8 w-8 text-primary" />
              </div>
              <div>
                <p className="font-bold text-lg">{post.author}</p>
                <p className="text-muted-foreground text-sm">
                  A veteran gamer and journalist with over a decade of experience in the industry. 
                  Specializing in RPGs, hardware analysis, and the growing eSports scene.
                </p>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </article>
  );
}