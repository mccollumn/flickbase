import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useFormik, FieldArray, FormikProvider } from "formik";
import { formValues, validation } from "./validationSchema";
import { RootState } from "../../../../store";
import { AdminTitle } from "../../../../utils/components";

const AddArticle = () => {
  const articles = useSelector((state: RootState) => state.articles);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: formValues,
    validationSchema: validation,
    onSubmit: (values) => {
      console.log("values", values);
    },
  });

  return (
    <>
      <AdminTitle title="Add Article" />
      Add article
    </>
  );
};

export default AddArticle;
