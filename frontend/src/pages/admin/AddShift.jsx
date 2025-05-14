// src/pages/AddShiftForm.jsx
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import Select from "react-select";

const teamMemberOptions = [
  { value: "Jimil Goswami", label: "Jimil Goswami" },
  { value: "Virendra Chavda", label: "Virendra Chavda" },
  { value: "Abdulkarim Qureshi", label: "Abdulkarim Qureshi" },
  { value: "Brijesh Gujarati", label: "Brijesh Gujarati" },
  { value: "Meet Gadhesariya", label: "Meet Gadhesariya" },
  { value: "Muhammed Saleh", label: "Muhammed Saleh" },
  { value: "Nina Patel", label: "Nina Patel" },
  { value: "Emily Tran", label: "Emily Tran" },
  { value: "Ravi Desai", label: "Ravi Desai" },
  { value: "Ayesha Khan", label: "Ayesha Khan" },
];

export default function AddShiftForm() {
  const navigate = useNavigate();

  return (
    <div className="pt-0 px-6 pb-6 flex justify-start">
      <div className="max-w-2xl w-full bg-white shadow rounded-2xl p-6">
        <Formik
          initialValues={{
            clientName: "",
            siteAddress: "",
            nearestStation: "",
            date: "",
            startTime: "",
            endTime: "",
            teamMembers: [],
            instructions: "",
          }}
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
              teamMembers: values.teamMembers.map((member) => member.value),
            };
            alert("Shift Added:\n" + JSON.stringify(formatted, null, 2));
            navigate("/admin/dashboard");
          }}
        >
          {({ resetForm, setFieldValue, values }) => (
            <Form className="flex flex-col gap-2">
              {/* Client Name */}
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

              {/* Site Address */}
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

              {/* Nearest Station */}
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

              {/* Date */}
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

              {/* Start Time */}
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

              {/* End Time */}
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

              {/* Team Members - react-select */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Team Members (select multiple)
                </label>
                <Select
                  isMulti
                  options={teamMemberOptions}
                  name="teamMembers"
                  className="mt-1"
                  classNamePrefix="select"
                  value={values.teamMembers}
                  onChange={(selected) =>
                    setFieldValue("teamMembers", selected)
                  }
                />
              </div>

              {/* Instructions */}
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

              {/* Buttons */}
              <div className="flex gap-4 justify-end pt-4">
                <button
                  type="button"
                  onClick={() => navigate("/admin/dashboard")}
                  className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  type="reset"
                  onClick={() => resetForm()}
                  className="bg-yellow-100 text-gray-800 px-4 py-2 rounded hover:bg-yellow-200"
                >
                  Clear
                </button>
                <button
                  type="submit"
                  className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
                >
                  Add Shift
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
