import React from "react";

import DataTable from "react-data-table-component";
import { FaTrashCan } from "react-icons/fa6";
const AllInvoiceComponent = () => {
  let getInvoices = JSON.parse(localStorage.getItem("invoices"));
  const columns = [
    {
      name: "Invoice ID",
      selector: (row) => row.invoiceID,
    },
    {
      name: "Customer Name",
      selector: (row) => row.customerName,
    },

    {
      name: "Date",
      selector: (row) => row.startDate,
    },
    {
      name: "Payment Method",
      selector: (row) => row.paymentMethod,
    },
    {
      name: "Due",
      selector: (row) => row.due,
    },
    {
      name: "Payment",
      selector: (row) => row.payment,
    },
    {
      name: "Writer",
      selector: (row) => row.invoiceWriter,
    },
    {
      name: "Action",
      selector: (row) => (
        <div className="p-2 cursor-pointer	">
          <FaTrashCan />
        </div>
      ),
    },
  ];

  return (
    <section className="container mx-auto py-[80px]">
      <div className="bg-white shadow-lg p-[20px] rounded-lg">
        <div className="rounded-xl bg-white p-[30px] m-[30px]">
          <h2 className="text-slate-700 text-2xl font-semibold mb-2">
            All Message
          </h2>
          <DataTable
            fixedHeader
            fixedHeaderScrollHeight="600px"
            columns={columns}
            data={getInvoices}
            pagination
          />
        </div>
      </div>
    </section>
  );
};

export default AllInvoiceComponent;
