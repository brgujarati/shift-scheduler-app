import { Formik, Form } from "formik";
import { useNavigate } from "react-router-dom";
import { useAddShiftForm } from "../../hooks/shifts/useAddShiftForm";
import ShiftFormFields from "./ShiftFormFields";

export default function AddShiftForm() {
  const navigate = useNavigate();
  const { initialValues, validationSchema, onSubmit } =
    useAddShiftForm(navigate);

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ resetForm, setFieldValue, values }) => (
        <Form className="flex flex-col gap-2">
          <ShiftFormFields values={values} setFieldValue={setFieldValue} />
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
              onClick={resetForm}
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
  );
}
