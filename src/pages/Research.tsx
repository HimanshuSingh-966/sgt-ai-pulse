import { useState, useEffect } from "react";
import Header from "@/components/Header";
import NewsCard from "@/components/NewsCard";
import FilterBar from "@/components/FilterBar";
import Footer from "@/components/Footer";
import { GraduationCap } from "lucide-react";
import { supabase } from "@/lib/supabase";

const Research = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [research, setResearch] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchResearch();
  }, []);

  const fetchResearch = async () => {
    const { data, error } = await supabase
      .from("posts")
      .select("*")
      .eq("category", "Research")
      .eq("status", "Published")
      .order("created_at", { ascending: false });

    if (!error && data) {
      setResearch(data);
    }
    setLoading(false);
  };

  const filteredResearch = research.filter(item =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      <Header onSearch={setSearchQuery} />

      <main className="container mx-auto px-4 py-12">
        <div className="mb-8">
          <div className="mb-6 flex items-center gap-3">
            <GraduationCap className="h-8 w-8 text-accent" />
            <h1 className="text-4xl font-bold">Research Highlights</h1>
          </div>
          <p className="text-lg text-muted-foreground">
            Explore cutting-edge AI research from our faculty and students
          </p>
        </div>

        <FilterBar />

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {loading ? (
            <div className="col-span-full flex justify-center py-16">
              <div className="text-lg">Loading research...</div>
            </div>
          ) : filteredResearch.length > 0 ? (
            filteredResearch.map((item) => (
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
      </main>

      <Footer />
    </div>
  );
};

export default Research;
