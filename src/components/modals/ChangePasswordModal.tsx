import { useEffect, useState } from "react";
import { useChangePasswordMutation } from "@/redux/features/auth/authApi";
import { useAppDispatch } from "@/redux/hooks";
import { logOut } from "@/redux/features/auth/authSlice";
import { useNavigate } from "react-router-dom";
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
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const {
    control,
    register,
    handleSubmit,
    getValues,
    reset,
    formState: { errors },
    watch,
  } = useForm<ChangePasswordFormData>();

  const [changePassword, { isLoading }] = useChangePasswordMutation();
  const [error, setError] = useState<string | null>(null);

  const oldPassword = watch("oldPassword");
  const newPassword = watch("newPassword");
  const confirmPassword = watch("confirmPassword");

  useEffect(() => {
    if (error) {
      setError(null);
    }
  }, [oldPassword, newPassword, confirmPassword, error]);

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

      toast.success("Password changed successfully! Logging out...", {
        duration: 2000,
      });

      reset();
      onClose();

      setTimeout(() => {
        dispatch(logOut());
        navigate("/signin");
      }, 2000);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.error("Error Changing Password:", err);

      let errorMessage = "Failed to change password.";
      if (err?.data?.message) {
        errorMessage = err.data.message;
      }

      setError(errorMessage);
      toast.error(errorMessage);
    }
  };

  return (
    <OnModal
      title="Change Password"
      onClose={onClose}
      buttonLabel={isLoading ? "Updating..." : "Update Password"}
      cancelLabel="Cancel"
      onCancel={onClose}
      onConfirm={handleSubmit(handlePasswordChange)}
    >
      {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
      <OnForm<ChangePasswordFormData>
        fields={[
          {
            label: "Old Password",
            type: "password",
            name: "oldPassword",
            placeholder: "Enter old password",
            validation: { required: "Old password is required" },
            error: errors.oldPassword?.message,
          },
          {
            label: "New Password",
            type: "password",
            name: "newPassword",
            placeholder: "Enter new password",
            validation: { required: "New password is required", minLength: 5 },
            error: errors.newPassword?.message,
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
            error: errors.confirmPassword?.message,
          },
        ]}
        control={control}
        register={register}
        handleSubmit={handleSubmit}
        onSubmit={handlePasswordChange}
      />
    </OnModal>
  );
};

export default ChangePasswordModal;
