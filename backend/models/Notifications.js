const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const notificationSchema = new Schema(
  {
    userId: { 
      type: Schema.Types.ObjectId, 
      ref: "User", 
      required: true 
    },
    carId: { 
      type: Schema.Types.ObjectId, 
      ref: "Car", 
      required: true 
    },
    message:{
        type: String,
        required: true
    },
    bookingStatus: { 
      type: String, 
      enum: ["pending", "booked", "cancelled", "completed"], 
      default: "pending" 
    },
    userStartDate: { 
      type: String, 
      required: true 
    },
    userEndDate: { 
      type: String, 
      required: true 
    },
    userStartTime: { 
      type: String, 
      required: true 
    },
    userEndTime: { 
      type: String, 
      required: true 
    },
    createdAt: { 
      type: Date, 
      default: Date.now 
    },
    updatedAt: { 
      type: Date, 
      default: Date.now 
    },
  },
  { timestamps: true }
);

const NotificationModel = mongoose.model("Notification", notificationSchema);

module.exports = NotificationModel;
