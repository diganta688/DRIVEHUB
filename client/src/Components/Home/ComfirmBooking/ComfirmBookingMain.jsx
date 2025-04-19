import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import TermsAndConditions from "../../TermsAndConditions";
import { toast } from "react-toastify";
import axios from "axios";
import ConfirmTop from "./ConfirmTop";
import PickupINFO from "./PickupINFO";
import PriceBreakup from "./PriceBreakup";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import { checkUser } from "../../../utils/checkHost";

function ConfirmBookingMain() {
  const { id } = useParams();
  const [accepted, setAccepted] = useState(false);
  const [totalAmmount, setTotalAmmount] = useState(0);
  const [carInfo, setCarInfo] = useState(null);
  const [homeDelivery, setHomeDelivery] = useState(false);
  const [distanceHome, setDistanceHome] = useState(0);
  const [makePaymentLoading, setMakePaymentLoading] = useState(false);
  const [user, setUser] = useState(null);
  useEffect(() => {
    checkUser(setUser);
  }, []);
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

  useEffect(() => {
    if (!carInfo) return;
    const base = Number(carInfo.basePrice || 0);
    const security = Number(carInfo.securityDeposit || 3000);
    const delivery = homeDelivery ? distanceHome * 10 : 0;
    const platform = Number(carInfo.platformFee || 199);
    const gst = 0.18 * (base + platform);
    const total = base + security + delivery + platform + gst;
    setTotalAmmount(total.toFixed(2));
  }, [carInfo, homeDelivery, distanceHome]);

  const handlePayment = async () => {
    setMakePaymentLoading(true);
    const amount = Number(totalAmmount);
    if (!amount || amount < 100 || amount > 10000) {
      toast.error("Please enter a valid amount!");
      setMakePaymentLoading(false);
      return;
    }

    try {
      const orderResponse = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/pay/create-order`,
        {
          amount: Math.round(amount * 100),
          currency: "INR",
          receipt: `receipt_${id}`,
          notes: { userId: id },
        }
      );

      const order = orderResponse.data;
      const options = {
        key: import.meta.env.VITE_RAZOR_PAY_ID,
        amount: order.amount,
        currency: order.currency,
        name: "Keshab",
        description: "Test Transaction",
        order_id: order.id,
        handler: async (response) => {
          try {
            const verification = await axios.post(
              `${import.meta.env.VITE_BACKEND_URL}/pay/verify-payment/${id}`,
              response
            );
            if (verification.data.status === "ok") {
              toast.success("Payment Successful!");
            } else {
              toast.error("Payment verification failed");
            }
          } catch (err) {
            toast.error("Payment verification error");
            console.error(err);
          } finally {
            setMakePaymentLoading(false);
          }
        },
        modal: {
          ondismiss: () => {
            toast.info("Payment cancel by user");
            setMakePaymentLoading(false);
          },
        },
      };
      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      setMakePaymentLoading(false);
      toast.error("Error processing payment");
      console.error(err);
    }
  };
  if (!user) return null;
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 pb-3">
      <div className="max-w-4xl mx-auto">
        <div className="md:col-span-2 p-4">
          <div className="bg-white shadow-lg rounded-lg overflow-hidden p-4 relative">
            <button
              onClick={() => window.history.back()}
              className="absolute top-4 left-4 text-gray-600 hover:text-gray-900 transition"
            >
              <NavigateBeforeIcon fontSize="large" />
            </button>

            <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Checkout Page
            </h1>

            <ConfirmTop carInfo={carInfo} />
            <PickupINFO
              carInfo={carInfo}
              homeDelivery={homeDelivery}
              distanceHome={distanceHome}
            />
            <PriceBreakup
              carInfo={carInfo}
              homeDelivery={homeDelivery}
              totalAmmount={totalAmmount}
              distanceHome={distanceHome}
            />

            <div className="px-6 py-4">
              <div
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
                disabled={!accepted || makePaymentLoading}
                onClick={handlePayment}
              >
                {makePaymentLoading ? "Loading..." : "Make payment"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ConfirmBookingMain;
