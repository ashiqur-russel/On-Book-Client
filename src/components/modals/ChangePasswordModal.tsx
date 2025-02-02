import { useState } from "react";
import { useChangePasswordMutation } from "@/redux/features/user/registerApi";
import OnModal from "../utils/OnModal";
import { toast } from "sonner";
import OnForm from "../utils/OnForm";
import { useForm } from "react-hook-form";

interface ChangePasswordFormData {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

interface ChangePasswordModalProps {
  onClose: () => void;
}

const ChangePasswordModal: React.FC<ChangePasswordModalProps> = ({
  onClose,
}) => {
  const { control, register, handleSubmit, getValues } =
    useForm<ChangePasswordFormData>();
  const [changePassword, { isLoading }] = useChangePasswordMutation();
  const [error, setError] = useState<string | null>(null);

  const handlePasswordChange = async (data: ChangePasswordFormData) => {
    setError(null);

    if (data.newPassword !== data.confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    try {
      await changePassword({
        oldPassword: data.oldPassword,
        newPassword: data.newPassword,
      }).unwrap();

      toast.success("Password changed successfully!");
      onClose();
    } catch (err: any) {
      setError(err.message || "Failed to change password.");
      toast.error(err.message || "Failed to change password.");
    }
  };

  return (
    <OnModal
      title="Change Password"
      onClose={onClose}
      buttonLabel="Update Password"
      cancelLabel="Cancel"
      onCancel={onClose}
    >
      <OnForm<ChangePasswordFormData>
        fields={[
          {
            label: "Old Password",
            type: "password",
            name: "oldPassword",
            placeholder: "Enter old password",
            validation: { required: "Old password is required" },
          },
          {
            label: "New Password",
            type: "password",
            name: "newPassword",
            placeholder: "Enter new password",
            validation: { required: "New password is required", minLength: 5 },
          },
          {
            label: "Confirm Password",
            type: "password",
            name: "confirmPassword",
            placeholder: "Confirm new password",
            validation: {
              required: "Confirm password is required",
              minLength: 5,
              validate: (value: string) =>
                value === getValues("newPassword") || "Passwords do not match",
            },
          },
        ]}
        control={control}
        register={register} // ✅ Pass register function
        handleSubmit={handleSubmit}
        onSubmit={handlePasswordChange}
      />
    </OnModal>
  );
};

export default ChangePasswordModal;
