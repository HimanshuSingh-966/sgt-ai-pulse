import { Brain } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-hero py-20 md:py-32">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:64px_64px]" />
      
      <div className="container relative mx-auto px-4">
        <div className="flex flex-col items-center text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm text-white backdrop-blur">
            <Brain className="h-4 w-4" />
            <span>AI Club - SGT University</span>
          </div>
          
          <h1 className="mb-6 max-w-4xl text-4xl font-bold text-white md:text-6xl lg:text-7xl animate-fade-in">
            Stay Updated with
            <span className="block text-accent">AI News & Events</span>
          </h1>
          
          <p className="mb-8 max-w-2xl text-lg text-white/90 md:text-xl animate-slide-up">
            Your hub for the latest artificial intelligence news, campus events, and research highlights from SGT University's AI Club.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Hero;
