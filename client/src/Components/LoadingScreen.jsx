import React from "react";
import { motion } from "framer-motion";

function LoadingScreen() {
  return (
    <div className="flex flex-col items-center justify-center p-4 bg-white rounded-md">
      <motion.div
        className="w-10 h-10 border-4 border-gray-300 border-t-blue-500 rounded-full"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
      />
      <motion.p
        className="mt-2 text-sm font-medium text-gray-600"
        animate={{ opacity: [0.3, 1, 0.3] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        Loading...
      </motion.p>
    </div>
  );
}

export default LoadingScreen;
