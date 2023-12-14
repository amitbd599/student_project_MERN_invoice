import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./page/Home";
import Setting from "./page/Setting";
import AllInvoice from "./page/AllInvoice";
import { Toaster } from "react-hot-toast";
import Update from "./page/Update";
import InitLoadData from "./helper/InitLoadData";

function App() {
  return (
    <>
      <BrowserRouter>
        <InitLoadData />
        <Toaster position="bottom-center" reverseOrder={false} />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/all-invoice" element={<AllInvoice />} />
          <Route exact path="/setting" element={<Setting />} />
          <Route exact path="/update" element={<Update />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
