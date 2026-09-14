import { useEffect } from 'react';
import Hero from '../components/Hero';
import Ribbon from '../components/Ribbon';
import ShopSection from '../components/ShopSection';
import ServiceSection from '../components/ServiceSection';
import FinancingSection from '../components/FinancingSection';
import LocalSection from '../components/LocalSection';
import TestimonialsSection from '../components/TestimonialsSection';
import CtaBand from '../components/CtaBand';
import { useReveal } from '../hooks/useReveal';
import { LOCATIONS, shortAddress } from '../lib/locations';

export default function HomePage() {
  useReveal();

  useEffect(() => {
    document.title =
      'EastCoastEV | E-Bikes, Scooters & Mobility in New Brunswick & the Maritimes';
  }, []);

  return (
    <>
      <Hero />
      <Ribbon />
      {/* Each section teases a full page via its CTA */}
      <ShopSection />
      <ServiceSection ctaTo="/service" ctaLabel="Explore Service & Repair" />
      <FinancingSection />
      <LocalSection ctaTo="/about" ctaLabel="Read Our Story" />
      <TestimonialsSection />
      <CtaBand
        eyebrow="Come Ride With Us"
        title="Your next ride is waiting."
        text={`Browse the lineup online, then come test ride before you buy at ${shortAddress(LOCATIONS[0])} or ${shortAddress(LOCATIONS[1])}.`}
        primaryTo="/shop"
        primaryLabel="Shop the Lineup"
        secondaryTo="/contact"
        secondaryLabel="Get in Touch"
      />
    </>
  );
}
