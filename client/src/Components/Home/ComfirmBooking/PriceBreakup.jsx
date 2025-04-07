import React from "react";
import InfoIcon from "@mui/icons-material/Info";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";

function PriceBreakup({ carInfo, homeDelivery, distanceHome }) {
  const baseFare = Number(carInfo?.basePrice || 0);
  const securityDeposit = Number(carInfo?.securityDeposit || 3000);
  const platformFee = Number(carInfo?.platformFee || 199);
  const deliveryCharge = homeDelivery ? 500 : 0;

  const gst = 0.18 * (baseFare + platformFee);
  const totalAmount = (
    baseFare +
    platformFee +
    gst +
    securityDeposit +
    deliveryCharge
  ).toFixed(2);

  return (
    <div className="px-6 py-4 border-b">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">
        Price Breakup
      </h3>
      <div className="space-y-2 text-gray-700">
        <div className="flex justify-between">
          <span>Base Fare</span>
          <span>₹{baseFare.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span>
            Security Deposit{" "}
            <Tooltip title="This amount will be refunded to your account after you return the car">
              <IconButton size="small">
                <InfoIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </span>

          <span>₹{securityDeposit.toFixed(2)}</span>
        </div>
        {homeDelivery && (
          <div className="flex justify-between">
            <span>Doorstep Delivery ({distanceHome} km)</span>
            <span>₹{deliveryCharge.toFixed(2)}</span>
          </div>
        )}
        <div className="flex justify-between">
          <span>Platform Fee</span>
          <span>₹{platformFee.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span>GST (18%) on Base + Platform</span>
          <span>₹{gst.toFixed(2)}</span>
        </div>
        <hr className="my-2" />
        <div className="flex justify-between font-bold text-gray-900">
          <span>Total</span>
          <span>₹{totalAmount}</span>
        </div>
      </div>
    </div>
  );
}

export default PriceBreakup;
