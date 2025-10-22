import { useState, useEffect } from "react";
import Header from "@/components/Header";
import NewsCard from "@/components/NewsCard";
import FilterBar from "@/components/FilterBar";
import Footer from "@/components/Footer";
import { Calendar } from "lucide-react";
import { supabase } from "@/lib/supabase";

const Events = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    const { data, error } = await supabase
      .from("posts")
      .select("*")
      .eq("category", "Events")
      .eq("status", "Published")
      .order("created_at", { ascending: false });

    if (!error && data) {
      setEvents(data);
    }
    setLoading(false);
  };

  const filteredEvents = events.filter(item =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      <Header onSearch={setSearchQuery} />

      <main className="container mx-auto px-4 py-12">
        <div className="mb-8">
          <div className="mb-6 flex items-center gap-3">
            <Calendar className="h-8 w-8 text-secondary" />
            <h1 className="text-4xl font-bold">Campus AI Events</h1>
          </div>
          <p className="text-lg text-muted-foreground">
            Discover all upcoming and past AI-related events on campus
          </p>
        </div>

        <FilterBar />

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {loading ? (
            <div className="col-span-full flex justify-center py-16">
              <div className="text-lg">Loading events...</div>
            </div>
          ) : filteredEvents.length > 0 ? (
            filteredEvents.map((item) => (
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
      </main>

      <Footer />
    </div>
  );
};

export default Events;
