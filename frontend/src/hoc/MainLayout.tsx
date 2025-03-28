import { ReactNode } from "react";
import { Container } from "react-bootstrap";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout = (props: MainLayoutProps) => {
  return (
    <Container className="app_container mb-5">
      {props.children}
      <ToastContainer />
    </Container>
  );
};

export default MainLayout;
