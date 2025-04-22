import React from 'react';
import { Facebook, Twitter, Instagram, Youtube } from 'lucide-react';

function App() {
  const vehicleTypes = {
    regular: [
      { name: 'Car rental', link: '#' },
      { name: 'Classic car rental', link: '#' },
      { name: 'Convertible car rental', link: '#' },
      { name: 'Electric vehicle rental', link: '#' }
    ],
    specialty: [
      { name: 'Exotic & luxury car rental', link: '#' },
      { name: 'Minivan rental', link: '#' },
      { name: 'Sports car rental', link: '#' },
      { name: 'SUV rental', link: '#' }
    ],
    commercial: [
      { name: 'Truck rental', link: '#' },
      { name: 'Van rental', link: '#' }
    ]
  };

  const footerLinks = {
    turo: [
      { name: 'About', link: '#' },
      { name: 'Team', link: '#' },
      { name: 'Policies', link: '#' },
      { name: 'Careers', link: '#' },
      { name: 'Press', link: '#' },
      { name: 'OpenRoad', link: '#' },
      { name: 'Turo shop', link: '#' }
    ],
    locations: [
      { name: 'USA (EN)', link: '#' },
      { name: 'Australia (EN)', link: '#' },
      { name: 'Canada (EN)', link: '#' },
      { name: 'Canada (FR)', link: '#' },
      { name: 'France (FR)', link: '#' },
      { name: 'UK (EN)', link: '#' }
    ],
    explore: [
      { name: 'How Turo works', link: '#' },
      { name: 'Weddings', link: '#' },
      { name: 'Trust & safety', link: '#' },
      { name: 'Get help', link: '#' }
    ],
    hosting: [
      { name: 'List your car', link: '#' },
      { name: 'Calculator', link: '#' },
      { name: 'All-Star Hosts', link: '#' },
      { name: 'Host tools', link: '#' },
      { name: 'Insurance & protection', link: '#' }
    ]
  };

  return (
    <div className="mt-5 footer-main" style={{display: "flex", flexDirection: "column", alignItems: "center", backgroundColor:"#F4F4F4", borderRadius: "20px"}}>
      <div className="containerr insurance-notice">
        <p className="mb-4">* Any personal insurance you may have that covers damage to the host's vehicle would kick in before your protection plan, except in limited situations for trips booked in Maryland, but this protects your own wallet. In the US, liability insurance is provided under a policy issued to Turo by Travelers Excess and Surplus Lines Company. Terms, conditions, and exclusions apply. The policy does not provide coverage for damage to a host's vehicle.</p>
        
        <p>For questions or information about the third party liability insurance for trips in the US, consumers in Maryland and the licensed states listed <a href="#">here</a> may contact Turo Insurance Agency at (415) 508-0283 or claims@turo.agency. For questions about how damage to a host's vehicle is handled, visit the <a href="#">Turo Support</a> site.</p>
      </div>
      <div className="containerr vehicle-types">
        <h3>Vehicle types</h3>
        <div className="vehicle-grid">
          <div>
            {vehicleTypes.regular.map((vehicle) => (
              <a key={vehicle.name} href={vehicle.link} className="vehicle-link">
                {vehicle.name}
              </a>
            ))}
          </div>
          <div>
            {vehicleTypes.specialty.map((vehicle) => (
              <a key={vehicle.name} href={vehicle.link} className="vehicle-link">
                {vehicle.name}
              </a>
            ))}
          </div>
          <div>
            {vehicleTypes.commercial.map((vehicle) => (
              <a key={vehicle.name} href={vehicle.link} className="vehicle-link">
                {vehicle.name}
              </a>
            ))}
          </div>
        </div>
      </div>
      <footer className="footer" style={{backgroundColor:"#F4F4F4"}}>
        <div className="containerr">
          <div className="footer-grid">
            <div>
              <h3>Turo</h3>
              <div className="footer-links">
                {footerLinks.turo.map((link) => (
                  <a key={link.name} href={link.link} className="footer-link">
                    {link.name}
                  </a>
                ))}
              </div>
            </div>
            <div>
              <h3>Locations</h3>
              <div className="footer-links">
                {footerLinks.locations.map((link) => (
                  <a key={link.name} href={link.link} className="footer-link">
                    {link.name}
                  </a>
                ))}
              </div>
            </div>
            <div>
              <h3>Explore</h3>
              <div className="footer-links">
                {footerLinks.explore.map((link) => (
                  <a key={link.name} href={link.link} className="footer-link">
                    {link.name}
                  </a>
                ))}
              </div>
            </div>
            <div>
              <h3>Hosting</h3>
              <div className="footer-links">
                {footerLinks.hosting.map((link) => (
                  <a key={link.name} href={link.link} className="footer-link">
                    {link.name}
                  </a>
                ))}
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <div className="social-links">
              <a href="#" className="social-icon">
                <Facebook />
              </a>
              <a href="#" className="social-icon">
                <Twitter />
              </a>
              <a href="#" className="social-icon">
                <Instagram />
              </a>
              <a href="#" className="social-icon">
                <Youtube />
              </a>
              <a href="#" className="footer-link">
                <strong>BLOG</strong>
              </a>
            </div>
          </div>
          <div className="footer-copyright">
            <div className="copyright-links">
              <span>©2025 Turo</span>
              <a href="#" className="footer-link">Terms</a>
              <a href="#" className="footer-link">Privacy</a>
              <a href="#" className="footer-link">Sitemap</a>
              <a href="#" className="footer-link">Cookie preferences</a>
              <a href="#" className="footer-link">Do not sell or share my personal information</a>
            </div>
            <button className="language-selector">
              <span>English</span>
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;