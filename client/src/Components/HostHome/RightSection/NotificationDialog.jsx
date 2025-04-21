import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import axios from "axios";
import LoadingScreen from "../../LoadingScreen";
import { Calendar, MapPin } from "lucide-react";
import "./Notification.css";
import { toast } from "react-toastify";

function NotificationDialog({
  notificationDialogOpen,
  setNotificationDialogOpen,
  host,
  setCars,
}) {
  const [notificationDetails, setNotificationDetails] = useState([]);
  const [notificationLoader, setNotificationLoader] = useState(false);
  const [carAcceptLoader, setCarAcceptLoader] = useState(false);
  const [isAcceptDeclineDisable, setIsAcceptDeclineDisable] = useState(false);
  useEffect(() => {
    const fetchNotificationsDetails = async () => {
      setNotificationLoader(true);
      if (host?.notifications?.length > 0) {
        const promises = host.notifications.map(async (notification) => {
          try {
            const res = await axios.post(
              `${
                import.meta.env.VITE_BACKEND_URL
              }/host/get-car-user/notification/${notification._id}`,
              { withCredentials: true }
            );
            setNotificationLoader(false);
            return res.data;
          } catch (err) {
            setNotificationLoader(false);
            console.error("Error fetching notification details", err);
            return notification;
          }
        });
        const results = await Promise.all(promises);
        setNotificationDetails(results);
        setNotificationLoader(false);
      }
    };

    fetchNotificationsDetails();
  }, [host?.notifications]);
  const availableChange = async (
    carId,
    e,
    status,
    notificationId,
    notification
  ) => {
    const start = new Date(notification.userStartDate);
    const end = new Date(notification.userEndDate);
    const totalDays = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
    const totalAmmount = notification.carId.price * totalDays;
  
    try {
      setCarAcceptLoader(true);
  
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/host/cars/activeStatus/${carId}`,
        {
          status,
          notificationId,
          hostId: host._id,
          totalAmmount,
        },
        { withCredentials: true }
      );
  
      if (response.status === 200) {
        toast.success(response.data.message);
          try {
          const mailResponse = await axios.get(
            `${import.meta.env.VITE_BACKEND_URL}/host/send-mail/confirmation/${notification.carId._id}/${notification.userId._id}?totalAmmount=${totalAmmount}`,
            {
              withCredentials: true,
            }
          );
  
          if (mailResponse.status === 200) {
            toast.success(mailResponse.data.message || "Confirmation mail sent!");
          } else {
            toast.warning("Unexpected response from mail server.");
          }
        } catch (mailError) {
          console.error("Failed to send confirmation mail:", mailError);
          toast.error("Failed to send confirmation mail. Please try again.");
        }
          setIsAcceptDeclineDisable(true);
        setCarAcceptLoader(false);
          setCars((prevCars) =>
          prevCars.map((c) =>
            c._id === carId
              ? {
                  ...c,
                  available: response.data.car.available,
                  availableSituation: response.data.car.availableSituation,
                }
              : c
          )
        );
          setNotificationDetails((prevDetails) =>
          prevDetails.map((n) =>
            n.carId._id === carId
              ? {
                  ...n,
                  carId: {
                    ...n.carId,
                    availableSituation: response.data.car.availableSituation,
                    available: response.data.car.available,
                  },
                }
              : n
          )
        );
      } else {
        toast.error(response.data.message);
        setCarAcceptLoader(false);
      }
    } catch (error) {
      setCarAcceptLoader(false);
      console.error(error);
      toast.error("Updation failed");
    }
  };  
  return (
    <React.Fragment>
      <Dialog
        open={notificationDialogOpen}
        onClose={() => setNotificationDialogOpen((p) => !p)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Notifications</DialogTitle>
        <DialogContent dividers>
          {notificationLoader ? (
            <LoadingScreen />
          ) : notificationDetails?.length > 0 ? (
            <div className="flex flex-col gap-4">
              {notificationDetails.map((notification, index) => (
                <div
                  key={index}
                  className="p-4 rounded-xl border border-gray-300 bg-white shadow-md w-full max-w-md mx-auto"
                >
                  <DialogContentText className="text-sm md:text-base">
                    <p>
                      <strong>Booking Status:</strong>{" "}
                      {notification.bookingStatus}
                    </p>
                    <div className="flex items-center gap-1">
                      <strong>From:</strong> <Calendar size={16} />{" "}
                      {notification.userStartDate} {notification.userStartTime}
                    </div>
                    <div className="flex items-center gap-1">
                      <strong>To:</strong> <Calendar size={16} />{" "}
                      {notification.userEndDate} {notification.userEndTime}
                    </div>
                    <p>
                      <strong>User:</strong>{" "}
                      {notification.userId?.name || "User"}
                    </p>
                    <p>
                      <strong>Car:</strong> {notification.carId?.make}{" "}
                      {notification.carId?.model} ({notification.carId?.year})
                    </p>
                    <p>
                      <strong>Notification regarding:</strong>{" "}
                      {notification?.message}
                    </p>
                  </DialogContentText>
                  {notification.carId.availableSituation !== "booked" &&
                    notification.carId.availableSituation !== "canceled" &&
                    notification.message === "Booking" && (
                      <div className="flex flex-col sm:flex-row justify-end gap-2 mt-4">
                        <button
                          disabled={carAcceptLoader}
                          type="button"
                          className="btn btn-outline-secondary"
                          onClick={(e) =>
                            availableChange(
                              notification.carId._id,
                              e,
                              "canceled",
                              notification._id,
                              notification
                            )
                          }
                        >
                          {carAcceptLoader ? "loading..." : "Reject"}
                        </button>
                        <button
                          disabled={carAcceptLoader}
                          type="button"
                          className="btn btn-outline-success"
                          onClick={(e) =>
                            availableChange(
                              notification.carId._id,
                              e,
                              "booked",
                              notification._id,
                              notification
                            )
                            // sendConfirmationMail(notification)
                          }
                        >
                          {carAcceptLoader ? "loading..." : "Accept"}
                        </button>
                      </div>
                    )}
                </div>
              ))}
            </div>
          ) : (
            <DialogContentText>No notifications found.</DialogContentText>
          )}
        </DialogContent>

        <DialogActions>
          <Button
            onClick={() => setNotificationDialogOpen((p) => !p)}
            color="error"
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

export default NotificationDialog;
