import { useState, useEffect } from "react";
import { GameXNavbar } from "@/components/GameXNavbar";
import { GameXCard } from "@/components/GameXCard";
import { GameXHero } from "@/components/GameXHero";
import { GameXSidebar } from "@/components/GameXSidebar";
import { GameXPostDetail } from "@/components/GameXPostDetail";
import { parseBloggerXML, BlogPost } from "@/lib/blogger-parser";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Facebook, Youtube, Instagram, Inbox, Send, MessageCircle, Music2 } from "lucide-react";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";

function App() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  // Permalink handling via hash
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash && hash.startsWith("#/")) {
        const slug = hash.replace("#/", "");
        const post = posts.find(p => p.slug === slug);
        if (post) {
          setSelectedPost(post);
          window.scrollTo({ top: 0, behavior: "smooth" });
        } else {
          setSelectedPost(null);
        }
      } else {
        setSelectedPost(null);
      }
    };

    window.addEventListener("hashchange", handleHashChange);
    if (!loading && posts.length > 0) {
      handleHashChange();
    }
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, [posts, loading]);

  useEffect(() => {
    const fetchFeed = async () => {
      try {
        const response = await fetch("/feed.xml");
        if (!response.ok) throw new Error("Failed to fetch feed");
        const xmlText = await response.text();
        const parsedPosts = parseBloggerXML(xmlText);
        setPosts(parsedPosts);
      } catch (error) {
        console.error("Error loading blog feed:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchFeed();
  }, []);

  const handlePostClick = (post: BlogPost) => {
    window.location.hash = `/${post.slug}`;
  };

  const handleBack = () => {
    window.location.hash = "";
  };

  const featuredPost = posts.length > 0 ? posts[0] : null;
  const otherPosts = posts.length > 1 ? posts.slice(1) : [];

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary selection:text-white font-sans transition-colors duration-300">
      <Toaster position="top-right" richColors />
      <GameXNavbar />
      
      <main>
        {selectedPost ? (
          <GameXPostDetail post={selectedPost} onBack={handleBack} />
        ) : (
          <>
            {loading ? (
              <div className="h-[650px] bg-background flex items-center justify-center">
                <div className="text-center">
                  <div className="inline-block h-12 w-12 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4" />
                  <p className="text-primary font-black uppercase tracking-[0.4em]">Initializing 𝕻𝕾𝕻 𝕲𝕬𝕸𝕰𝕽𝕾™...</p>
                </div>
              </div>
            ) : (
              featuredPost && <GameXHero post={featuredPost} onClick={handlePostClick} />
            )}

            <div className="container mx-auto px-4 py-20">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                {/* Posts Column */}
                <div className="lg:col-span-8">
                  <div className="flex items-center gap-4 mb-10 border-b border-border pb-6">
                    <h2 className="text-2xl font-black italic tracking-tighter uppercase text-primary">
                      Latest <span className="text-primary">Missions</span>
                    </h2>
                    <div className="h-px bg-border flex-grow" />
                  </div>

                  {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="space-y-4">
                          <Skeleton className="aspect-video w-full bg-secondary" />
                          <Skeleton className="h-6 w-3/4 bg-secondary" />
                          <Skeleton className="h-12 w-full bg-secondary" />
                        </div>
                      ))}
                    </div>
                  ) : posts.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      {otherPosts.length > 0 ? (
                        otherPosts.map((post) => (
                          <GameXCard key={post.id} post={post} onClick={handlePostClick} />
                        ))
                      ) : (
                        <GameXCard post={posts[0]} onClick={handlePostClick} />
                      )}
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-20 text-center bg-secondary/20 border border-border/50 rounded-lg">
                      <Inbox className="h-16 w-16 text-primary/30 mb-4" />
                      <h3 className="text-xl font-bold text-primary italic uppercase tracking-tighter">No Intel Available</h3>
                      <p className="text-primary/60 max-w-xs mt-2">The mission logs are currently clear. Stand by for future updates.</p>
                    </div>
                  )}

                  {posts.length > 4 && (
                    <div className="mt-20 text-center">
                      <Button className="bg-primary text-white border border-primary hover:bg-foreground hover:text-background font-black uppercase tracking-widest px-12 py-7 h-auto rounded-none">
                        Load More Missions
                      </Button>
                    </div>
                  )}
                </div>

                {/* Sidebar Column */}
                <div className="lg:col-span-4">
                  <GameXSidebar 
                    popularPosts={posts.slice(0, 3)} 
                    onPostClick={handlePostClick} 
                  />
                </div>
              </div>
            </div>
          </>
        )}
      </main>

      <footer className="bg-background border-t-8 border-primary pt-24 pb-12 transition-colors duration-300">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 mb-20">
            <div>
              <div className="flex items-center gap-2 mb-8">
                <span className="text-3xl font-black italic tracking-tighter uppercase leading-none text-primary whitespace-nowrap">
                  𝕻𝕾𝕻 <span className="text-primary">𝕲𝕬𝕸𝕰𝕽𝕾</span>™
                </span>
              </div>
              <p className="text-primary text-sm leading-relaxed mb-8 opacity-80">
                The ultimate destination for 𝕻𝕾𝕻 𝕲𝕬𝕸𝕰𝕽𝕾. We deliver the most intense news, reviews, and high-octane updates from the digital frontlines.
              </p>
              <div className="flex items-center gap-4 text-primary">
                <a href="https://facebook.com/pspgamers20" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors"><Facebook className="h-5 w-5" /></a>
                <a href="https://www.youtube.com/@DBZ_DarkLord" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors"><Youtube className="h-5 w-5" /></a>
                <a href="https://www.instagram.com/darkl0rd249/" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors"><Instagram className="h-5 w-5" /></a>
                <a href="https://t.me/pspgamers5" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors"><Send className="h-5 w-5" /></a>
                <a href="https://whatsapp.com/channel/0029VacADTfGpLHLNmgVqx0C" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors"><MessageCircle className="h-5 w-5" /></a>
                <a href="http://tiktok.com/@dark_lord249" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors"><Music2 className="h-5 w-5" /></a>
              </div>
            </div>
            <div>
              <h4 className="text-sm font-black uppercase tracking-[0.3em] mb-10 border-l-4 border-primary pl-4 text-primary">Navigation</h4>
              <ul className="grid grid-cols-2 gap-y-4 gap-x-8 text-[12px] font-bold uppercase tracking-widest text-primary/70">
                <li className="hover:text-foreground cursor-pointer transition-colors">About Us</li>
                <li className="hover:text-foreground cursor-pointer transition-colors">Privacy</li>
                <li className="hover:text-foreground cursor-pointer transition-colors">Contact</li>
                <li className="hover:text-foreground cursor-pointer transition-colors">Hardware</li>
                <li className="hover:text-foreground cursor-pointer transition-colors">eSports</li>
                <li className="hover:text-foreground cursor-pointer transition-colors">Sitemap</li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-black uppercase tracking-[0.3em] mb-10 border-l-4 border-primary pl-4 text-primary">Join The Squad</h4>
              <p className="text-primary/70 text-[12px] mb-6 font-bold uppercase tracking-widest">Get the weekly intel briefing</p>
              <div className="flex flex-col gap-3">
                <input 
                  type="email" 
                  placeholder="Email Address" 
                  className="bg-background border border-primary py-4 px-4 text-xs focus:outline-none focus:border-foreground transition-colors text-primary placeholder:text-primary/40"
                />
                <Button className="bg-primary text-white font-black uppercase tracking-tighter py-6 rounded-none hover:bg-foreground hover:text-background">
                  Subscribe Now
                </Button>
              </div>
            </div>
          </div>
          <div className="pt-12 border-t border-border text-center">
            <p className="text-[10px] font-black uppercase tracking-[0.5em] text-primary/60">
              © 2024 𝕻𝕾𝕻 𝕲𝕬𝕸𝕰𝕽𝕾™ . ALL RIGHTS RESERVED.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;