import { useState } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import NewsCard from "@/components/NewsCard";
import FilterBar from "@/components/FilterBar";
import Footer from "@/components/Footer";
import { Sparkles, Calendar, GraduationCap } from "lucide-react";

const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");

  // Mock data - will be replaced with real data from database
  const mockNews = [
    {
      id: "1",
      title: "AI Club Hosts Workshop on Machine Learning Fundamentals",
      excerpt: "Students gathered to learn the basics of machine learning, including neural networks and data preprocessing techniques.",
      category: "Workshops",
      date: "Mar 15, 2024",
      author: "Dr. Rajesh Kumar",
      image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e",
      featured: true
    },
    {
      id: "2",
      title: "SGT University Students Win National AI Hackathon",
      excerpt: "Our AI Club members secured first place in the prestigious National AI Innovation Challenge with their healthcare solution.",
      category: "AI News",
      date: "Mar 12, 2024",
      author: "Admin",
      image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d"
    },
    {
      id: "3",
      title: "Research Paper on Deep Learning Published in IEEE Conference",
      excerpt: "Faculty and students collaborate on groundbreaking research in computer vision, accepted at IEEE International Conference.",
      category: "Research",
      date: "Mar 10, 2024",
      author: "Dr. Priya Sharma",
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa"
    },
    {
      id: "4",
      title: "Guest Lecture: AI in Healthcare by Industry Expert",
      excerpt: "Join us for an insightful session on how artificial intelligence is revolutionizing healthcare and medical diagnostics.",
      category: "Campus Events",
      date: "Mar 8, 2024",
      author: "AI Club Team",
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d"
    },
    {
      id: "5",
      title: "New AI Lab Inaugurated with State-of-the-Art Equipment",
      excerpt: "SGT University unveils cutting-edge AI laboratory with GPU clusters and advanced computing infrastructure for student research.",
      category: "AI News",
      date: "Mar 5, 2024",
      author: "Admin",
      image: "https://images.unsplash.com/photo-1581092921461-eab62e97a780"
    },
    {
      id: "6",
      title: "Python for AI: Beginner Workshop Series Announced",
      excerpt: "AI Club launches comprehensive workshop series covering Python programming essentials for artificial intelligence applications.",
      category: "Workshops",
      date: "Mar 3, 2024",
      author: "AI Club Team",
      image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5"
    }
  ];

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
            {mockNews.map((news) => (
              <NewsCard key={news.id} {...news} />
            ))}
          </div>
        </section>

        {/* Campus Events Section */}
        <section id="events" className="mb-16">
          <div className="mb-8 flex items-center gap-3">
            <Calendar className="h-6 w-6 text-secondary" />
            <h2 className="text-3xl font-bold">Campus AI Events</h2>
          </div>
          
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {mockNews
              .filter((news) => news.category === "Campus Events")
              .map((news) => (
                <NewsCard key={news.id} {...news} />
              ))}
          </div>
        </section>

        {/* Research Highlights Section */}
        <section id="research" className="mb-16">
          <div className="mb-8 flex items-center gap-3">
            <GraduationCap className="h-6 w-6 text-accent" />
            <h2 className="text-3xl font-bold">Research Highlights</h2>
          </div>
          
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {mockNews
              .filter((news) => news.category === "Research")
              .map((news) => (
                <NewsCard key={news.id} {...news} />
              ))}
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Home;
