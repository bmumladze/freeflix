
import { Suspense } from "react";
import Hero from "@/components/Hero";
import Navigation from "@/components/Navigation";
import ContentSection from "@/components/ContentSection";
import Footer from "@/components/Footer";

console.log('Index page loaded');

const LoadingSpinner = () => (
  <div className="flex items-center justify-center py-8">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
  </div>
);

const Index = () => {
  console.log('Index page rendering');
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-blue-900 to-black text-white">
      <Navigation />
      <Suspense fallback={<LoadingSpinner />}>
        <Hero />
      </Suspense>
      <div className="space-y-12 pb-20">
        <Suspense fallback={<LoadingSpinner />}>
          <ContentSection 
            title="Trending Now" 
            category="trending"
          />
        </Suspense>
        <Suspense fallback={<LoadingSpinner />}>
          <ContentSection 
            title="Popular Movies" 
            category="movies"
          />
        </Suspense>
        <Suspense fallback={<LoadingSpinner />}>
          <ContentSection 
            title="TV Series (Sorted by Rating)" 
            category="series"
          />
        </Suspense>
      </div>
      <Footer />
    </div>
  );
};

export default Index;
