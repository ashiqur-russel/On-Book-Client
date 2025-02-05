import { useState } from "react";
import {
  FaUsers,
  FaUserCheck,
  FaUserTimes,
  FaUserShield,
} from "react-icons/fa";
import { BsSearch } from "react-icons/bs";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
import {
  useGetUsersQuery,
  useUpdateUserStatusMutation,
  useDeleteUserMutation,
} from "@/redux/features/user/registerApi";
import DeleteConfirmModal from "@/components/modals/DeleteConfirmModal";
import SummaryCard from "./SummayCard";

const getStatusBadge = (status: string) => {
  const statusClasses: Record<string, string> = {
    pending: "bg-yellow-100 text-yellow-800",
    approved: "bg-green-100 text-green-800",
    active: "bg-blue-100 text-blue-800",
    blocked: "bg-red-100 text-red-800",
  };

  return (
    <span
      className={`px-2 py-1 rounded-full text-xs font-semibold ${
        statusClasses[status] || "bg-gray-100 text-gray-800"
      }`}
    >
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
};

const Users = () => {
  const [queryParams, setQueryParams] = useState({
    status: "",
    searchTerm: "",
    page: 1,
    limit: 10,
  });

  const queryArray = Object.entries(queryParams)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    .filter(([_, value]) => value !== "")
    .map(([key, value]) => ({ name: key, value }));

  const { data, isLoading, error, refetch } = useGetUsersQuery(queryArray);
  const users = data?.data ?? [];
  const totalUsers = data?.meta?.total ?? 0;
  const totalPages = data?.meta?.totalPage ?? 1;

  const [updateUserStatus] = useUpdateUserStatusMutation();
  const [deleteUser] = useDeleteUserMutation();
  const [deleteUserInfo, setDeleteUserInfo] = useState<{
    id: string;
    name: string;
  } | null>(null);

  const handleUserStatus = async (userId: string, currentStatus: string) => {
    let newStatus: string = "";
    switch (currentStatus) {
      case "pending":
        newStatus = "approved";
        break;
      case "approved":
      case "active":
        newStatus = "blocked";
        break;
      case "blocked":
        newStatus = "active";
        break;
      default:
        return;
    }

    try {
      await updateUserStatus({ userId, status: newStatus }).unwrap();
      refetch();
    } catch (error) {
      console.error("Error updating user status:", error);
    }
  };

  // ✅ Handle Delete
  const handleDeleteUser = async () => {
    if (deleteUserInfo) {
      await deleteUser(deleteUserInfo.id);
      setDeleteUserInfo(null);
      refetch();
    }
  };

  // ✅ Handle Filter
  const handleFilterClick = (filter: string) => {
    setQueryParams({
      ...queryParams,
      status: filter === "All" ? "" : filter.toLowerCase(),
      page: 1,
    });
  };

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setQueryParams({ ...queryParams, page: newPage });
    }
  };

  return (
    <div className="p-6">
      {error && (
        <div className="bg-red-100 text-red-700 p-3 mb-4 rounded-md">
          Error fetching data: {JSON.stringify(error)}
        </div>
      )}

      <h1 className="text-3xl font-bold text-gray-900 mb-6">
        Users Management
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <SummaryCard
          icon={<FaUsers />}
          title="Total Users"
          value={totalUsers.toString()}
        />
        <SummaryCard icon={<FaUserCheck />} title="Active Users" value="75" />
        <SummaryCard icon={<FaUserShield />} title="Blocked Users" value="5" />
        <SummaryCard icon={<FaUserTimes />} title="Pending Users" value="20" />
      </div>

      <div className="flex flex-col lg:flex-row justify-between gap-2 items-center mb-4">
        <div className="grid grid-cols-5 gap-2">
          {["All", "Pending", "Approved", "Active", "Blocked"].map((filter) => (
            <button
              key={filter}
              onClick={() => handleFilterClick(filter)}
              className={`px-2 py-1 border rounded-sm text-xs ${
                queryParams.status === filter.toLowerCase()
                  ? "bg-blue-600 text-white"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        <div className="relative">
          <BsSearch className="absolute left-3 top-2.5 text-gray-500" />
          <input
            type="text"
            placeholder="Search Users..."
            value={queryParams.searchTerm}
            onChange={(e) =>
              setQueryParams({
                ...queryParams,
                searchTerm: e.target.value,
                page: 1,
              })
            }
            className="border border-gray-300 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white p-6 rounded-lg shadow-md text-black">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse rounded-lg overflow-hidden min-w-[800px]">
            <thead className="bg-gray-200 text-gray-600 text-left">
              <tr>
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Email</th>
                <th className="px-4 py-2">Role</th>
                <th className="px-4 py-2">Status</th>
                <th className="px-4 py-2 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {!isLoading && users.length > 0 ? (
                users.map((user) => (
                  <tr
                    key={user.id}
                    className="border-t border-gray-200 hover:bg-gray-100"
                  >
                    <td className="px-4 py-3">{user.name}</td>
                    <td className="px-4 py-3">{user.email}</td>
                    <td className="px-4 py-3">{user.role}</td>
                    <td className="px-4 py-3">{getStatusBadge(user.status)}</td>
                    <td className="px-4 py-3 text-right flex space-x-2 w-full">
                      <button
                        onClick={() => handleUserStatus(user.id, user.status)}
                        className="px-3 py-1 w-full cursor-pointer text-sm bg-gray-600 text-white rounded"
                      >
                        {user.status === "pending"
                          ? "Approve"
                          : user.status === "blocked"
                          ? "Unblock"
                          : "Block"}
                      </button>
                      <button
                        onClick={() =>
                          setDeleteUserInfo({ id: user.id, name: user.name })
                        }
                        className="px-3 py-1 w-full cursor-pointer text-sm bg-red-500 text-white rounded"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="text-center py-4">
                    No users found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="flex justify-between items-center mt-4">
          <p className="text-gray-600">
            Showing {(queryParams.page - 1) * queryParams.limit + 1} -{" "}
            {Math.min(queryParams.page * queryParams.limit, totalUsers)} of{" "}
            {totalUsers} users
          </p>
          <div className="flex items-center space-x-2">
            <button
              className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition"
              onClick={() => handlePageChange(queryParams.page - 1)}
              disabled={queryParams.page === 1}
            >
              <BiChevronLeft className="w-5 h-5" />
            </button>
            <span className="px-3 py-1 border rounded-lg text-gray-900">
              {queryParams.page} / {totalPages}
            </span>
            <button
              className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition"
              onClick={() => handlePageChange(queryParams.page + 1)}
              disabled={queryParams.page === totalPages}
            >
              <BiChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {deleteUserInfo && (
        <DeleteConfirmModal
          content={
            <div className="text-center">
              <p className="text-lg font-semibold text-red-600">
                Are you sure you want to delete user{" "}
                <span className="font-bold">{deleteUserInfo.name}</span>?
              </p>
            </div>
          }
          onClose={() => setDeleteUserInfo(null)}
          onConfirm={handleDeleteUser}
        />
      )}
    </div>
  );
};

export default Users;
