import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Calendar,
  Car,
  Clock,
  CreditCard,
  MapPin,
  User,
  Shield,
} from "lucide-react";
import TermsAndConditions from "../../TermsAndConditions";

function ComfirmBookingMain() {
  const [accepted, setAccepted] = useState(false);
  const [carInfo, setCarInfo] = useState(null);
  const [homeDelivery, setHomeDelivery] = useState(false);
  const [distanceHome, setDistanceHome] = useState(0);
  const handleCheckboxChange = (e) => {
    setAccepted(e.target.checked);
  };
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    const {
      display,
      carDetails,
      homeDelivery: isHomeDelivery,
      Distance,
    } = location.state || {};
    const distance = Distance ?? 0;
    setDistanceHome(distance);
    setCarInfo(carDetails);
    if (isHomeDelivery) {
      setHomeDelivery(true);
    }
    if (!display) {
      navigate("/home");
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 pb-3">
      <div className="max-w-4xl mx-auto">
        <div className="">
          <div className="md:col-span-2 p-4">
            <div className="bg-white shadow-lg rounded-lg overflow-hidden p-4">
              <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                Checkout Page
              </h1>
              <div className="px-6 py-6 border-b">
                <div className="flex items-center gap-4 mb-4">
                  <Car className="h-6 w-6 text-gray-500" />
                  <h2 className="text-xl font-semibold text-gray-800">
                    {carInfo?.name}
                  </h2>
                </div>
                <img
                  src={carInfo?.image}
                  alt="Car image"
                  className="w-full h-48 object-cover rounded-lg"
                />
              </div>

              <div className="px-6 py-4 border-b">
                <div className="space-y-4">
                  <div>
                    <h3 className="flex items-center gap-2 text-gray-600 font-medium mb-2">
                      <MapPin className="h-5 w-5" /> Pickup Location
                    </h3>
                    {homeDelivery ? (
                      <p className="text-gray-800">{`Home Delivery (${distanceHome} km)`}</p>
                    ) : carInfo && carInfo.availableLocations ? (
                      <p className="text-gray-800 px-3">
                        {carInfo.availableLocations} (from store)
                      </p>
                    ) : (
                      <p style={{ color: "red" }} className=" px-3">
                        fetching issue
                      </p>
                    )}
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h3 className="flex items-center gap-2 text-gray-600 font-medium mb-2">
                        <Calendar className="h-5 w-5" /> Pickup
                      </h3>
                      <p className="text-gray-800">
                        {carInfo?.StartDate
                          ? carInfo.StartDate
                          : "fetching issue"}
                      </p>
                      <p className="text-gray-600 flex items-center gap-1 mt-1">
                        <Clock className="h-4 w-4" />{" "}
                        {carInfo?.StartTime
                          ? carInfo.StartTime
                          : "fetching issue"}
                      </p>
                    </div>

                    <div>
                      <h3 className="flex items-center gap-2 text-gray-600 font-medium mb-2">
                        <Calendar className="h-5 w-5" /> Return
                      </h3>
                      <p className="text-gray-800">
                        {carInfo?.EndDate ? carInfo.EndDate : "fetching issue"}
                      </p>
                      <p className="text-gray-600 flex items-center gap-1 mt-1">
                        <Clock className="h-4 w-4" />{" "}
                        {carInfo?.EndTime ? carInfo.EndTime : "fetching issue"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="px-6 py-4 border-b">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  Price Breakup
                </h3>
                <div className="space-y-2 text-gray-700">
                  <div className="flex justify-between">
                    <span>Base Fare</span>
                    <span>₹{Number(carInfo?.basePrice || 0).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Security Deposit</span>
                    <span>
                      ₹{Number(carInfo?.securityDeposit || 3000).toFixed(2)}
                    </span>
                  </div>
                  {homeDelivery && (
                    <div className="flex justify-between">
                      <span>Doorstep Delivery ({distanceHome} km)</span>
                      <span>₹{(distanceHome * 10).toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>Platform Fee</span>
                    <span>
                      ₹{Number(carInfo?.platformFee || 199).toFixed(2)}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span>GST (18%) on Base + Platform</span>
                    <span>
                      ₹
                      {(
                        0.18 *
                        (Number(carInfo?.basePrice || 0) +
                          Number(carInfo?.platformFee || 199))
                      ).toFixed(2)}
                    </span>
                  </div>

                  <hr className="my-2" />
                  <div className="flex justify-between font-bold text-gray-900">
                    <span>Total</span>
                    <span>
                      ₹
                      {(() => {
                        const base = Number(carInfo?.basePrice || 0);
                        const security = Number(
                          carInfo?.securityDeposit || 3000
                        );
                        const delivery = homeDelivery ? distanceHome * 10 : 0;
                        const platform = Number(carInfo?.platformFee || 199);
                        const gst = 0.18 * (base + platform);
                        const total =
                          base + security + delivery + platform + gst;
                        return total.toFixed(2);
                      })()}
                    </span>
                  </div>
                </div>
              </div>

              <div className="px-6 py-4">
                <div
                  className=""
                  style={{
                    height: "15rem",
                    overflowY: "auto",
                    borderLeft: "2px solid",
                    borderRight: "2px solid",
                  }}
                >
                  <TermsAndConditions />
                </div>
                <div className="flex items-start gap-2">
                  <input
                    type="checkbox"
                    id="acceptTerms"
                    checked={accepted}
                    onChange={handleCheckboxChange}
                    className="mt-1"
                    required
                  />
                  <label htmlFor="acceptTerms" className="text-sm">
                    <span className="text-red-600 mx-1">*</span>I have read and
                    agree to the terms and conditions.
                  </label>
                </div>

                <p className="text-sm text-gray-500 italic">
                  Note: These terms are governed by Indian law. Disputes will be
                  resolved under jurisdiction of [Your City] courts.
                </p>
              </div>
              <div className="w-full">
                <button
                  className="w-full bg-orange-500 text-white py-2 rounded hover:bg-orange-600 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={!accepted}
                >
                  Make payment
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ComfirmBookingMain;
