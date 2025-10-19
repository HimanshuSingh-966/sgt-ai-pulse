import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import NewsCard from "@/components/NewsCard";
import Footer from "@/components/Footer";
import { Sparkles, Calendar, GraduationCap, Newspaper, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const news: any[] = [];
  const latestNews = news.slice(0, 3);
  const upcomingEvents = news.filter((item) => item.category === "Campus Events").slice(0, 3);
  const latestResearch = news.filter((item) => item.category === "Research").slice(0, 3);

  return (
    <div className="min-h-screen bg-background">
      <Header onSearch={setSearchQuery} />
      <Hero />
      
      <main className="container mx-auto px-4 py-12">
        {/* Latest News Section */}
        <section id="news" className="mb-16">
          <div className="mb-8 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Sparkles className="h-6 w-6 text-primary" />
              <h2 className="text-3xl font-bold">Latest AI News</h2>
            </div>
            <Link to="/news">
              <Button variant="outline">
                View All
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {latestNews.length > 0 ? (
              latestNews.map((item) => (
                <NewsCard key={item.id} {...item} />
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
        <section id="events" className="mb-16">
          <div className="mb-8 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Calendar className="h-6 w-6 text-secondary" />
              <h2 className="text-3xl font-bold">Upcoming Events</h2>
            </div>
            <Link to="/events">
              <Button variant="outline">
                View All
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {upcomingEvents.length > 0 ? (
              upcomingEvents.map((item) => (
                <NewsCard key={item.id} {...item} />
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
        <section id="research" className="mb-16">
          <div className="mb-8 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <GraduationCap className="h-6 w-6 text-accent" />
              <h2 className="text-3xl font-bold">Research Highlights</h2>
            </div>
            <Link to="/research">
              <Button variant="outline">
                View All
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {latestResearch.length > 0 ? (
              latestResearch.map((item) => (
                <NewsCard key={item.id} {...item} />
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
