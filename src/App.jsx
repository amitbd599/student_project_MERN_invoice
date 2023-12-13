import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./page/Home";
import Setting from "./page/Setting";
import AllInvoice from "./page/AllInvoice";
import { Toaster } from "react-hot-toast";
import { useEffect } from "react";
import Update from "./page/Update";

function App() {
  useEffect(() => {
    let getSetting = JSON.parse(localStorage.getItem("setting"));
    let getInvoices = JSON.parse(localStorage.getItem("invoices"));
    if (getSetting === null && getInvoices === null) {
      localStorage.setItem("setting", JSON.stringify([]));
      localStorage.setItem("invoices", JSON.stringify([]));
    }
  }, []);

  return (
    <>
      <BrowserRouter>
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
