import { Routes, Route, BrowserRouter } from "react-router-dom";
import Home from "./components/home";
import Header from "./components/navigation/Header";

const Router = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
