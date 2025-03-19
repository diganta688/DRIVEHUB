import React from 'react';
import { Shield, Headphones, Search, Smartphone } from 'lucide-react';

function FeatureCard({ icon: Icon, title, description, link = '' }) {
    return (
      <div className="p-6 rounded-2xl hover:shadow-xl transition-shadow" style={{padding: "1rem"}}>
        <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center mb-4">
          <Icon className="w-6 h-6 text-indigo-600" />
        </div>
        <h3 className="text-xl font-bold mb-3 text-gray-900">{title}</h3>
        <p className="text-gray-600 leading-relaxed mb-4">{description}</p>
        {link && (
          <a 
            href={link} 
            className="text-indigo-600 hover:text-indigo-700 font-medium inline-flex items-center"
          >
            Learn more
            <svg className="w-4 h-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
          </a>
        )}
      </div>
    );
  }

function HostInfo() {
    return (
        <div className="min-h-screen  from-gray-50 to-gray-100 py-20 px-4 sm:px-6 lg:px-8" style={{marginTop: "4rem"}}>
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Built-in infrastructure to
                <br />
                get you up & running
              </h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                DriveHUB provides the tools to help hosts thrive
              </p>
            </div>
    
            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              <FeatureCard
                icon={Shield}
                title="Insurance included"
                description="Rest easy knowing you're covered with up to $750,000** in third-party liability insurance from Travelers, plus you choose from an array of protection plans that include varying levels of reimbursement for car repairs, up to your car's actual cash value*** in case of damage during a trip."
                link="#learn-more-about-vehicle-protection"
              />
    
              <FeatureCard
                icon={Headphones}
                title="Safety & support"
                description="Get access to 24/7 Customer Support, roadside assistance for your guests, an experienced trust and safety team to support you through thick and thin, and one-on-one business coaching to share market intelligence and help you build a savvy business."
              />
    
              <FeatureCard
                icon={Search}
                title="Demand generation"
                description="Get instant access to millions of active guests from around the world, plus marketing and advertising support from DriveHUB, the world's largest car sharing marketplace."
              />
    
              <FeatureCard
                icon={Smartphone}
                title="An easy-to-use app"
                description="Manage your business and your bookings seamlessly on the go — manage trips, tweak your pricing, message your guests, and more, all from your phone."
              />
            </div>
          </div>
        </div>
      );
}

export default HostInfo;