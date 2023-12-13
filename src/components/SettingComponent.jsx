import { useRef, useState } from "react";
import { Select, Option } from "@material-tailwind/react";
import { currencyData } from "../script/currency.js";
import { page_size } from "../script/page_size";
import { SuccessToast, fixNumber, getBase64, toNumber } from "../helper/helper";
import { FaXmark } from "react-icons/fa6";
const SettingComponent = () => {
  let getSetting = JSON.parse(localStorage.getItem("setting"));
  const [logo, setLogo] = useState(getSetting?.logo);
  const [bgImg, setBgImg] = useState(getSetting?.bgImg);
  const [currency, setCurrency] = useState(getSetting?.currency || "$");
  const [invoiceType, setInvoiceType] = useState(
    getSetting?.invoiceType || "random"
  );
  const [pageSize, setPageSize] = useState(getSetting?.pageSize || "a4");
  const [pageOrientation, setPageOrientation] = useState(
    getSetting?.pageOrientation || "p"
  );

  const logoHandel = (event) => {
    getBase64(event.target.files[0]).then((base64Img) => {
      setLogo(base64Img);
    });
  };
  const bgHandel = (event) => {
    getBase64(event.target.files[0]).then((base64Img) => {
      setBgImg(base64Img);
    });
  };

  let company_nameRef,
    company_addressRef,
    mobileRef,
    phoneRef,
    faxRef,
    emailRef,
    websiteRef,
    taxRef,
    discountRef,
    shippingRef,
    footerTextRef,
    invoiceWriterRef = useRef();

  const saveData = () => {
    let company_name = company_nameRef.value;
    let company_address = company_addressRef.value;
    let mobile = mobileRef.value;
    let phone = phoneRef.value;
    let fax = faxRef.value;
    let footerText = footerTextRef.value;
    let email = emailRef.value;
    let website = websiteRef.value;
    let invoiceWriter = invoiceWriterRef.value;
    let tax = fixNumber(toNumber(taxRef.value));
    let discount = fixNumber(toNumber(discountRef.value));
    let shipping = fixNumber(toNumber(shippingRef.value));

    let setting = {
      bgImg,
      company_address,
      company_name,
      currency,
      discount,
      email,
      fax,
      footerText,
      invoiceType,
      invoiceWriter,
      logo,
      mobile,
      pageOrientation,
      pageSize,
      phone,
      shipping,
      tax,
      website,
    };

    localStorage.setItem("setting", JSON.stringify(setting));
    SuccessToast("Update success!");
  };

  return (
    <section className="container mx-auto">
      <div className="py-[80px]">
        <div className="grid grid-cols-12 gap-[20px]">
          <div className="col-span-9 p-[20px] bg-[#141C27] rounded-md">
            <h2 className="font-semibold mb-3">Setting your company info:</h2>
            <div className="grid grid-cols-12 gap-[20px]">
              <div className="w-full col-span-4">
                <div className="grid gap-1">
                  <label>Company name:</label>
                  <input
                    type="text"
                    className="input_box"
                    defaultValue={getSetting?.company_name}
                    ref={(input) => (company_nameRef = input)}
                  />
                </div>
              </div>
              <div className="w-full col-span-8">
                <div className="grid gap-1">
                  <label>Address:</label>
                  <input
                    type="text"
                    className="input_box"
                    defaultValue={getSetting?.company_address}
                    ref={(input) => (company_addressRef = input)}
                  />
                </div>
              </div>
              <div className="w-full col-span-4">
                <div className="grid gap-1">
                  <label>Mobile no:</label>
                  <input
                    type="text"
                    className="input_box"
                    defaultValue={getSetting?.mobile}
                    ref={(input) => (mobileRef = input)}
                  />
                </div>
              </div>
              <div className="w-full col-span-4">
                <div className="grid gap-1">
                  <label>Phone no:</label>
                  <input
                    type="text"
                    className="input_box"
                    defaultValue={getSetting?.phone}
                    ref={(input) => (phoneRef = input)}
                  />
                </div>
              </div>
              <div className="w-full col-span-4">
                <div className="grid gap-1">
                  <label>Fax no:</label>
                  <input
                    type="text"
                    className="input_box"
                    defaultValue={getSetting?.fax}
                    ref={(input) => (faxRef = input)}
                  />
                </div>
              </div>
              <div className="w-full col-span-4">
                <div className="grid gap-1">
                  <label>Email:</label>
                  <input
                    type="text"
                    className="input_box"
                    defaultValue={getSetting?.email}
                    ref={(input) => (emailRef = input)}
                  />
                </div>
              </div>
              <div className="w-full col-span-4">
                <div className="grid gap-1">
                  <label>Website:</label>
                  <input
                    type="text"
                    className="input_box"
                    defaultValue={getSetting?.website}
                    ref={(input) => (websiteRef = input)}
                  />
                </div>
              </div>
              <div className="w-full col-span-4">
                <div className="grid gap-1">
                  <label>Currency:</label>
                  <div>
                    <Select
                      onChange={(event) => setCurrency(event)}
                      color="light-blue"
                      className="text-gray-300"
                      value={currency}
                      defaultValue={currency}
                      label="Select item"
                      animate={{
                        mount: { y: 0 },
                        unmount: { y: 25 },
                      }}
                    >
                      {currencyData.map((item, index) => (
                        <Option key={index} value={item?.symbol}>
                          {item?.country} ({item?.currency} - {item?.symbol})
                        </Option>
                      ))}
                    </Select>
                  </div>
                </div>
              </div>
              <div className="w-full col-span-3">
                <div className="grid gap-1">
                  <label>Tax (%):</label>
                  <input
                    type="number"
                    className="input_box"
                    placeholder="0"
                    defaultValue={getSetting?.tax}
                    ref={(input) => (taxRef = input)}
                  />
                </div>
              </div>

              <div className="w-full col-span-3">
                <div className="grid gap-1">
                  <label>Discounts:</label>
                  <span className="flex gap-2 justify-center items-center">
                    <input
                      type="number"
                      className="input_box"
                      placeholder="0"
                      defaultValue={getSetting?.discount}
                      ref={(input) => (discountRef = input)}
                    />
                  </span>
                </div>
              </div>
              <div className="w-full col-span-3">
                <div className="grid gap-1">
                  <label>Shipping:</label>
                  <span className="flex gap-2 justify-center items-center">
                    <input
                      type="number"
                      className="input_box"
                      placeholder="0"
                      defaultValue={getSetting?.shipping}
                      ref={(input) => (shippingRef = input)}
                    />
                  </span>
                </div>
              </div>
              <div className="w-full col-span-3">
                <div className="grid gap-1">
                  <label>Invoice No type:</label>
                  <div>
                    <Select
                      label="Select item"
                      onChange={(event) => setInvoiceType(event)}
                      value={invoiceType}
                      color="light-blue"
                      className="text-gray-300"
                      animate={{
                        mount: { y: 0 },
                        unmount: { y: 25 },
                      }}
                    >
                      <Option value="custom">Custom number</Option>
                      <Option value="random">Random input</Option>
                    </Select>
                  </div>
                </div>
              </div>

              <div className="w-full col-span-4">
                <div className="grid gap-1">
                  <label>Page Orientation:</label>
                  <div>
                    <Select
                      onChange={(event) => setPageOrientation(event)}
                      value={pageOrientation}
                      label="Select item"
                      color="light-blue"
                      className="text-gray-300"
                      animate={{
                        mount: { y: 0 },
                        unmount: { y: 25 },
                      }}
                    >
                      <Option value="p">Portrait</Option>
                      <Option value="l">Landscape</Option>
                    </Select>
                  </div>
                </div>
              </div>
              <div className="w-full col-span-4">
                <div className="grid gap-1">
                  <label>Page Size :</label>
                  <div>
                    <Select
                      onChange={(event) => setPageSize(event)}
                      value={pageSize}
                      label="Select item"
                      color="light-blue"
                      className="text-gray-300"
                      animate={{
                        mount: { y: 0 },
                        unmount: { y: 25 },
                      }}
                    >
                      {page_size.map((item, index) => (
                        <Option key={index} value={item?.size}>
                          {item?.size}
                        </Option>
                      ))}
                    </Select>
                  </div>
                </div>
              </div>
              <div className="w-full col-span-4">
                <div className="grid gap-1">
                  <label>Invoice writer name:</label>
                  <div>
                    <input
                      type="text"
                      className="input_box"
                      defaultValue={getSetting?.invoiceWriter}
                      ref={(input) => (invoiceWriterRef = input)}
                    />
                  </div>
                </div>
              </div>
              <div className="w-full col-span-12">
                <div className="grid gap-1">
                  <label>Footer text:</label>
                  <div>
                    <textarea
                      ref={(input) => (footerTextRef = input)}
                      defaultValue={getSetting?.footerText}
                      className="input_box"
                      name=""
                      id=""
                      cols="30"
                      rows="5"
                    ></textarea>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-span-3  ">
            <div className="p-[20px] bg-[#141C27] rounded-md">
              <div className="flex gap-[30px]">
                <div className="w-[300px] relative">
                  <h2 className="font-semibold pb-2">
                    Upload your company logo
                  </h2>
                  <label
                    htmlFor="logo"
                    className=" cursor-pointer flex w-full  max-w-lg flex-col items-center rounded-xl border-2 border-dashed border-blue-400 bg-[#141C27] p-6 text-center "
                  >
                    <div>
                      {logo ? (
                        <div>
                          <img
                            src={logo}
                            alt="Selected"
                            className="w-[100px] rounded-xl"
                          />
                        </div>
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-10 w-10 text-blue-500"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                          />
                        </svg>
                      )}
                    </div>
                    <h2 className="mt-4 text-xl font-medium text-gray-300 tracking-wide">
                      Change logo
                    </h2>
                    <p className="mt-2 text-gray-300 tracking-wide">
                      Upload file PNG, JPG.
                    </p>
                    <input
                      id="logo"
                      type="file"
                      className="hidden"
                      onChange={(event) => logoHandel(event)}
                    />
                  </label>
                  {logo && (
                    <div>
                      <FaXmark
                        onClick={() => setLogo("")}
                        className="absolute cursor-pointer right-[-22px] z-[999] top-[-10px] p-2 text-[50px] text-red-600"
                      />
                    </div>
                  )}
                </div>
              </div>
              <div className="flex gap-[30px] mt-[40px]">
                <div className="w-[300px] relative">
                  <h2 className="font-semibold pb-2">Add background image</h2>
                  <label
                    htmlFor="bg"
                    className=" cursor-pointer flex w-full  max-w-lg flex-col items-center rounded-xl border-2 border-dashed border-blue-400 bg-[#141C27] p-6 text-center"
                  >
                    <div>
                      {bgImg ? (
                        <div>
                          <img
                            src={bgImg}
                            alt="Selected"
                            className="w-[100px] rounded-xl"
                          />
                        </div>
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-10 w-10 text-blue-500"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                          />
                        </svg>
                      )}
                    </div>
                    <h2 className="mt-4 text-xl font-medium text-gray-300 tracking-wide">
                      Change image
                    </h2>
                    <p className="mt-2 text-gray-300 tracking-wide">
                      Upload file PNG, JPG.
                    </p>
                    <input
                      id="bg"
                      type="file"
                      className="hidden"
                      onChange={(event) => bgHandel(event)}
                    />
                  </label>
                  {bgImg && (
                    <div>
                      <FaXmark
                        onClick={() => setBgImg("")}
                        className="absolute cursor-pointer right-[-22px] z-[999] top-[-10px] p-2 text-[50px] text-red-600"
                      />
                    </div>
                  )}
                </div>
              </div>
              <div className="mt-5">
                <button
                  className="px-[20px] font-medium text-[18px] py-[8px] w-full rounded-md bg-[#55E6A5] text-gray-900"
                  onClick={saveData}
                >
                  Save global setting
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SettingComponent;
