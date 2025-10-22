import { useState, useEffect } from "react";
import Header from "@/components/Header";
import NewsCard from "@/components/NewsCard";
import FilterBar from "@/components/FilterBar";
import Footer from "@/components/Footer";
import { Newspaper } from "lucide-react";
import { supabase } from "@/lib/supabase";

const News = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [news, setNews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    const { data, error } = await supabase
      .from("posts")
      .select("*")
      .eq("category", "News")
      .eq("status", "Published")
      .order("created_at", { ascending: false });

    if (!error && data) {
      setNews(data);
    }
    setLoading(false);
  };

  const filteredNews = news.filter(item =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
          {loading ? (
            <div className="col-span-full flex justify-center py-16">
              <div className="text-lg">Loading news...</div>
            </div>
          ) : filteredNews.length > 0 ? (
            filteredNews.map((item) => (
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
      </main>

      <Footer />
    </div>
  );
};

export default News;
