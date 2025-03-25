import { FaBell } from "react-icons/fa";
import {
  useGetNotificationsQuery,
  useMarkNotificationReadMutation,
} from "@/redux/features/notification/notificationApi";
import { useState } from "react";

interface INotification {
  _id: string;
  message: string;
  status: "read" | "unread";
}

const NotificationList = () => {
  const [notificationOpen, setNotificationOpen] = useState(false);
  const {
    data: notifications,
    isLoading,
    refetch,
  } = useGetNotificationsQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });
  const [markNotificationRead] = useMarkNotificationReadMutation();

  const unreadCount =
    notifications?.data?.filter((n: INotification) => n.status === "unread")
      .length ?? 0;

  const handleNotificationClick = async (notificationId: string) => {
    try {
      await markNotificationRead(notificationId);
      refetch();
    } catch (error) {
      console.error("Failed to mark notification as read", error);
    }
  };

  return (
    <div className="relative">
      <FaBell
        onClick={() => setNotificationOpen(!notificationOpen)}
        className="w-5 h-5 cursor-pointer text-white hover:text-gray-300 transition"
      />
      {unreadCount > 0 && (
        <span
          className="absolute inline-flex items-center justify-center 
                         rounded-full text-xs bg-red-600 text-white 
                         -top-2 -right-2 w-5 h-5"
        >
          {unreadCount}
        </span>
      )}
      {notificationOpen && (
        <div className="absolute right-0 mt-2 w-72 bg-white rounded shadow-lg p-2 z-50">
          <h3 className="text-gray-700 font-semibold border-b pb-1 mb-2">
            Notifications
          </h3>
          {isLoading && <div className="text-gray-500">Loading...</div>}
          {!isLoading && notifications?.data?.length === 0 && (
            <div className="text-gray-500">No notifications</div>
          )}
          {!isLoading &&
            notifications?.data?.map((notification: INotification) => (
              <div
                key={notification._id}
                onClick={() => handleNotificationClick(notification._id)}
                className="p-2 border-b last:border-b-0 border-gray-200 cursor-pointer"
              >
                <p className="text-gray-800 text-sm">{notification.message}</p>
                {notification.status === "unread" && (
                  <span className="text-xs text-blue-500">Mark as read</span>
                )}
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default NotificationList;
