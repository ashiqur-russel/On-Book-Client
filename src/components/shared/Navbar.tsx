import { useState } from "react";
import {
  AiOutlineMenu,
  AiOutlineClose,
  AiOutlineLock,
  AiOutlineLogout,
} from "react-icons/ai";
import { FaBell } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import { logOut, selectCurrentUser } from "../../redux/features/auth/authSlice";
import { ShoppingBag } from "lucide-react";
import { selectCurrentStore } from "@/redux/features/product/productSlice";
import { toggleCart } from "@/redux/features/global/globalSlice";
import {
  useGetNotificationsQuery,
  useMarkNotificationReadMutation,
} from "@/redux/features/notification/notificationApi";

interface INotification {
  _id: string;
  message: string;
  status: "read" | "unread";
}

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectCurrentUser);

  const [menuOpen, setMenuOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logOut());
    navigate("/signin");
  };

  const openCartHandler = () => {
    dispatch(toggleCart());
  };

  const { cart } = useAppSelector(selectCurrentStore);
  const totalItems = cart.length | 0;

  const {
    data: notifications,
    isLoading,
    refetch,
  } = useGetNotificationsQuery(undefined);

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
    <nav className="fixed bg-black z-40 w-full px-3 md:px-10 lg:px-24 py-4">
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center space-x-8">
          <h1 className="text-3xl font-bold text-white">
            <NavLink to={"/"} className="hover:text-gray-300">
              On.Book
            </NavLink>
          </h1>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center space-x-6">
            <NavLink
              to="/products"
              className="text-white font-medium hover:text-gray-300 transition"
            >
              Books
            </NavLink>

            {user && (
              <NavLink
                to={`/dashboard/${user.role}`}
                className="text-white font-medium hover:text-gray-300 transition"
              >
                Dashboard
              </NavLink>
            )}
          </div>
        </div>

        {/* Right Side Icons (Desktop) */}
        <div className="hidden lg:flex items-center space-x-6">
          {/* Cart Icon */}
          <div
            onClick={openCartHandler}
            className="relative cursor-pointer text-white hover:text-gray-300 transition"
          >
            <ShoppingBag width={18} />
            {totalItems > 0 && (
              <span className="absolute inline-flex size-3 -top-3 bg-amber-100 text-amber-700 -right-2 rounded-full text-center items-center p-2 justify-center text-sm">
                {totalItems}
              </span>
            )}
          </div>

          {/* Notification Bell */}
          {user && (
            <div className="relative">
              <FaBell
                onClick={() => setNotificationOpen((prev) => !prev)}
                className="w-5 h-5 cursor-pointer text-white hover:text-gray-300 transition"
              />
              {/* Show unread count if > 0 */}
              {unreadCount > 0 && (
                <span className="absolute inline-flex items-center justify-center rounded-full text-xs bg-red-600 text-white -top-2 -right-2 w-5 h-5">
                  {unreadCount}
                </span>
              )}

              {/* Dropdown */}
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
                        onClick={() =>
                          handleNotificationClick(notification._id)
                        }
                        className="p-2 border-b last:border-b-0 border-gray-200 cursor-pointer"
                      >
                        <p className="text-gray-800 text-sm">
                          {notification.message}
                        </p>
                        {notification.status === "unread" && (
                          <span className="text-xs text-blue-500">
                            Mark as read
                          </span>
                        )}
                      </div>
                    ))}
                </div>
              )}
            </div>
          )}

          {user ? (
            <button
              onClick={handleLogout}
              className="flex items-center space-x-1 text-white hover:text-gray-300 font-medium transition"
            >
              <AiOutlineLogout className="w-5 h-5" />
              <span>Logout</span>
            </button>
          ) : (
            <NavLink
              to={"/signin"}
              className="flex items-center space-x-1 text-white hover:text-gray-300 font-medium transition"
            >
              <AiOutlineLock className="w-5 h-5" />
              <span>Login</span>
            </NavLink>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden text-white focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? (
            <AiOutlineClose className="w-6 h-6" />
          ) : (
            <AiOutlineMenu className="w-6 h-6" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed top-0 right-0 z-30 h-full w-64 bg-black shadow-lg transform transition-transform duration-300 ease-in-out lg:hidden ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-4 flex justify-between items-center border-b border-gray-700">
          <span className="flex items-center gap-2">
            <h2 className="text-xl font-bold text-white">Menu</h2>
            <ShoppingBag size={18} className="text-white" />
          </span>
          {user && (
            <div className="relative">
              <FaBell
                onClick={() => setNotificationOpen((prev) => !prev)}
                className="w-5 h-5 cursor-pointer text-white hover:text-gray-300 transition"
              />
              {/* Show unread count if > 0 */}
              {unreadCount > 0 && (
                <span className="absolute inline-flex items-center justify-center rounded-full text-xs bg-red-600 text-white -top-2 -right-2 w-5 h-5">
                  {unreadCount}
                </span>
              )}

              {/* Dropdown */}
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
                        onClick={() =>
                          handleNotificationClick(notification._id)
                        }
                        className="p-2 border-b last:border-b-0 border-gray-200 cursor-pointer"
                      >
                        <p className="text-gray-800 text-sm">
                          {notification.message}
                        </p>
                        {notification.status === "unread" && (
                          <span className="text-xs text-blue-500">
                            Mark as read
                          </span>
                        )}
                      </div>
                    ))}
                </div>
              )}
            </div>
          )}

          <button
            className="text-white focus:outline-none hover:text-gray-300"
            onClick={() => setMenuOpen(false)}
          >
            <AiOutlineClose className="w-6 h-6" />
          </button>
        </div>
        <ul className="p-4 space-y-4">
          <li>
            <NavLink
              to="/products"
              className="text-white hover:text-gray-300 transition"
              onClick={() => setMenuOpen(false)}
            >
              Books
            </NavLink>
          </li>

          {user && (
            <li>
              <NavLink
                to={`/dashboard/${user.role}`}
                className="text-white hover:text-gray-300 transition"
                onClick={() => setMenuOpen(false)}
              >
                Dashboard
              </NavLink>
            </li>
          )}

          {/* Login / Logout Button */}
          {user ? (
            <button
              onClick={handleLogout}
              className="flex items-center space-x-1 text-white hover:text-gray-300 font-medium transition"
            >
              <AiOutlineLogout className="w-5 h-5" />
              <span>Logout</span>
            </button>
          ) : (
            <>
              <NavLink
                to={"/signin"}
                className="flex items-center space-x-1 text-white hover:text-gray-300 font-medium transition"
              >
                <AiOutlineLock className="w-5 h-5" />
                <span>Login</span>
              </NavLink>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
