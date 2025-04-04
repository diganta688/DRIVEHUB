import React from "react";
import KeyFeatures from "./KeyFeatures";
import { HostMainContext } from "../../../Context/context";
import { useContext } from "react";

function AllFeatureRender() {
  const { formData, setFormData } = useContext(HostMainContext);
  return (
    <>
    <p className="text-lg font-semibold my-3">Safety Features</p>
    <div className="space-y-4">
      <KeyFeatures
        label="Airbags (e.g., Front, Side, Curtain)"
        name="airbags"
        checked={formData.features.airbags}
        onChange={(e) => {
          setFormData((prev) => ({
            ...prev,
            features: { ...prev.features, airbags: e.target.checked },
          }));
        }}
      />
      <KeyFeatures
        label="Anti-lock Braking System (ABS)"
        name="abs"
        checked={formData.features.abs}
        onChange={(e) => {
          setFormData((prev) => ({
            ...prev,
            features: { ...prev.features, abs: e.target.checked },
          }));
        }}
      />
      <KeyFeatures
        label="Traction Control"
        name="tractionControl"
        checked={formData.features.tractionControl}
        onChange={(e) => {
          setFormData((prev) => ({
            ...prev,
            features: {
              ...prev.features,
              tractionControl: e.target.checked,
            },
          }));
        }}
      />
      <KeyFeatures
        label="Parking Sensors / Cameras"
        name="parkingSensors"
        checked={formData.features.parkingSensors}
        onChange={(e) => {
          setFormData((prev) => ({
            ...prev,
            features: {
              ...prev.features,
              parkingSensors: e.target.checked,
            },
          }));
        }}
      />
      <KeyFeatures
        label="Blind Spot Monitoring"
        name="blindSpotMonitoring"
        checked={formData.features.blindSpotMonitoring}
        onChange={(e) => {
          setFormData((prev) => ({
            ...prev,
            features: {
              ...prev.features,
              blindSpotMonitoring: e.target.checked,
            },
          }));
        }}
      />
    </div>
    </>
    
  );
}

export default AllFeatureRender;
