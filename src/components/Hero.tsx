import { Brain } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-hero py-12 md:py-20 lg:py-32">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:64px_64px]" />
      
      <div className="container relative mx-auto px-4">
        <div className="flex flex-col items-center text-center">
          <div className="mb-4 md:mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 md:px-4 md:py-2 text-xs md:text-sm text-white backdrop-blur">
            <Brain className="h-3 w-3 md:h-4 md:w-4" />
            <span>AI Club - SGT University</span>
          </div>
          
          <h1 className="mb-4 md:mb-6 max-w-4xl text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white animate-fade-in leading-tight">
            Stay Updated with
            <span className="block text-accent mt-2">AI News & Events</span>
          </h1>
          
          <p className="mb-6 md:mb-8 max-w-2xl text-base md:text-lg lg:text-xl text-white/90 animate-slide-up px-4">
            Your hub for the latest artificial intelligence news, campus events, and research highlights from SGT University's AI Club.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Hero;
