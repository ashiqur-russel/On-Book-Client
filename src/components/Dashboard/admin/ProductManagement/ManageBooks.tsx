import React, { useState, Suspense, lazy } from "react";
import { FaEdit, FaTrash, FaPlusCircle } from "react-icons/fa";
import { BsSearch } from "react-icons/bs";
import { toast } from "sonner";
import {
  useGetAllProductsQuery,
  useOfferProductMutation,
} from "@/redux/features/product/productApi";
import { IProduct } from "@/types";
import Pagination from "@/components/shared/Pagination";

const LazyOfferModal = lazy(() => import("@/components/modals/OfferModal"));

const ManageBooks = () => {
  const [queryParams, setQueryParams] = useState({
    searchTerm: "",
    page: 1,
    limit: 10,
  });

  const queryArray = Object.entries(queryParams)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    .filter(([_, value]) => value !== "")
    .map(([key, value]) => ({ name: key, value }));

  const { data, isLoading, error, refetch } =
    useGetAllProductsQuery(queryArray);
  const [offerBooks, { isLoading: isOffering }] = useOfferProductMutation();

  const books = data?.data || [];
  const totalBooks = data?.meta?.total || 0;
  const totalPages = data?.meta?.totalPage || 1;
  const { page, limit } = queryParams;

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setQueryParams({ ...queryParams, page: newPage });
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQueryParams({ ...queryParams, searchTerm: e.target.value, page: 1 });
  };

  const handleAddOffer = async (
    offerPercentage: number,
    selectedBookIds: string[]
  ) => {
    if (selectedBookIds.length === 0) return;
    try {
      await offerBooks({
        productIds: selectedBookIds,
        discount: offerPercentage,
      }).unwrap();
      toast.success("Offer applied successfully!");
      refetch();
    } catch (err) {
      console.error("Offer failed:", err);
      toast.error("Failed to apply offer. Please try again.");
    }
  };

  const [selectedBookIds, setSelectedBookIds] = useState<string[]>([]);
  const [isOfferModalOpen, setIsOfferModalOpen] = useState<boolean>(false);

  const handleSelectBook = (bookId: string, isChecked: boolean) => {
    setSelectedBookIds((prev) =>
      isChecked ? [...prev, bookId] : prev.filter((id) => id !== bookId)
    );
  };

  return (
    <div className="p-6">
      {error && (
        <div className="bg-red-100 text-red-700 p-3 mb-4 rounded-md">
          Error fetching books: {JSON.stringify(error)}
        </div>
      )}

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Manage Books</h1>
        <button
          onClick={() => setIsOfferModalOpen(true)}
          disabled={isOffering || selectedBookIds.length === 0}
          className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded hover:bg-gray-700 transition"
        >
          <FaPlusCircle />
          <span>Add Offer</span>
        </button>
      </div>

      <div className="relative mb-4">
        <BsSearch className="absolute left-3 top-2.5 text-gray-500" />
        <input
          type="text"
          placeholder="Search Books..."
          value={queryParams.searchTerm}
          onChange={handleSearchChange}
          className="border border-gray-300 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
        />
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md text-black">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse rounded-lg overflow-hidden min-w-[800px]">
            <thead className="bg-gray-200 text-gray-600 text-left">
              <tr>
                <th className="px-4 py-2">
                  <input
                    type="checkbox"
                    onChange={(e) => {
                      const isChecked = e.target.checked;
                      if (isChecked) {
                        setSelectedBookIds(
                          books.map((book: IProduct) => book.id)
                        );
                      } else {
                        setSelectedBookIds([]);
                      }
                    }}
                    checked={
                      books.length > 0 &&
                      selectedBookIds.length === books.length
                    }
                  />
                </th>
                <th className="px-4 py-2">Book Image</th>
                <th className="px-4 py-2">Book Name</th>
                <th className="px-4 py-2">Quantity</th>
                <th className="px-4 py-2">Category</th>
                <th className="px-4 py-2">Offer</th>
                <th className="px-4 py-2">Author</th>
                <th className="px-4 py-2 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {!isLoading && books.length > 0 ? (
                books.map((book: IProduct) => (
                  <tr
                    key={book.id}
                    className="border-t border-gray-200 hover:bg-gray-100"
                  >
                    <td className="px-4 py-3">
                      <input
                        type="checkbox"
                        onChange={(e) =>
                          handleSelectBook(book.id, e.target.checked)
                        }
                        checked={selectedBookIds.includes(book.id)}
                      />
                    </td>
                    <td className="px-4 py-3">
                      <img
                        src={book.productImg}
                        alt={book.title}
                        className="w-12 h-16 object-cover rounded"
                      />
                    </td>
                    <td className="px-4 py-3">{book.title}</td>
                    <td className="px-4 py-3">{book.quantity}</td>
                    <td className="px-4 py-3">{book.category}</td>
                    <td className="px-4 py-3">
                      {book.hasOffer ? `${book.offerRate}%` : "N/A"}
                    </td>
                    <td className="px-4 py-3">{book.author}</td>
                    <td className="px-4 py-3 text-right space-x-2">
                      <button className="inline-flex items-center gap-1 text-gray-500 cursor-pointer px-3 py-1 rounded hover:text-gray-900 transition">
                        <FaEdit />
                      </button>
                      <button className="inline-flex items-center gap-1 text-red-400 px-3 py-1 cursor-pointer rounded hover:text-red-700 transition">
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={8} className="text-center text-gray-500 py-4">
                    {isLoading ? "Loading books..." : "No books found"}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <Pagination
          currentPage={page}
          limit={limit}
          totalBooks={totalBooks}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>

      {isOfferModalOpen && (
        <Suspense fallback={null}>
          <LazyOfferModal
            onClose={() => setIsOfferModalOpen(false)}
            onSubmit={(discount) => {
              handleAddOffer(discount, selectedBookIds);
              setIsOfferModalOpen(false);
            }}
          />
        </Suspense>
      )}
    </div>
  );
};

export default ManageBooks;
