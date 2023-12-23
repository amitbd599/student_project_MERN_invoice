import React, { useEffect } from "react";

const InitLoadData = () => {
  let getSetting = localStorage.getItem("setting");
  let getInvoices = localStorage.getItem("invoices");
  useEffect(() => {
    let setting = {
      bgImg: "",
      company_address: "4521 My Drive New York, NY 10004",
      company_name: "Paytalk com. ltd",
      currency: "$",
      discount: 0,
      email: "paytalk@armyspy.com",
      fax: "(123)-456-7890",
      footerText:
        "Paytalk.com is a vibrant and succinct 2-syllable domain name. This is a desirable character length, as it’s easy to remember and is more likely to rapidly become a household name. Furthermore, the 7 characters make it a memorable.",
      invoiceType: "random",
      invoiceWriter: "Gladys D. Watson",
      logo: "",
      mobile: "281-895-5319",
      pageOrientation: "p",
      pageSize: "a4",
      phone: "201-526-6699",
      shipping: 0,
      tax: 0,
      website: "paytalk.com",
    };

    if (!!getSetting === false) {
      localStorage.setItem("setting", JSON.stringify(setting));
    }
    if (!!getInvoices === false) {
      localStorage.setItem("invoices", JSON.stringify([]));
    }
  }, []);
  return null;
};

export default InitLoadData;
