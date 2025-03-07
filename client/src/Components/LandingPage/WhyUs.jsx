import React, { useEffect, useRef, useState } from "react";
import { Car, Users, Newspaper, Camera, Shield } from "lucide-react";

function FeatureCard({ icon: Icon, title, description, isVisible }) {
  return (
    <div className={`feature-card ${isVisible ? "visible" : ""}`}>
      <div className="feature-header">
        <Icon className="feature-icon" size={24} />
        <h3 className="feature-title">{title}</h3>
      </div>
      <p className="feature-description">{description}</p>
    </div>
  );
}

function WhyUs() {
  const heroRef = useRef(null);
  const featureRef = useRef(null);
  const whyRef = useRef(null);

  const [heroVisible, setHeroVisible] = useState(false);
  const [featureVisible, setFeatureVisible] = useState(false);
  const [whyVisible, setWhyVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.target === heroRef.current && entry.isIntersecting) {
            setHeroVisible(true);
          }
          if (entry.target === featureRef.current && entry.isIntersecting) {
            setFeatureVisible(true);
          }
          if (entry.target === whyRef.current && entry.isIntersecting) {
            setWhyVisible(true);
          }
        });
      },
      { threshold: 0.3 }
    );

    if (heroRef.current) observer.observe(heroRef.current);
    if (featureRef.current) observer.observe(featureRef.current);
    if (whyRef.current) observer.observe(whyRef.current);

    return () => {
      if (heroRef.current) observer.unobserve(heroRef.current);
      if (featureRef.current) observer.unobserve(featureRef.current);
      if (whyRef.current) observer.unobserve(whyRef.current);
    };
  }, []);

  return (
    <div className="container1 who">
      <div className="content">
        <section ref={heroRef} className={`hero ${heroVisible ? "visible" : ""}`}>
          <h1>Who We Are</h1>
          <p>
            Drive HUB is more than just a car platform—it's a community-driven space that connects people
            with the right vehicles for their needs. Whether you're an individual looking for a car or a
            host offering vehicles, our platform ensures a smooth and hassle-free experience.
          </p>
        </section>
        <section ref={featureRef} className="features">
          <h2 className={featureVisible ? "visible" : ""}>What We Offer</h2>
          <div className="feature-grid">
            <FeatureCard icon={Car} title="Seamless Car Access" description="Find the perfect vehicle for your needs through our trusted network of hosts." isVisible={featureVisible} />
            <FeatureCard icon={Users} title="Host & User Connection" description="We enable direct communication between hosts and users for a transparent, hassle-free process." isVisible={featureVisible} />
            <FeatureCard icon={Newspaper} title="Automotive Insights & Trends" description="Stay updated with the latest developments in India's automotive space." isVisible={featureVisible} />
            <FeatureCard icon={Camera} title="High-Quality Vehicle Showcases" description="Browse detailed images and descriptions to make informed decisions." isVisible={featureVisible} />
          </div>
        </section>
        <section ref={whyRef} className={`why-section ${whyVisible ? "visible" : ""}`}>
          <div className="why-header">
            <Shield className="why-icon" size={32} />
            <h2 className="why-title">Why Drive HUB?</h2>
          </div>
          <p className="why-description">
            Drive HUB is built to simplify the way people access vehicles in India. We prioritize trust,
            convenience, and community, ensuring that both users and hosts benefit from a seamless experience.
            Whether you're looking to find a car or share yours with others, Drive HUB is your go-to platform.
            Join us and be part of the future of mobility in India!
          </p>
        </section>
      </div>
    </div>
  );
}

export default WhyUs;
