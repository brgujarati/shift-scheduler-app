import * as Yup from "yup";
import { createShift } from "../../services/shiftService";
import { useAuth } from "../../context/AuthContext";

export const useAddShiftForm = (navigate) => {
  const { refreshAdminData } = useAuth(); // ✅ fixed

  return {
    initialValues: {
      clientName: "",
      siteAddress: "",
      nearestStation: "",
      date: "",
      startTime: "",
      endTime: "",
      teamMembers: [],
      instruction: "",
    },
    validationSchema: Yup.object({
      clientName: Yup.string().required("Required"),
      siteAddress: Yup.string().required("Required"),
      date: Yup.string().required("Required"),
      startTime: Yup.string().required("Required"),
      endTime: Yup.string().required("Required"),
    }),
    onSubmit: async (values, { resetForm }) => {
      const shiftData = {
        clientName: values.clientName,
        siteAddress: values.siteAddress,
        nearestStation: values.nearestStation,
        date: values.date,
        startTime: values.startTime,
        endTime: values.endTime,
        instruction: values.instruction,
        team: values.teamMembers.map((member) => member.value),
      };
      console.log("team", shiftData);
      try {
        const res = await createShift(shiftData);
        alert(`✅ Shift Created! ID: ${res.shiftId}`);
        await refreshAdminData(); // ✅ refresh shift + employee data
        resetForm();
        navigate("/admin/dashboard");
      } catch (err) {
        console.error("❌ Shift creation failed:", err.message);
        alert("❌ Failed to create shift. Please try again.");
      }
    },
  };
};
