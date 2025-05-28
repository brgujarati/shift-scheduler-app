import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Select from "react-select";
import { useAuth } from "../../context/AuthContext";

export default function EditShiftForm({ shift, onCancel, onSubmit }) {
  const { employees } = useAuth();
  const teamOptions = employees?.map((emp) => ({
    label: emp.name, // ✅ show name in dropdown
    value: emp._id, // ✅ store _id internally
  }));
  const selectedTeam =
    shift.team?.map((id) => {
      const match = teamOptions.find((opt) => opt.value === id);
      return match || { label: id, value: id }; // fallback to ID if name not found
    }) || [];

  const initialValues = {
    clientName: shift.clientName || "",
    siteAddress: shift.siteAddress || "",
    nearestStation: shift.nearestStation || "",
    date: shift.date?.substring(0, 10) || "",
    startTime: shift.startTime || "",
    endTime: shift.endTime || "",
    team: selectedTeam, // ✅ now it's label/value objects
    instruction: shift.instruction || "",
  };

  return (
    <div className="pt-0 px-6 pb-6 flex justify-start">
      <div className="max-w-2xl w-full bg-white shadow rounded-2xl p-6">
        <Formik
          initialValues={initialValues}
          enableReinitialize={true}
          validationSchema={Yup.object({
            clientName: Yup.string().required("Required"),
            siteAddress: Yup.string().required("Required"),
            date: Yup.string().required("Required"),
            startTime: Yup.string().required("Required"),
            endTime: Yup.string().required("Required"),
          })}
          onSubmit={(values) => {
            const formatted = {
              ...values,
              team: values.team.map((member) => member.value), // ✅ team is defined now
            };
            onSubmit(formatted);
          }}
        >
          {({ resetForm, setFieldValue, values }) => (
            <Form className="flex flex-col gap-2">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Client Name
                </label>
                <Field
                  name="clientName"
                  type="text"
                  className="mt-1 w-full p-2 border rounded"
                />
                <ErrorMessage
                  name="clientName"
                  component="div"
                  className="text-red-500 text-xs"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Site Address
                </label>
                <Field
                  name="siteAddress"
                  as="textarea"
                  rows="2"
                  className="mt-1 w-full p-2 border rounded"
                />
                <ErrorMessage
                  name="siteAddress"
                  component="div"
                  className="text-red-500 text-xs"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Nearest Station
                </label>
                <Field
                  name="nearestStation"
                  type="text"
                  className="mt-1 w-full p-2 border rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Date
                </label>
                <Field
                  name="date"
                  type="date"
                  className="mt-1 w-full p-2 border rounded"
                />
                <ErrorMessage
                  name="date"
                  component="div"
                  className="text-red-500 text-xs"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Start Time
                </label>
                <Field
                  name="startTime"
                  type="time"
                  className="mt-1 w-full p-2 border rounded"
                />
                <ErrorMessage
                  name="startTime"
                  component="div"
                  className="text-red-500 text-xs"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  End Time
                </label>
                <Field
                  name="endTime"
                  type="time"
                  className="mt-1 w-full p-2 border rounded"
                />
                <ErrorMessage
                  name="endTime"
                  component="div"
                  className="text-red-500 text-xs"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Team Members (select multiple)
                </label>
                <Select
                  isMulti
                  options={teamOptions}
                  name="team"
                  className="mt-1"
                  classNamePrefix="select"
                  value={values.team}
                  onChange={(selected) => setFieldValue("team", selected)}
                  styles={{
                    control: (base) => ({
                      ...base,
                      minHeight: "3rem",
                      borderColor: "#cbd5e0",
                      boxShadow: "none",
                      ":hover": { borderColor: "#a0aec0" },
                    }),
                    valueContainer: (base) => ({
                      ...base,
                      display: "flex",
                      flexWrap: "wrap",
                      maxHeight: "7.5rem", // enough for ~3 rows
                      overflowY: "auto",
                      alignItems: "flex-start",
                    }),
                    multiValue: (base) => ({
                      ...base,
                      minWidth: "30%",
                      maxWidth: "30%",
                      margin: "2px 5px",
                    }),
                  }}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Instructions
                </label>
                <Field
                  name="instructions"
                  as="textarea"
                  rows="2"
                  className="mt-1 w-full p-2 border rounded"
                />
              </div>
              <div className="flex gap-4 justify-end pt-4">
                <button
                  type="button"
                  onClick={onCancel}
                  className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
                >
                  Update Shift
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
