import userClient from "../api/userClient";

export const getAllEmployees = async () => {
  const response = await userClient.get("/employees");
  return response.data;
};

export const getUserProfile = async () => {
  const response = await userClient.get("/profile");
  return response.data;
};

export const updateUserProfile = async (updatedProfile) => {
  const response = await userClient.put("/profile", updatedProfile);
  return response.data;
};

export const updateUserProfilePhoto = async (file) => {
  const formData = new FormData();
  formData.append("profilePic", file);

  const response = await userClient.post("/profile/photo", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};
