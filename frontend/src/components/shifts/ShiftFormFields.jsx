import { Field, ErrorMessage } from "formik";
import Select from "react-select";
import { useAuth } from "../../context/AuthContext";

export default function ShiftFormFields({ values, setFieldValue }) {
  const { employees } = useAuth();

  const options = Array.isArray(employees)
    ? employees.map((emp) => ({ value: emp._id, label: emp.name }))
    : [];

  return (
    <>
      <Field
        name="clientName"
        type="text"
        placeholder="Client Name"
        className="mt-1 w-full p-2 border rounded"
      />
      <ErrorMessage
        name="clientName"
        component="div"
        className="text-red-500 text-xs"
      />

      <Field
        name="siteAddress"
        as="textarea"
        rows="2"
        placeholder="Site Address"
        className="mt-1 w-full p-2 border rounded"
      />
      <ErrorMessage
        name="siteAddress"
        component="div"
        className="text-red-500 text-xs"
      />

      <Field
        name="nearestStation"
        type="text"
        placeholder="Nearest Station"
        className="mt-1 w-full p-2 border rounded"
      />

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

      <label className="block text-sm font-medium text-gray-700">
        Team Members
      </label>
      <Select
        isMulti
        options={options}
        name="teamMembers"
        className="mt-1"
        classNamePrefix="select"
        value={values.teamMembers}
        onChange={(selected) => setFieldValue("teamMembers", selected)}
      />

      <Field
        name="instructions"
        as="textarea"
        rows="2"
        placeholder="Instructions"
        className="mt-1 w-full p-2 border rounded"
      />
    </>
  );
}
