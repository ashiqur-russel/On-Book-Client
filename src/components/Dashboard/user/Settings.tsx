import { useState } from "react";
import OnModal from "@/components/utils/OnModal";
import ChangePasswordModal from "@/components/modals/ChangePasswordModal";

const UserSettings = () => {
  const [isPasswordModalOpen, setPasswordModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);

  return (
    <div className="w-full max-w-2xl mx-auto p-6 rounded-lg">
      <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center">
        User Settings
      </h1>

      <div className="mt-6 p-4 border rounded-lg shadow-sm">
        <h2 className="text-xl font-semibold">Security</h2>
        <button
          onClick={() => setPasswordModalOpen(true)}
          className="mt-3 bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 transition"
        >
          Change Password
        </button>
      </div>

      <div className="mt-6 p-4 border rounded-lg shadow-sm">
        <h2 className="text-xl font-semibold">Notifications</h2>
        <div className="flex items-center justify-between mt-2">
          <span>Email Notifications</span>
          <input type="checkbox" className="h-5 w-5" />
        </div>
        <div className="flex items-center justify-between mt-2">
          <span>SMS Notifications</span>
          <input type="checkbox" className="h-5 w-5" />
        </div>
      </div>

      <div className="mt-6 p-4 border rounded-lg shadow-sm">
        <h2 className="text-xl font-semibold text-red-600">Danger Zone</h2>
        <button
          onClick={() => setDeleteModalOpen(true)}
          className="mt-3 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-700 transition"
        >
          Delete Account
        </button>
      </div>

      {isPasswordModalOpen && (
        <ChangePasswordModal onClose={() => setPasswordModalOpen(false)} />
      )}

      {/* Delete Account Modal */}
      {isDeleteModalOpen && (
        <OnModal
          title="Delete Account"
          onClose={() => setDeleteModalOpen(false)}
          buttonLabel="Confirm Delete"
          onConfirm={() => console.log("Account Deleted")}
        >
          <p className="text-gray-700 text-sm">
            Are you sure you want to delete your account? This action is
            irreversible.
          </p>
        </OnModal>
      )}
    </div>
  );
};

export default UserSettings;
