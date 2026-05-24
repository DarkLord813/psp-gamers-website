import { BlogPost } from "@/lib/blogger-parser";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, User, ArrowRight } from "lucide-react";

interface BlogCardProps {
  post: BlogPost;
  onClick: (post: BlogPost) => void;
}

export function BlogCard({ post, onClick }: BlogCardProps) {
  const formattedDate = new Date(post.published).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <Card 
      className="group overflow-hidden border-border/40 bg-card/50 backdrop-blur-sm transition-all hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10 cursor-pointer flex flex-col h-full"
      onClick={() => onClick(post)}
    >
      <div className="relative aspect-video overflow-hidden">
        <img
          src={post.thumbnail}
          alt={post.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute top-4 left-4">
          <Badge className="bg-primary hover:bg-primary/90 text-primary-foreground">
            {post.category}
          </Badge>
        </div>
      </div>
      
      <CardHeader className="p-5 pb-2">
        <div className="flex items-center gap-4 text-xs text-muted-foreground mb-2">
          <span className="flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            {formattedDate}
          </span>
          <span className="flex items-center gap-1">
            <User className="h-3 w-3" />
            {post.author}
          </span>
        </div>
        <h3 className="text-xl font-bold leading-tight group-hover:text-primary transition-colors line-clamp-2">
          {post.title}
        </h3>
      </CardHeader>
      
      <CardContent className="p-5 pt-0 flex-grow">
        <p className="text-sm text-muted-foreground line-clamp-3">
          {post.excerpt}
        </p>
      </CardContent>
      
      <CardFooter className="p-5 pt-0 border-t border-border/40 mt-auto">
        <div className="flex items-center text-sm font-semibold text-primary group-hover:underline mt-4">
          Read Full Article
          <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
        </div>
      </CardFooter>
    </Card>
  );
}