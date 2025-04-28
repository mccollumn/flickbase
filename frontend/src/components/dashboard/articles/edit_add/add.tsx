import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useFormik, FieldArray, FormikProvider } from "formik";
import WYSIWYG from "../../../../utils/forms/tiptap";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import InputLabel from "@mui/material/InputLabel";
import AddIcon from "@mui/icons-material/Add";
import { formValues, validation } from "./validationSchema";
import { AppDispatch, RootState } from "../../../../store";
import { AdminTitle, Loader } from "../../../../utils/components";
import { errorHelper } from "../../../../utils/tools";
import { getCategories } from "../../../../store/actions/articles";

const AddArticle = () => {
  const articles = useSelector((state: RootState) => state.articles) as {
    categories: { _id: string; name: string }[];
    loading: boolean;
  };
  const dispatch = useDispatch<AppDispatch>();
  const actorsValue = React.useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: formValues,
    validationSchema: validation,
    onSubmit: (values) => {
      console.log("values", values);
    },
  });

  const handleEditorState = (editorState: unknown) => {
    formik.setFieldValue("content", editorState, true);
  };

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  return (
    <>
      <AdminTitle title="Add Article" />
      <form className="mt-3 article_form" onSubmit={formik.handleSubmit}>
        <div className="form-group">
          <TextField
            style={{ width: "100%" }}
            label="Enter a Title"
            variant="outlined"
            {...formik.getFieldProps("title")}
            {...errorHelper(formik, "title")}
          />
        </div>
        <div className="form-group">
          <WYSIWYG
            setEditorState={(state: unknown) => handleEditorState(state)}
          />
        </div>
        <div className="form-group">
          <TextField
            style={{ width: "100%" }}
            label="Enter a Short Description"
            variant="outlined"
            multiline
            rows={4}
            {...formik.getFieldProps("excerpt")}
            {...errorHelper(formik, "excerpt")}
          />
        </div>
        <Divider className="mt-3 mb-3" />
        <div className="form-group">
          <TextField
            style={{ width: "100%" }}
            label="Enter a Score"
            variant="outlined"
            type="number"
            {...formik.getFieldProps("score")}
            {...errorHelper(formik, "score")}
          />
        </div>
        <div className="form-group">
          <FormikProvider value={formik}>
            <FieldArray
              name="actors"
              render={(arrayHelpers) => (
                <div>
                  <Paper className="actors_form">
                    <InputBase
                      className="input"
                      inputRef={actorsValue}
                      placeholder="Add an Actor"
                    />
                    <IconButton
                      onClick={() => {
                        if (
                          actorsValue.current &&
                          actorsValue.current?.value !== ""
                        ) {
                          arrayHelpers.push(actorsValue.current?.value);
                          actorsValue.current.value = "";
                        }
                      }}
                    >
                      <AddIcon />
                    </IconButton>
                  </Paper>

                  {formik.errors.actors && formik.touched.actors ? (
                    <FormHelperText error>
                      {formik.errors.actors}
                    </FormHelperText>
                  ) : null}

                  <div className="chip_container">
                    {formik.values.actors.map((actor, index) => (
                      <Chip
                        key={index}
                        label={actor}
                        color="primary"
                        onDelete={() => arrayHelpers.remove(index)}
                      />
                    ))}
                  </div>
                </div>
              )}
            />
          </FormikProvider>
        </div>
        <div className="form-group">
          <TextField
            style={{ width: "100%" }}
            label="Enter a Director"
            variant="outlined"
            multiline
            rows={4}
            {...formik.getFieldProps("director")}
            {...errorHelper(formik, "director")}
          />
        </div>
        <Divider className="mt-3 mb-3" />
        <FormControl fullWidth>
          <InputLabel>Select a Status</InputLabel>
          <Select
            label="Select a Status"
            {...formik.getFieldProps("status")}
            error={formik.errors.status && formik.touched.status ? true : false}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value="draft">
              <em>Draft</em>
            </MenuItem>
            <MenuItem value="published">
              <em>Published</em>
            </MenuItem>
          </Select>
          {formik.errors.status && formik.touched.status ? (
            <FormHelperText error>{formik.errors.status}</FormHelperText>
          ) : null}
        </FormControl>
        <Divider className="mt-3 mb-3" />
        <>
          <FormControl fullWidth>
            <InputLabel>Select a Category</InputLabel>
            <Select
              label="Select a Category"
              {...formik.getFieldProps("category")}
              error={
                formik.errors.category && formik.touched.category ? true : false
              }
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {articles.categories
                ? articles.categories.map((category) => (
                    <MenuItem key={category._id} value={category._id}>
                      {category.name}
                    </MenuItem>
                  ))
                : null}
            </Select>
            {formik.errors.category && formik.touched.category ? (
              <FormHelperText error>{formik.errors.category}</FormHelperText>
            ) : null}
          </FormControl>
        </>
        <Divider className="mt-3 mb-3" />
        {articles.loading ? (
          <Loader />
        ) : (
          <Button variant="contained" color="primary" type="submit">
            <span>Add article</span>
          </Button>
        )}
      </form>
    </>
  );
};

export default AddArticle;
