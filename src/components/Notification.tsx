import { useEffect } from "react";
import io from "socket.io-client";
import { toast } from "sonner";

//TODO: Replace the URL and Move it to a config file
const socket = io("http://localhost:5001");

interface NotificationProps {
  userId: string;
}

const Notification = ({ userId }: NotificationProps) => {
  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected with socket id", socket.id);
      socket.emit("joinRoom", userId);
    });

    socket.on("notification", (message: string) => {
      console.log("Received notification:", message);
    });

    socket.on(
      "refundNotification",
      (data: { message: string; refundAmount: number }) => {
        toast.success(`${data.message} Amount: $${data.refundAmount}`, {
          duration: Infinity,
          action: {
            label: "Close",
            onClick: () => console.log("Undo"),
          },
        });
      }
    );

    return () => {
      socket.off("connect");
      socket.off("refundNotification");
      socket.off("notification");
    };
  }, [userId]);

  return <div></div>;
};

export default Notification;
