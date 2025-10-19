import { useState } from "react";
import Header from "@/components/Header";
import NewsCard from "@/components/NewsCard";
import FilterBar from "@/components/FilterBar";
import Footer from "@/components/Footer";
import { Newspaper } from "lucide-react";

const News = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const news: any[] = [];

  return (
    <div className="min-h-screen bg-background">
      <Header onSearch={setSearchQuery} />

      <main className="container mx-auto px-4 py-12">
        <div className="mb-8">
          <div className="mb-6 flex items-center gap-3">
            <Newspaper className="h-8 w-8 text-primary" />
            <h1 className="text-4xl font-bold">All News</h1>
          </div>
          <p className="text-lg text-muted-foreground">
            Browse through all AI news articles and updates
          </p>
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
      </main>

      <Footer />
    </div>
  );
};

export default News;
