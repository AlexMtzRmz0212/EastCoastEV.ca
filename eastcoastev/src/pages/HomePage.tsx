import { useEffect } from 'react';
import Hero from '../components/Hero';
import Ribbon from '../components/Ribbon';
import ShopSection from '../components/ShopSection';
import ServiceSection from '../components/ServiceSection';
import LocalSection from '../components/LocalSection';
import TestimonialsSection from '../components/TestimonialsSection';
import CtaBand from '../components/CtaBand';
import { useReveal } from '../hooks/useReveal';

export default function HomePage() {
  useReveal();

  useEffect(() => {
    document.title =
      'EastCoastEV | E-Bikes, Scooters & Mobility — New Brunswick & Maritimes';
  }, []);

  return (
    <>
      <Hero />
      <Ribbon />
      {/* Each section teases a full page via its CTA */}
      <ShopSection />
      <ServiceSection ctaTo="/service" ctaLabel="Explore Service & Repair" />
      <LocalSection ctaTo="/about" ctaLabel="Read Our Story" />
      <TestimonialsSection />
      <CtaBand
        eyebrow="Come Ride With Us"
        title="Your next ride is waiting in Fredericton."
        text="Browse the lineup online, then visit our storefront at 148 Main St to test ride before you buy."
        primaryTo="/shop"
        primaryLabel="Shop the Lineup"
        secondaryTo="/contact"
        secondaryLabel="Get in Touch"
      />
    </>
  );
}
