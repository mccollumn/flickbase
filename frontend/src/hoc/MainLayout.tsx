import { ReactNode } from "react";
import { Container } from "react-bootstrap";
import { useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout = (props: MainLayoutProps) => {
  interface RootState {
    site: {
      layout: string;
    };
  }

  const site = useSelector((state: RootState) => state.site);

  return (
    <Container className={`app_container mb-5 ${site.layout}`}>
      {props.children}
      <ToastContainer />
    </Container>
  );
};

export default MainLayout;
