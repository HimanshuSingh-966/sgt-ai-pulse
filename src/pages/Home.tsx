import { useState } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import NewsCard from "@/components/NewsCard";
import FilterBar from "@/components/FilterBar";
import Footer from "@/components/Footer";
import { Sparkles, Calendar, GraduationCap, Newspaper } from "lucide-react";

const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");

  // Empty array - will be populated from database
  const news: any[] = [];

  return (
    <div className="min-h-screen bg-background">
      <Header onSearch={setSearchQuery} />
      <Hero />
      
      <main className="container mx-auto px-4 py-12">
        {/* Latest News Section */}
        <section id="news" className="mb-16">
          <div className="mb-8 flex items-center gap-3">
            <Sparkles className="h-6 w-6 text-primary" />
            <h2 className="text-3xl font-bold">Latest AI News</h2>
          </div>
          
          <FilterBar />
          
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {news.length > 0 ? (
              news.map((item) => (
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
          <div className="mb-8 flex items-center gap-3">
            <Calendar className="h-6 w-6 text-secondary" />
            <h2 className="text-3xl font-bold">Campus AI Events</h2>
          </div>
          
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {news.filter((item) => item.category === "Campus Events").length > 0 ? (
              news
                .filter((item) => item.category === "Campus Events")
                .map((item) => (
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
          <div className="mb-8 flex items-center gap-3">
            <GraduationCap className="h-6 w-6 text-accent" />
            <h2 className="text-3xl font-bold">Research Highlights</h2>
          </div>
          
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {news.filter((item) => item.category === "Research").length > 0 ? (
              news
                .filter((item) => item.category === "Research")
                .map((item) => (
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
