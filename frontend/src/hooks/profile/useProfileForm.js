// useProfileForm.js
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import {
  updateUserProfile,
  updateUserProfilePhoto,
} from "../../services/userService";

export const useProfileForm = () => {
  const [showReview, setShowReview] = useState(true);
  const [loading, setLoading] = useState(false);
  const { user, refreshUser } = useAuth();

  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    id: user?.userCode || "",
    role: user?.role || "",
    phone: user?.phone || "",
    address1: user?.address1 || "",
    address2: user?.address2 || "",
    county: user?.county || "",
    country: user?.country || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleProfilePicChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      alert("❌ Max 5MB file allowed.");
      return;
    }
    setLoading(true);
    try {
      await updateUserProfilePhoto(file);
      await refreshUser();
    } catch (err) {
      alert("❌ Upload failed.");
    } finally {
      setLoading(false);
    }
  };

  const handleConfirm = async () => {
    const allowed = ["phone", "address1", "address2", "county", "country"];
    const filtered = Object.fromEntries(
      Object.entries(formData).filter(([key]) => allowed.includes(key))
    );
    try {
      await updateUserProfile(filtered);
      alert("✅ Profile updated!");
      setShowReview(true);
    } catch {
      alert("❌ Failed to update profile.");
    }
  };
  return {
    showReview,
    loading,
    user,
    formData,
    handlers: {
      setShowReview,
      handleChange,
      handleConfirm,
      handleProfilePicChange,
    },
  };
};
