
import React, { useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import Hero from '@/components/home/Hero';
import Features from '@/components/home/Features';
import Products from '@/components/home/Products';
import Promotion from '@/components/home/Promotion';
import Newsletter from '@/components/home/Newsletter';
import Footer from '@/components/layout/Footer';
import PromoBanner from '@/components/promotions/PromoBanner';

const Index = () => {
  // Add smooth scroll behavior for anchor links
  useEffect(() => {
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'A') {
        const href = target.getAttribute('href');
        if (href && href.startsWith('#') && href.length > 1) {
          e.preventDefault();
          const targetElement = document.querySelector(href);
          if (targetElement) {
            const navbarHeight = 80; // Approximate navbar height
            const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - navbarHeight;
            
            window.scrollTo({
              top: targetPosition,
              behavior: 'smooth'
            });
          }
        }
      }
    };

    document.addEventListener('click', handleAnchorClick);
    return () => document.removeEventListener('click', handleAnchorClick);
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <Features />
        <Products />
        <Promotion />
        <Newsletter />
      </main>
      <Footer />
      <PromoBanner />
    </div>
  );
};

export default Index;
