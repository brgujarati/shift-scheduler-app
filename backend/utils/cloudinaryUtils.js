// utils/cloudinaryUtils.js

function extractPublicId(imageUrl) {
  try {
    const urlParts = new URL(imageUrl).pathname.split("/");
    const fileName = urlParts.pop(); // user_1234567890.jpg
    const folder = urlParts.pop(); // shift-scheduler-profile-pics
    const publicId = fileName.split(".")[0];
    return `${folder}/${publicId}`; // e.g., shift-scheduler-profile-pics/user_123_1695468123456
  } catch (err) {
    console.warn("⚠️ Failed to extract public_id:", err.message);
    return null;
  }
}

module.exports = { extractPublicId };
