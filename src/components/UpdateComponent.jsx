import React, { useEffect, useState } from "react";
import {
  FaRegFilePdf,
  FaPrint,
  FaRegTrashCan,
  FaDownload,
} from "react-icons/fa6";
import DatePicker from "react-datepicker";
import {
  ErrorToast,
  IsEmpty,
  SuccessToast,
  fixNumber,
  toNumber,
} from "../helper/helper.js";
import { Option, Select, Tooltip } from "@material-tailwind/react";
import pdfScriptData from "../helper/pdf_script.js";
import { useLocation } from "react-router-dom";

const UpdateComponent = () => {
  const location = useLocation();
  let getSetting = JSON.parse(localStorage.getItem("setting"));
  let getInvoices = JSON.parse(localStorage.getItem("invoices"));
  const [startDate, setStartDate] = useState(new Date());
  const [deliveryDate, setDeliveryDate] = useState(new Date());
  const [invoiceID, setInvoiceID] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [address, setAddress] = useState("");
  const [invoiceWriter, setInvoiceWriter] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [note, setNote] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [accountName, setAccountName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [branchName, setBranchName] = useState("");
  const [invoiceItems, setInvoiceItems] = useState([]);
  const [payment, setPayment] = useState(0);
  const [tax, setTax] = useState(0);
  const [discount, setDiscount] = useState(getSetting?.discount || 0);
  const [shipping, setShipping] = useState(getSetting?.shipping || 0);

  useEffect(() => {
    // Parse the query parameters from the location object
    const searchParams = new URLSearchParams(location.search);
    const id = searchParams.get("id");
    let filterData = getInvoices.filter((item) => item.invoiceID === id);
    filterData = filterData[0];
    // Set update data
    setStartDate(filterData?.startDate);
    setDeliveryDate(filterData?.deliveryDate);
    setInvoiceID(filterData?.invoiceID);
    setCustomerName(filterData?.customerName);
    setAddress(filterData?.address);
    setInvoiceWriter(filterData?.invoiceWriter);
    setPhone(filterData?.phone);
    setEmail(filterData?.email);
    setNote(filterData?.note);
    setPaymentMethod(filterData?.paymentMethod);
    setAccountName(filterData?.accountName);
    setAccountNumber(filterData?.accountNumber);
    setBranchName(filterData?.branchName);
    setInvoiceItems(filterData?.invoiceItems);
    setPayment(filterData?.payment);
    setTax(filterData?.tax);
    setDiscount(filterData?.discount);
    setShipping(filterData?.shipping);
  }, [location.search]);

  const handleAddItem = () => {
    setInvoiceItems([
      ...invoiceItems,
      { item: "", quantity: 0, rate: 0, amount: 0 },
    ]);
  };

  const handleDeleteItem = (index) => {
    const updatedItems = [...invoiceItems];
    updatedItems.splice(index, 1);
    setInvoiceItems(updatedItems);
  };

  const handleItemChange = (index, field, value) => {
    const updatedItems = [...invoiceItems];
    updatedItems[index][field] = value;
    setInvoiceItems(updatedItems);
  };

  const calculateSubtotal = () => {
    return invoiceItems.reduce(
      (total, item) => total + item.quantity * item.rate,
      0
    );
  };

  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    let taxCal = parseInt((subtotal * tax) / 100);
    return subtotal + taxCal + shipping - discount;
  };
  const calculateDue = () => {
    const total = calculateTotal();
    return total - payment;
  };

  let selectedTemplate = fixNumber(toNumber(getSetting?.selectedTemplate));

  let subTotal = calculateSubtotal();
  let total = calculateTotal();
  let due = calculateDue();

  let templateData = {
    invoiceID,
    customerName,
    phone,
    email,
    address,
    invoiceWriter,
    invoiceItems,
    subTotal,
    total,
    due,
    payment,
    discount,
    shipping,
    startDate,
    deliveryDate,
    note,
    tax,
    selectedTemplate,
    paymentMethod,
    accountName,
    accountNumber,
    branchName,
  };

  const saveInvoice = (id) => {
    if (IsEmpty(invoiceID)) {
      ErrorToast("Invoice is empty");
    } else if (IsEmpty(customerName)) {
      ErrorToast("Customer Name is empty");
    } else if (IsEmpty(address)) {
      ErrorToast("Address is empty");
    } else if (IsEmpty(invoiceWriter)) {
      ErrorToast("Invoice Writer is empty");
    } else {
      let data = {
        invoiceID,
        customerName,
        phone,
        email,
        address,
        invoiceWriter,
        invoiceItems,
        subTotal,
        total,
        due,
        payment,
        discount,
        shipping,
        startDate,
        deliveryDate,
        note,
        tax,
        selectedTemplate,
        paymentMethod,
        accountName,
        accountNumber,
        branchName,
      };
      const prevValue = getInvoices.filter((item) => item.invoiceID !== id);
      localStorage.setItem("invoices", JSON.stringify([...prevValue, data]));
      SuccessToast("Update success!");
    }
  };

  let downloadPdf = async () => {
    pdfScriptData.template({
      templateData,
      getSetting,
      save: true,
    });

    saveInvoice();
  };
  let viewPdf = async () => {
    pdfScriptData.template({
      templateData,
      getSetting,
      view: true,
    });
  };

  let printPdf = async () => {
    pdfScriptData.template({
      templateData,
      getSetting,
      print: true,
    });

    saveInvoice();
  };

  return (
    <>
      <section className="container mx-auto py-[80px]">
        <div>
          <div className="grid grid-cols-12 gap-[20px]">
            <div className="col-span-9 bg-white shadow-lg rounded-md p-[26px]">
              <h2 className="pb-4 text-[20px] text-gray-900 font-semibold">
                Update Invoice:
              </h2>
              <div className="grid gap-[20px]">
                <div className="grid grid-cols-12 gap-[20px]">
                  <div className="col-span-4">
                    <div className="grid gap-1">
                      <label htmlFor="invoice">Invoice no:</label>

                      <input
                        defaultValue={invoiceID}
                        type="text"
                        className="input_box"
                        disabled
                      />
                    </div>
                  </div>
                  <div className="col-span-2">
                    <div className="grid gap-1">
                      <label htmlFor="invoice_date">Invoice date:</label>

                      <span className="input_box">
                        <DatePicker
                          selected={new Date(startDate)}
                          onChange={(date) => setStartDate(date)}
                          className="focus-visible:outline-none w-full block bg-transparent text-gray-800"
                        />
                      </span>
                    </div>
                  </div>
                  <div className="col-span-2">
                    <div className="grid gap-1">
                      <label htmlFor="delivery_date">Delivery date:</label>
                      <span className="input_box">
                        <DatePicker
                          selected={new Date(deliveryDate)}
                          onChange={(date) => setDeliveryDate(date)}
                          className="focus-visible:outline-none w-full block bg-transparent text-gray-800"
                        />
                      </span>
                    </div>
                  </div>

                  <div className="col-span-4">
                    <div className="grid gap-1">
                      <label htmlFor="invoice">Invoice writer name:</label>
                      <input
                        defaultValue={invoiceWriter}
                        onChange={(e) => setInvoiceWriter(e.target.value)}
                        type="text"
                        className="input_box"
                      />
                    </div>
                  </div>
                  <div className="col-span-3">
                    <div className="grid gap-1">
                      <label htmlFor="invoice">Customer name:</label>
                      <input
                        defaultValue={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        type="text"
                        className="input_box"
                      />
                    </div>
                  </div>
                  <div className="col-span-3">
                    <div className="grid gap-1">
                      <label htmlFor="invoice">Customer Address:</label>
                      <input
                        defaultValue={address}
                        onChange={(e) => setAddress(e.target.value)}
                        type="text"
                        className="input_box"
                      />
                    </div>
                  </div>
                  <div className="col-span-3">
                    <div className="grid gap-1">
                      <label htmlFor="invoice">Customer Phone no:</label>
                      <input
                        defaultValue={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        type="text"
                        className="input_box"
                      />
                    </div>
                  </div>
                  <div className="col-span-3">
                    <div className="grid gap-1">
                      <label htmlFor="invoice">Customer email:</label>
                      <input
                        defaultValue={email}
                        onChange={(e) => setEmail(e.target.value)}
                        type="text"
                        className="input_box"
                      />
                    </div>
                  </div>
                  <div className="col-span-3">
                    <div className="grid gap-1">
                      <label>Payment method:</label>
                      <div>
                        <Select
                          onChange={(event) => setPaymentMethod(event)}
                          value={paymentMethod}
                          label="Select item"
                          color="light-blue"
                          className="text-gray-800"
                          animate={{
                            mount: { y: 0 },
                            unmount: { y: 25 },
                          }}
                        >
                          <Option value="Bank">Bank</Option>
                          <Option value="Cash">Cash</Option>
                        </Select>
                      </div>
                    </div>
                  </div>
                  {paymentMethod === "Bank" && (
                    <div className="col-span-3">
                      <div className="grid gap-1">
                        <label htmlFor="invoice">Account Name:</label>
                        <input
                          defaultValue={accountName}
                          onChange={(e) => setAccountName(e.target.value)}
                          type="text"
                          className="input_box"
                        />
                      </div>
                    </div>
                  )}
                  {paymentMethod === "Bank" && (
                    <div className="col-span-3">
                      <div className="grid gap-1">
                        <label htmlFor="invoice">Account number:</label>
                        <input
                          defaultValue={accountNumber}
                          onChange={(e) => setAccountNumber(e.target.value)}
                          type="text"
                          className="input_box"
                        />
                      </div>
                    </div>
                  )}
                  {paymentMethod === "Bank" && (
                    <div className="col-span-3">
                      <div className="grid gap-1">
                        <label htmlFor="invoice">Branch name:</label>
                        <input
                          defaultValue={branchName}
                          onChange={(e) => setBranchName(e.target.value)}
                          type="text"
                          className="input_box"
                        />
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex gap-[20px]">
                  <div className="w-full">
                    {/* Table */}
                    <div className="w-full  mx-auto bg-transparent  rounded-sm border border-gray-50">
                      <div className="px-5 py-4 border-b border-gray-50 bg-white">
                        <h3 className="font-semibold text-gray-900">
                          Item table
                        </h3>
                      </div>
                      <div className="p-3">
                        <div className="overflow-x-auto">
                          <table className=" w-full">
                            <thead className="text-xs font-semibold uppercase rounded-md text-gray-700 bg-gray-100">
                              <tr>
                                <th className="p-2 ">
                                  <div className="font-semibold text-left">
                                    Item
                                  </div>
                                </th>
                                <th className="p-2 ">
                                  <div className="font-semibold text-center">
                                    Quantity
                                  </div>
                                </th>
                                <th className="p-2 ">
                                  <div className="font-semibold text-center">
                                    Rate ({getSetting?.currency})
                                  </div>
                                </th>
                                <th className="p-2 ">
                                  <div className="font-semibold text-center">
                                    Amount
                                  </div>
                                </th>
                                <th className="p-2 ">
                                  <div className="font-semibold text-center">
                                    Action
                                  </div>
                                </th>
                              </tr>
                            </thead>
                            <div className="p-1"></div>
                            <tbody className="text-sm  ">
                              {invoiceItems.map((item, index) => (
                                <tr key={index}>
                                  <td className="py-2 pr-2">
                                    <input
                                      type="text"
                                      value={item.item}
                                      placeholder="Item"
                                      onChange={(e) =>
                                        handleItemChange(
                                          index,
                                          "item",
                                          e.target.value
                                        )
                                      }
                                      className="input_box "
                                    />
                                  </td>
                                  <td className="py-2 pr-2 w-[100px]">
                                    <input
                                      type="number"
                                      value={item.quantity}
                                      placeholder="Quantity"
                                      onChange={(e) =>
                                        handleItemChange(
                                          index,
                                          "quantity",
                                          fixNumber(toNumber(e.target.value))
                                        )
                                      }
                                      className="input_box w-full text-center"
                                    />
                                  </td>
                                  <td className="py-2 pr-2 w-[100px] ">
                                    <input
                                      type="number"
                                      value={item.rate}
                                      placeholder="Rate"
                                      onChange={(e) => {
                                        handleItemChange(
                                          index,
                                          "rate",
                                          fixNumber(toNumber(e.target.value))
                                        );
                                        handleItemChange(
                                          index,
                                          "amount",
                                          fixNumber(
                                            toNumber(item.quantity * item.rate)
                                          )
                                        );
                                      }}
                                      className="input_box w-full text-center"
                                    />
                                  </td>
                                  <td className="py-2 pr-2 w-[100px] text-center">
                                    <span>{item.quantity * item.rate}</span>
                                  </td>
                                  <td className="py-2 pr-2 w-[100px]">
                                    <button className="flex justify-center w-full">
                                      <FaRegTrashCan
                                        className="text-red-600 text-[18px]"
                                        onClick={() => handleDeleteItem(index)}
                                      />
                                    </button>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                        <div className="mt-2">
                          <button
                            className="px-[20px] py-[8px] rounded-md bg-[#55E6A5] text-gray-900  hover:bg-[#4cd497]  transition-all duration-300"
                            onClick={handleAddItem}
                          >
                            Add item
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex gap-[20px]">
                  <div className="grid grid-cols-12 gap-[30px] w-full">
                    <div className="col-span-12 w-full">
                      <div className="grid gap-1">
                        <label htmlFor="invoice">Note:</label>
                        <textarea
                          defaultValue={note}
                          onChange={(e) => setNote(e.target.value)}
                          name=""
                          id=""
                          cols="30"
                          rows="6"
                          className="input_box"
                        ></textarea>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-span-3  ">
              <div className="bg-white rounded-md shadow-lg py-[40px] px-[20px]">
                <h2 className="font-semibold border-b border-gray-200 pb-2">
                  Calculation flow:
                </h2>
                {subTotal >= 1 ? (
                  <div className="mt-[20px] grid gap-[16px]">
                    <p className="flex justify-between">
                      Subtotal:{" "}
                      <span className="pl-3">{calculateSubtotal()}</span>
                    </p>
                    {getSetting?.tax !== 0 && (
                      <p className="flex justify-between">
                        Tax: <span className="pl-3">+ {getSetting?.tax}%</span>
                      </p>
                    )}

                    <div className="border-b border-gray-200 pb-3 flex gap-2 items-center justify-between">
                      <p>Shipping:</p>
                      <span>
                        {" "}
                        +
                        <input
                          className="input_box inline w-[100px] text-right ml-2"
                          type="number"
                          defaultValue={shipping}
                          onChange={(e) =>
                            setShipping(fixNumber(toNumber(e.target.value)))
                          }
                        />
                      </span>
                    </div>

                    <div className=" flex gap-2 items-center justify-between ">
                      <p>Discount:</p>
                      <span>
                        -
                        <input
                          className="input_box inline w-[100px] text-right ml-2"
                          type="number"
                          defaultValue={discount}
                          onChange={(e) =>
                            setDiscount(fixNumber(toNumber(e.target.value)))
                          }
                        />
                      </span>
                    </div>

                    <p className="font-semibold flex justify-between">
                      Total:{" "}
                      <span className="pl-8">
                        {calculateTotal()} {getSetting?.currency}
                      </span>
                    </p>
                    <div className=" flex gap-2 items-center justify-between ">
                      <p>Payment:</p>
                      <span>
                        -
                        <input
                          className="input_box inline w-[100px] text-right ml-2"
                          type="number"
                          defaultValue={payment}
                          onChange={(e) =>
                            setPayment(fixNumber(toNumber(e.target.value)))
                          }
                        />
                      </span>
                    </div>

                    <p className="font-semibold flex justify-between">
                      Due:{" "}
                      <span className="pl-8">
                        {calculateDue()} {getSetting?.currency}
                      </span>
                    </p>
                  </div>
                ) : (
                  <p className="mt-2">Please add some item </p>
                )}

                <div>
                  <div className="w-full mt-[30px]">
                    <button
                      onClick={() => saveInvoice(invoiceID)}
                      className="px-[20px] w-full py-[8px] rounded-md text-[16px] font-medium bg-[#55E6A5] text-gray-900 hover:bg-[#4cd497]  transition-all duration-300"
                    >
                      Update Invoice
                    </button>
                  </div>
                  <p className="flex justify-center py-5">or</p>
                  <div className="flex gap-[20px] py-[2px] justify-around border border- rounded-md">
                    <Tooltip
                      content="Save & Download"
                      placement="bottom"
                      animate={{
                        mount: { scale: 1, y: 0 },
                        unmount: { scale: 0, y: 25 },
                      }}
                    >
                      <button
                        onClick={downloadPdf}
                        className="px-[20px] flex justify-center items-center gap-3 py-[8px]   text-purple"
                      >
                        <FaDownload className="text-[20px] hover:text-[#55E6A5] transition-all duration-200" />
                      </button>
                    </Tooltip>
                    <Tooltip
                      content="View Invoice"
                      placement="bottom"
                      animate={{
                        mount: { scale: 1, y: 0 },
                        unmount: { scale: 0, y: 25 },
                      }}
                    >
                      <button
                        onClick={viewPdf}
                        className="px-[20px] flex justify-center items-center gap-3 py-[8px]   text-purple"
                      >
                        <FaRegFilePdf className="text-[20px] hover:text-[#55E6A5] transition-all duration-200" />
                      </button>
                    </Tooltip>
                    <Tooltip
                      content="Save & Print"
                      placement="bottom"
                      animate={{
                        mount: { scale: 1, y: 0 },
                        unmount: { scale: 0, y: 25 },
                      }}
                    >
                      <button
                        onClick={printPdf}
                        className="px-[20px] flex justify-center items-center gap-3 py-[8px]   text-purple"
                      >
                        <FaPrint className="text-[20px] hover:text-[#55E6A5] transition-all duration-200" />
                      </button>
                    </Tooltip>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default UpdateComponent;
