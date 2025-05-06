import * as Yup from "yup";

export interface FormValueProps {
  title: string;
  content: string;
  excerpt: string;
  score: string;
  director: string;
  actors: string[];
  status: string;
  category: string;
}

export const formValues = {
  title: "",
  content: "",
  excerpt: "",
  score: "",
  director: "",
  actors: [],
  status: "draft",
  category: "",
};

export const validation = () =>
  Yup.object({
    title: Yup.string().required("Title is required"),
    content: Yup.string()
      .required("Content is required")
      .min(50, "Content must be at least 50 characters"),
    excerpt: Yup.string()
      .required("Excerpt is required")
      .max(500, "Excerpt must be at most 500 characters"),
    score: Yup.number()
      .required("Score is required")
      .min(0, "Score must be at least 0")
      .max(100, "Score must be at most 100"),
    director: Yup.string().required("Director is required"),
    actors: Yup.array()
      .required("At least three actor is required")
      .min(3, "At least 3 actors are required"),
    status: Yup.string().required("Status is required"),
    category: Yup.string().required("Category is required"),
  });
