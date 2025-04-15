import CircularProgress from "@mui/material/CircularProgress";

export const Loader = () => (
  <div className="root_loader">
    <CircularProgress />
  </div>
);

export const AdminTitle = ({ title }: { title: string }) => (
  <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3 border-bottom">
    <h1 className="h2">{title}</h1>
  </div>
);
