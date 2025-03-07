import React from "react";
import "./CarDescription.css";

function CarDescription() {
  return (
  <>
  <div class="container">
        <div class="header">
            <h1>Maruti Swift AT</h1>
        </div>
        <div class="car-info">
            <img src="https://avgmotors.co.in/wp-content/uploads/2022/03/Pearl-Arctic-White-2-876x535.png" alt="Car Image"/>
            
            <div class="car-details">
                <p>5 seats</p>
                <p>Automatic</p>
                <p>Petrol</p>
            </div>
        </div>

        <div class="booking-details">
            <div class="box">
                <h2>Booking Details</h2>
                <p>Pickup: Sun, 2 Mar 10:00</p>
                <p>Drop-off: Sat, 8 Mar 12:30</p>
                <p>Duration: 6 Days, 2.5 Hours</p>
                <p>City: Kolkata</p>
                <p>Plan: Includes 1617 kms, excludes fuel</p>
            </div>
            <div class="box fare-summary">
                <h2>Fare Details</h2>
                <div>Base fare <span>₹13243</span></div>
                <div>Doorstep delivery & pickup <span>₹500</span></div>
                <div>Insurance & GST <span>Included</span></div>
                <div>Refundable security deposit <span>₹2000</span></div>
                <hr/>
                <div class="total">Total <span>₹15743</span></div>
                <button class="proceed-btn">Proceed <span>&gt;</span></button>
            </div>
        </div>

        <div class="important-points">
            <h3>Important Points to Remember</h3>
            <table>
                <tr><th>Change in Pricing Plan</th><td>Cannot be changed after booking</td></tr>
                <tr><th>Fuel</th><td>Flat ₹500 refuelling service charge + fuel cost</td></tr>
                <tr><th>Tolls, Parking, Taxes</th><td>To be paid by you</td></tr>
                <tr><th>ID Verification</th><td>Original/DigiLocker driving license required</td></tr>
                <tr><th>Pre-Handover Inspection</th><td>Inspect car (fuel gauge & odometer)</td></tr>
            </table>
        </div>
    </div>
  </>
  );
}

export default CarDescription;
