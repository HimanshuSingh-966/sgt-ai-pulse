import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import NewsCard from "@/components/NewsCard";
import Footer from "@/components/Footer";
import { Sparkles, Calendar, GraduationCap, Newspaper, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase";

const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [latestNews, setLatestNews] = useState<any[]>([]);
  const [upcomingEvents, setUpcomingEvents] = useState<any[]>([]);
  const [latestResearch, setLatestResearch] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAllContent();
  }, []);

  const fetchAllContent = async () => {
    setLoading(true);

    // Fetch latest 3 news
    const { data: newsData } = await supabase
      .from("posts")
      .select("*")
      .eq("category", "News")
      .eq("status", "Published")
      .order("created_at", { ascending: false })
      .limit(3);

    // Fetch latest 3 events
    const { data: eventsData } = await supabase
      .from("posts")
      .select("*")
      .eq("category", "Events")
      .eq("status", "Published")
      .order("created_at", { ascending: false })
      .limit(3);

    // Fetch latest 3 research
    const { data: researchData } = await supabase
      .from("posts")
      .select("*")
      .eq("category", "Research")
      .eq("status", "Published")
      .order("created_at", { ascending: false })
      .limit(3);

    setLatestNews(newsData || []);
    setUpcomingEvents(eventsData || []);
    setLatestResearch(researchData || []);
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header onSearch={setSearchQuery} />
      <Hero />
      
      <main className="container mx-auto px-4 py-8 md:py-12">
        {/* Latest News Section */}
        <section id="news" className="mb-12 md:mb-16">
          <div className="mb-6 md:mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-2 md:gap-3">
              <Sparkles className="h-5 w-5 md:h-6 md:w-6 text-primary flex-shrink-0" />
              <h2 className="text-2xl md:text-3xl font-bold">Latest AI News</h2>
            </div>
            <Link to="/news">
              <Button variant="outline" size="sm" className="md:size-default">
                View All
                <ArrowRight className="ml-2 h-3 w-3 md:h-4 md:w-4" />
              </Button>
            </Link>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {loading ? (
              <div className="col-span-full flex justify-center py-8">
                <div className="text-lg">Loading...</div>
              </div>
            ) : latestNews.length > 0 ? (
              latestNews.map((item) => (
                <NewsCard 
                  key={item.id} 
                  id={item.id}
                  title={item.title}
                  excerpt={item.excerpt}
                  category={item.category}
                  date={new Date(item.created_at).toLocaleDateString()}
                  author={item.author}
                  image={item.image || "/placeholder.svg"}
                  featured={item.featured}
                />
              ))
            ) : (
              <div className="col-span-full flex flex-col items-center justify-center py-16 text-center">
                <Newspaper className="mb-4 h-16 w-16 text-muted-foreground" />
                <h3 className="mb-2 text-xl font-semibold">No news posted yet</h3>
                <p className="text-muted-foreground">Check back soon for the latest AI updates!</p>
              </div>
            )}
          </div>
        </section>

        {/* Campus Events Section */}
        <section id="events" className="mb-12 md:mb-16">
          <div className="mb-6 md:mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-2 md:gap-3">
              <Calendar className="h-5 w-5 md:h-6 md:w-6 text-secondary flex-shrink-0" />
              <h2 className="text-2xl md:text-3xl font-bold">Upcoming Events</h2>
            </div>
            <Link to="/events">
              <Button variant="outline" size="sm" className="md:size-default">
                View All
                <ArrowRight className="ml-2 h-3 w-3 md:h-4 md:w-4" />
              </Button>
            </Link>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {loading ? (
              <div className="col-span-full flex justify-center py-8">
                <div className="text-lg">Loading...</div>
              </div>
            ) : upcomingEvents.length > 0 ? (
              upcomingEvents.map((item) => (
                <NewsCard 
                  key={item.id} 
                  id={item.id}
                  title={item.title}
                  excerpt={item.excerpt}
                  category={item.category}
                  date={new Date(item.created_at).toLocaleDateString()}
                  author={item.author}
                  image={item.image || "/placeholder.svg"}
                  featured={item.featured}
                />
              ))
            ) : (
              <div className="col-span-full flex flex-col items-center justify-center py-16 text-center">
                <Calendar className="mb-4 h-16 w-16 text-muted-foreground" />
                <h3 className="mb-2 text-xl font-semibold">No events scheduled</h3>
                <p className="text-muted-foreground">Stay tuned for upcoming AI events!</p>
              </div>
            )}
          </div>
        </section>

        {/* Research Highlights Section */}
        <section id="research" className="mb-12 md:mb-16">
          <div className="mb-6 md:mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-2 md:gap-3">
              <GraduationCap className="h-5 w-5 md:h-6 md:w-6 text-accent flex-shrink-0" />
              <h2 className="text-2xl md:text-3xl font-bold">Research Highlights</h2>
            </div>
            <Link to="/research">
              <Button variant="outline" size="sm" className="md:size-default">
                View All
                <ArrowRight className="ml-2 h-3 w-3 md:h-4 md:w-4" />
              </Button>
            </Link>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {loading ? (
              <div className="col-span-full flex justify-center py-8">
                <div className="text-lg">Loading...</div>
              </div>
            ) : latestResearch.length > 0 ? (
              latestResearch.map((item) => (
                <NewsCard 
                  key={item.id} 
                  id={item.id}
                  title={item.title}
                  excerpt={item.excerpt}
                  category={item.category}
                  date={new Date(item.created_at).toLocaleDateString()}
                  author={item.author}
                  image={item.image || "/placeholder.svg"}
                  featured={item.featured}
                />
              ))
            ) : (
              <div className="col-span-full flex flex-col items-center justify-center py-16 text-center">
                <GraduationCap className="mb-4 h-16 w-16 text-muted-foreground" />
                <h3 className="mb-2 text-xl font-semibold">No research highlights</h3>
                <p className="text-muted-foreground">Research papers will be featured here!</p>
              </div>
            )}
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Home;
