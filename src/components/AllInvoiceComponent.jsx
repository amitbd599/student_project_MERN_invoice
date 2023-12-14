import React, { useState } from "react";

import DataTable from "react-data-table-component";
import {
  FaDownload,
  FaExpand,
  FaPenToSquare,
  FaPrint,
  FaTrashCan,
} from "react-icons/fa6";
import pdfScriptData from "../helper/pdf_script";
import { Link } from "react-router-dom";
const AllInvoiceComponent = () => {
  let [invoices, setInvoices] = useState(
    JSON.parse(localStorage.getItem("invoices") || [])
  );

  const deleteItem = (idToDelete) => {
    const updatedData = invoices.filter(
      (item) => item.invoiceID !== idToDelete
    );
    setInvoices(updatedData);

    localStorage.setItem("invoices", JSON.stringify(updatedData));
  };

  let getSetting = JSON.parse(localStorage.getItem("setting"));
  const downloadPdf = (idToView) => {
    let templateData = invoices.filter((item) => item.invoiceID === idToView);
    templateData = templateData[0];
    pdfScriptData.template({
      templateData,
      getSetting,
      save: true,
    });
  };

  let viewPdf = (idToView) => {
    let templateData = invoices.filter((item) => item.invoiceID === idToView);
    templateData = templateData[0];
    pdfScriptData.template({
      templateData,
      getSetting,
      view: true,
    });
  };

  let printPdf = (idToView) => {
    let templateData = invoices.filter((item) => item.invoiceID === idToView);
    templateData = templateData[0];
    pdfScriptData.template({
      templateData,
      getSetting,
      print: true,
    });
  };
  const columns = [
    {
      name: "Invoice ID",
      selector: (row) => row.invoiceID,
      width: "150px",
    },
    {
      name: "Customer Name",
      selector: (row) => row.customerName,
      sortable: true,
      wrap: true,
      width: "200px",
    },

    {
      name: "Date",
      sortable: true,
      selector: (row) => row.startDate.slice(0, 10),
      width: "100px",
    },
    {
      name: "Delivery Date",
      sortable: true,
      selector: (row) => row.deliveryDate.slice(0, 10),
      width: "120px",
    },
    {
      name: "Payment Method",
      selector: (row) => row.paymentMethod,
      width: "140px",
    },
    {
      name: "Payment Paid",
      selector: (row) => row.payment,
      width: "120px",
    },
    {
      name: "Due",
      selector: (row) => row.due,
      width: "100px",
    },

    {
      name: "Action",
      with: "500px",

      selector: (row) => (
        <div className="flex gap-4 ">
          <FaDownload
            className="p-1 cursor-pointer text-[25px]"
            onClick={() => downloadPdf(row.invoiceID)}
          />
          <Link to={`/update?id=${row.invoiceID}`}>
            <FaPenToSquare className="p-1 cursor-pointer text-[25px]" />
          </Link>

          <FaExpand
            className="p-1 cursor-pointer text-[25px]"
            onClick={() => viewPdf(row.invoiceID)}
          />
          <FaPrint
            className="p-1 cursor-pointer text-[25px]"
            onClick={() => printPdf(row.invoiceID)}
          />
          <FaTrashCan
            className="p-1 cursor-pointer text-[25px]"
            onClick={() => deleteItem(row.invoiceID)}
          />
        </div>
      ),
    },
  ];

  return (
    <section className="container mx-auto py-[80px]">
      <div className="bg-white shadow-lg p-[20px] rounded-lg">
        <div className="rounded-xl bg-white m-[30px]">
          <h2 className="text-slate-700 text-2xl font-semibold mb-2">
            All Invoice file
          </h2>
          <DataTable
            fixedHeader
            fixedHeaderScrollHeight="600px"
            columns={columns}
            data={invoices}
            pagination
          />
        </div>
      </div>
    </section>
  );
};

export default AllInvoiceComponent;
