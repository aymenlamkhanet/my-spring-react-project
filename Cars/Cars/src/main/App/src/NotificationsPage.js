import React, { useState } from "react";
import Sidebar from "./Sidebar";
import {
  BellRing,
  X,
  Car,
  AlertTriangle,
  CheckCircle,
  Clock,
  UserCheck,
  Menu,
  Home,
  Settings,
} from "lucide-react";

const NotificationsPage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      icon: <Car className="text-blue-500 w-6 h-6" />,
      title: "New Reservation",
      message: "John Doe reserved a Tesla Model 3 for next week",
      timestamp: "2 mins ago",
      type: "reservation",
      read: false,
    },
    {
      id: 2,
      icon: <AlertTriangle className="text-yellow-500 w-6 h-6" />,
      title: "Pending Approval",
      message: "Sarah Johnson's reservation requires verification",
      timestamp: "10 mins ago",
      type: "pending",
      read: false,
    },
    {
      id: 3,
      icon: <Clock className="text-orange-500 w-6 h-6" />,
      title: "Overdue Return",
      message: "BMW X5 (Reg: ABC123) is 2 hours past return time",
      timestamp: "1 hour ago",
      type: "overdue",
      read: false,
    },
    {
      id: 4,
      icon: <UserCheck className="text-green-500 w-6 h-6" />,
      title: "Successful Check-in",
      message: "Mike Williams completed return of Audi Q7",
      timestamp: "3 hours ago",
      type: "completed",
      read: true,
    },
  ]);

  // Filter notifications by type
  const [filter, setFilter] = useState("all");

  // Function to dismiss a notification
  const dismissNotification = (id) => {
    setNotifications(notifications.filter((notif) => notif.id !== id));
  };

  // Function to toggle read/unread status
  const toggleReadStatus = (id) => {
    setNotifications(
      notifications.map((notif) =>
        notif.id === id ? { ...notif, read: !notif.read } : notif
      )
    );
  };

  // Filter notifications based on selected type
  const filteredNotifications =
    filter === "all"
      ? notifications
      : notifications.filter((notif) => notif.type === filter);

  return (
    <div className="flex">
      
        <Sidebar/>
      {/* Main Content Area */}
      <div className="flex-1 bg-gray-100 min-h-screen">
        {/* Header */}
        <div className="sticky top-0 bg-white shadow-md z-10 px-4 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="md:hidden text-gray-600 hover:text-gray-900"
            >
              <Menu className="w-6 h-6" />
            </button>
            <h1 className="text-xl font-bold text-gray-800">Notifications</h1>
          </div>
          <BellRing className="w-6 h-6 text-gray-500" />
        </div>

        {/* Filter Buttons */}
        <div className="p-4 flex space-x-2 bg-white">
          {["all", "reservation", "pending", "overdue", "completed"].map(
            (type) => (
              <button
                key={type}
                className={`px-3 py-1 rounded-full text-sm capitalize 
                ${
                  filter === type
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
                onClick={() => setFilter(type)}
              >
                {type}
              </button>
            )
          )}
        </div>

        {/* Notification List */}
        <div className="p-4 space-y-4">
          {filteredNotifications.length > 0 ? (
            filteredNotifications.map((notif) => (
              <div
                key={notif.id}
                className={`relative flex items-start p-4 bg-white rounded-lg shadow-md border ${
                  notif.read ? "border-gray-200" : "border-blue-500 bg-blue-50"
                }`}
              >
                {/* Icon */}
                <div className="mr-4">{notif.icon}</div>

                {/* Notification Content */}
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h2
                      className={`text-base font-semibold ${
                        notif.read ? "text-gray-800" : "text-blue-800"
                      }`}
                    >
                      {notif.title}
                    </h2>
                    <span
                      className="text-sm text-gray-500 cursor-pointer hover:underline"
                      onClick={() => toggleReadStatus(notif.id)}
                    >
                      {notif.read ? "Mark as Unread" : "Mark as Read"}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">{notif.message}</p>
                  <p className="text-xs text-gray-400 mt-1">
                    {notif.timestamp}
                  </p>
                </div>

                {/* Dismiss Button */}
                <button
                  className="absolute top-2 right-2 text-gray-400 hover:text-red-500"
                  onClick={() => dismissNotification(notif.id)}
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">
              No notifications to show for this filter.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default NotificationsPage;
