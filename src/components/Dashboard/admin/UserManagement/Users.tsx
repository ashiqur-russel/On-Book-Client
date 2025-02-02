import DeleteConfirmModal from "@/components/modals/DeleteConfirmModal";
import {
  useGetUsersQuery,
  useUpdateUserStatusMutation,
  useDeleteUserMutation,
} from "@/redux/features/user/registerApi";
import { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";

const Users = () => {
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortColumn, setSortColumn] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [statusFilters, setStatusFilters] = useState<string[]>([]);
  const [deleteUserInfo, setDeleteUserInfo] = useState<{
    id: string;
    name: string;
  } | null>(null);

  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortOrder("asc");
    }
  };

  const toggleStatusFilter = (status: string) => {
    setStatusFilters((prev) =>
      prev.includes(status)
        ? prev.filter((s) => s !== status)
        : [...prev, status]
    );
  };

  const queryParams = [
    { name: "page", value: page.toString() },
    { name: "limit", value: "10" },
    { name: "searchTerm", value: searchTerm || "" },
    { name: "sort", value: `${sortColumn}:${sortOrder}` },
    ...statusFilters.map((status) => ({ name: "status", value: status })),
  ];

  const { data, isLoading, isFetching, refetch } = useGetUsersQuery(
    queryParams,
    {
      refetchOnFocus: true,
    }
  );

  const [updateUserStatus] = useUpdateUserStatusMutation();
  const [deleteUser] = useDeleteUserMutation();

  useEffect(() => {
    refetch();
  }, [searchTerm, sortColumn, sortOrder, page, statusFilters, refetch]);

  if (isLoading) {
    return (
      <div className="text-center text-lg font-semibold">Loading users...</div>
    );
  }

  const users = data?.data ?? [];
  const totalPages = data?.meta?.totalPage ?? 1;

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

  const handleDeleteUser = async () => {
    if (deleteUserInfo) {
      await deleteUser(deleteUserInfo.id);
      setDeleteUserInfo(null);
      refetch();
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6 text-center text-primary-dark">
        Users Management
      </h2>

      {/* Filters & Search */}
      <div className="flex flex-col md:flex-row items-center justify-between mb-4 bg-neutral-light p-3 rounded-md shadow">
        <input
          type="text"
          placeholder="Search by name, email, or role"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full md:w-1/3 px-4 py-2 border border-neutral-dark text-primary-dark"
        />

        <div className="flex space-x-4 mt-2 md:mt-0">
          {["pending", "approved", "blocked"].map((status) => (
            <label key={status} className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={statusFilters.includes(status)}
                onChange={() => toggleStatusFilter(status)}
                className="w-4 h-4"
              />
              <span className="text-neutral-dark capitalize">{status}</span>
            </label>
          ))}
        </div>

        <button
          onClick={refetch}
          className="px-4 py-2 bg-primary text-white hover:bg-neutral-dark transition w-32 text-center"
        >
          Refresh
        </button>
      </div>

      {isFetching && (
        <div className="text-center text-neutral-dark text-sm">
          Fetching latest data...
        </div>
      )}

      {/* Table for Large Screens */}
      <div className="hidden md:block bg-white shadow-md rounded-md overflow-x-auto">
        <table className="w-full border-collapse  border-gray-100">
          <thead className="bg-neutral-lighter">
            <tr className="text-primary-dark text-left">
              <th
                className="p-3 cursor-pointer w-1/5"
                onClick={() => handleSort("name")}
              >
                Name{" "}
                {sortColumn === "name" && (sortOrder === "asc" ? "↑" : "↓")}
              </th>
              <th
                className="p-3 cursor-pointer w-1/5"
                onClick={() => handleSort("email")}
              >
                Email{" "}
                {sortColumn === "email" && (sortOrder === "asc" ? "↑" : "↓")}
              </th>
              <th className="p-3 w-1/5">Role</th>
              <th className="p-3 w-1/5">Status</th>
              <th
                className="p-3 cursor-pointer w-1/5"
                onClick={() => handleSort("createdAt")}
              >
                Created{" "}
                {sortColumn === "createdAt" &&
                  (sortOrder === "asc" ? "↑" : "↓")}
              </th>
              <th className="p-3 text-center w-1/5">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr
                key={user.id}
                className="border-t border-gray-100 hover:bg-neutral-light"
              >
                <td className="p-3">{user.name}</td>
                <td className="p-3">{user.email}</td>
                <td className="p-3 capitalize">{user.role}</td>
                <td className="p-3 font-semibold text-primary-dark">
                  {user.status}
                </td>
                <td className="p-3">
                  {new Date(user.createdAt).toLocaleDateString()}
                </td>
                <td className="p-3 flex justify-center gap-2">
                  {user.status !== "blocked" ? (
                    <button
                      onClick={() => handleUserStatus(user.id, user.status)}
                      className="px-4 py-2 bg-zinc-800 text-white w-32"
                    >
                      {user.status === "pending" ? "Approve" : "Block"}
                    </button>
                  ) : (
                    <button
                      onClick={() => handleUserStatus(user.id, user.status)}
                      className="px-4 py-2 bg-gray-600 text-white w-32"
                    >
                      Unblock
                    </button>
                  )}
                  <button
                    onClick={() =>
                      setDeleteUserInfo({ id: user.id, name: user.name })
                    }
                    className="px-4 py-2 bg-red-300 text-white w-32"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {deleteUserInfo && (
          <DeleteConfirmModal
            itemName={deleteUserInfo.name}
            onClose={() => setDeleteUserInfo(null)}
            onConfirm={handleDeleteUser}
          />
        )}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-6">
        <ReactPaginate
          previousLabel="◀"
          nextLabel="▶"
          pageCount={totalPages}
          onPageChange={({ selected }) => setPage(selected + 1)}
          containerClassName="flex space-x-2"
          activeClassName="bg-primary text-white px-4 py-2 w-10 text-center"
          pageClassName="px-4 py-2 border border-neutral-dark w-10 text-center hover:bg-neutral-light"
        />
      </div>

      <div className="space-y-4  p-4 lg:hidden md:hidden">
        {users.map((user) => (
          <div key={user.id} className="bg-white shadow-md p-4 ">
            <p className="text-lg font-semibold">{user.name}</p>
            <p className="text-sm text-gray-500">{user.email}</p>
            <p className="text-sm capitalize">Role: {user.role}</p>
            <p className="text-sm font-bold">Status: {user.status}</p>
            <p className="text-sm text-gray-600">
              Joined: {new Date(user.createdAt).toLocaleDateString()}
            </p>

            <div className="mt-4 flex flex-wrap gap-2">
              {user.status !== "blocked" ? (
                <button
                  onClick={() => handleUserStatus(user.id, user.status)}
                  className="px-4 py-2 bg-zinc-800 text-white w-full rounded-md"
                >
                  {user.status === "pending" ? "Approve" : "Block"}
                </button>
              ) : (
                <button
                  onClick={() => handleUserStatus(user.id, user.status)}
                  className="px-4 py-2 bg-gray-600 text-white w-full rounded-md"
                >
                  Unblock
                </button>
              )}
              <button
                onClick={() =>
                  setDeleteUserInfo({ id: user.id, name: user.name })
                }
                className="px-4 py-2 bg-red-500 text-white w-full rounded-md"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Users;
