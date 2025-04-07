import React, { useState } from "react";

function TermsAndConditions() {

  return (
    <div className="max-w-4xl mx-auto p-3 bg-white rounded-lg shadow-md my-8">
      <h3 className="text-3xl font-bold mb-4 text-center">Terms and Conditions</h3>
      <p className="mb-4">Effective Date: <strong>April 7, 2025</strong></p>

      <section className="mb-6">
        <h6 className="text-xl font-semibold mb-2">1. Eligibility</h6>
        <ul className="list-disc ml-6 space-y-1">
          <li>You must be at least 18 years old to rent a car.</li>
          <li>A valid Indian driving license is required for all rentals.</li>
          <li>You must provide accurate and complete information during the booking process.</li>
        </ul>
      </section>

      <section className="mb-6">
        <h6 className="text-xl font-semibold mb-2">2. Booking and Payments</h6>
        <ul className="list-disc ml-6 space-y-1">
          <li>Valid ID proof and driving license must be presented at pickup.</li>
          <li>Full payment including security deposit must be made before the trip starts.</li>
          <li>We accept Razorpay, UPI, and Debit/Credit Cards.</li>
        </ul>
      </section>

      <section className="mb-6">
        <h6 className="text-xl font-semibold mb-2">3. Security Deposit</h6>
        <p>The security deposit will be refunded within 3–7 working days after trip completion, subject to inspection.</p>
      </section>

      <section className="mb-6">
        <h6 className="text-xl font-semibold mb-2">4. Fuel Policy</h6>
        <p>The vehicle must be returned with the same fuel level as provided. Any shortage will be charged.</p>
      </section>

      <section className="mb-6">
        <h6 className="text-xl font-semibold mb-2">5. Usage Policy</h6>
        <ul className="list-disc ml-6 space-y-1">
          <li>No racing, towing, illegal activity, or drunk driving.</li>
          <li>Daily kilometer limits may apply.</li>
        </ul>
      </section>

      <section className="mb-6">
        <h6 className="text-xl font-semibold mb-2">6. Doorstep Delivery</h6>
        <ul className="list-disc ml-6 space-y-1">
          <li>Available with extra charges.</li>
          <li>Correct address and availability required.</li>
        </ul>
      </section>

      <section className="mb-6">
        <h6 className="text-xl font-semibold mb-2">7. Late Return & Cancellation</h6>
        <ul className="list-disc ml-6 space-y-1">
          <li>Late returns incur hourly charges.</li>
          <li>Cancellations made:
            <ul className="list-disc ml-6">
              <li>More than 24 hours before pickup: Full refund</li>
              <li>Less than 24 hours: Partial refund (excluding platform fee)</li>
            </ul>
          </li>
        </ul>
      </section>

      <section className="mb-6">
        <h6 className="text-xl font-semibold mb-2">8. Damage & Insurance</h6>
        <ul className="list-disc ml-6 space-y-1">
          <li>Basic insurance is included.</li>
          <li>User is liable for damage due to negligence.</li>
          <li>Accidents must be reported immediately.</li>
        </ul>
      </section>

      <section className="mb-6">
        <h6 className="text-xl font-semibold mb-2">9. User Responsibilities</h6>
        <ul className="list-disc ml-6 space-y-1">
          <li>Be punctual for pickup and return.</li>
          <li>Keep the car clean and report issues promptly.</li>
        </ul>
      </section>

      <section className="mb-6">
        <h6 className="text-xl font-semibold mb-2">10. Platform Rights</h6>
        <ul className="list-disc ml-6 space-y-1">
          <li>We may cancel any booking at our discretion.</li>
          <li>Terms may change and continued use implies agreement.</li>
        </ul>
      </section>

      <section className="mb-6">
        <h6 className="text-xl font-semibold mb-2">11. Contact Us</h6>
        <p>
          Email: <a href="mailto:support@yourwebsite.com" className="text-blue-500 underline">support@yourwebsite.com</a><br />
          Phone: +91-XXXXXXXXXX
        </p>
      </section>

      
    </div>
  );
}

export default TermsAndConditions;
