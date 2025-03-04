// Custom React Hook: useUpdateUserProfile.js

import { useEffect, useState } from "react";
import axios from "axios";
import useChatContext from "./useChatContext";

const useUpdateUserProfile = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const { setFetchAgain } = useChatContext();

  const updateUserDetails = async (userDetails) => {
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      console.log(
        "=== userDetails useUpdateUserProfile.js [21] ===",
        userDetails
      );
      const response = await axios.post(
        "/api/v1/users/update-profile",
        userDetails
      );
      setSuccess(response.data.message);

      localStorage.setItem("user", JSON.stringify(response.data.data));
      setFetchAgain((prev) => !prev);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  const updateUserAvatar = async (formData) => {
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      const response = await axios.post(
        "/api/v1/users/change-avatar",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setSuccess(response.data.message);
      // console.log('=== response useUpdateUserProfile.js [52] ===', response);
      response &&
        localStorage.setItem("user", JSON.stringify(response.data.user));
      setFetchAgain((prev) => !prev);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update avatar");
    } finally {
      setLoading(false);
    }
  };

  const updateUserBanner = async (formData) => {
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      const response = await axios.post(
        "/api/v1/users/change-banner",
        formData
      );
      setSuccess(response.data.message);
      response &&
        localStorage.setItem("user", JSON.stringify(response.data.data));
      setFetchAgain((prev) => !prev);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update banner");
    } finally {
      setLoading(false);
    }
  };

  const changePassword = async (passwords) => {
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      const response = await axios.post(
        "/api/v1/users/change-password",
        passwords
      );
      setSuccess(response.data.message);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to change password");
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    success,
    updateUserDetails,
    updateUserAvatar,
    updateUserBanner,
    changePassword,
  };
};

export default useUpdateUserProfile;
