import { useState } from "react";
import Header from "@/components/Header";
import NewsCard from "@/components/NewsCard";
import FilterBar from "@/components/FilterBar";
import Footer from "@/components/Footer";
import { Calendar } from "lucide-react";

const Events = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const events: any[] = [];

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
          {events.length > 0 ? (
            events.map((item) => (
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
      </main>

      <Footer />
    </div>
  );
};

export default Events;
