import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

class pdfScript {
  //Template
  template({ getSetting, templateData, print, view, save }) {
    console.log(templateData);
    const pdf = new jsPDF(
      getSetting?.pageOrientation,
      "mm",
      getSetting?.pageSize
    );
    pdf.setFont("inter", "normal");
    // Bg image
    let imgWidth = 100; // Set the width of your image
    let imgHeight = 0; // Set the height of your image
    let centerImgX = (pdf.internal.pageSize.width - imgWidth) / 2;
    let centerImgY = (pdf.internal.pageSize.height - imgHeight) / 2;

    console.log(!!getSetting?.bgImg?.length);
    // Background image set
    !!getSetting?.bgImg?.length === true &&
      pdf.addImage(
        getSetting?.bgImg,
        "png",
        centerImgX,
        centerImgY,
        imgWidth,
        imgHeight
      );

    // Logo
    !!getSetting?.logo?.length === true &&
      pdf.addImage(getSetting?.logo, "png", 15, 8, 0, 14);

    pdf.setDrawColor(0);
    pdf.setFillColor(0, 0, 0);
    pdf.rect(-10, 44, 400, 1, "F");

    pdf.setFontSize(40);
    pdf.setFont("inter", "bold");
    pdf.setTextColor(0, 0, 0);

    pdf.setTextColor(0, 0, 0);
    pdf.setFont("inter", "normal");
    pdf.setFontSize(10);
    pdf.text(
      `INVOICE # ${templateData?.invoiceID}`,
      pdf.internal.pageSize.width - 15,
      15,
      {
        align: "right",
      }
    );
    pdf.text(
      `Payment status:: ${templateData?.due > 0 ? "Due" : "Paid"}`,
      pdf.internal.pageSize.width - 15,
      21,
      {
        align: "right",
      }
    );
    pdf.text(
      `Submit Date:  ${templateData?.startDate?.slice(0, 10)}`,
      pdf.internal.pageSize.width - 15,
      27,
      {
        align: "right",
      }
    );
    pdf.text(
      `Delivery date:  ${templateData?.deliveryDate.slice(0, 10)}`,
      pdf.internal.pageSize.width - 15,
      33,
      {
        align: "right",
      }
    );
    pdf.text(
      `Writer:  ${templateData?.invoiceWriter}`,
      pdf.internal.pageSize.width - 15,
      39,
      {
        align: "right",
      }
    );

    pdf.text(`${getSetting?.company_name}`, 15, 29);
    pdf.setFontSize(10);
    pdf.text(`${getSetting?.company_address}`, 15, 34);
    pdf.text(
      `${getSetting?.email}, ${getSetting?.mobile}, ${getSetting?.website}`,
      15,
      39
    );

    // Right side data
    let templateTwoRightStart = parseInt(pdf.internal.pageSize.width) / 2;
    // Filled red square
    pdf.setDrawColor(0);
    pdf.setFillColor(0, 0, 0);
    pdf.rect(15, 52, templateTwoRightStart - 30, 8, "F");
    pdf.setTextColor(255, 255, 255);
    pdf.setFontSize(12);
    pdf.text("Client information", 20, 57);
    pdf.setTextColor(0, 0, 0);
    // company_name
    pdf.setFontSize(14);
    pdf.setFont("inter", "bold");
    pdf.text(`${templateData?.customerName}`, 20, 66);
    pdf.setFont("inter", "normal");
    pdf.setFontSize(10);
    pdf.text(`${templateData?.address}`, 20, 73);
    pdf.text(`Phone: ${templateData?.phone}`, 20, 78);
    pdf.text(`Email: ${templateData?.email}`, 20, 83);

    // Filled red square
    pdf.setDrawColor(0);
    pdf.setFillColor(0, 0, 0);
    pdf.rect(
      templateTwoRightStart + 15,
      52,
      templateTwoRightStart - 30,
      8,
      "F"
    );
    pdf.setTextColor(255, 255, 255);
    pdf.setFontSize(12);
    pdf.text("Payment info", templateTwoRightStart + 20, 57);
    pdf.setTextColor(0, 0, 0);
    pdf.setFontSize(14);
    pdf.setFont("inter", "bold");
    pdf.setFontSize(10);
    pdf.setFont("inter", "normal");
    pdf.setFontSize(14);
    pdf.setFont("inter", "bold");
    pdf.text(
      `Payment method: ${templateData?.paymentMethod}`,
      templateTwoRightStart + 20,
      66
    );
    pdf.setFont("inter", "normal");
    pdf.setFontSize(10);
    templateData?.paymentMethod === "Bank" &&
      pdf.text(
        `A/C name:  ${templateData?.accountName}`,
        templateTwoRightStart + 20,
        73
      );
    templateData?.paymentMethod === "Bank" &&
      pdf.text(
        `A/C no: ${templateData?.accountNumber}`,
        templateTwoRightStart + 20,
        78
      );
    templateData?.paymentMethod === "Bank" &&
      pdf.text(
        `Branch: ${templateData?.branchName}`,
        templateTwoRightStart + 20,
        83
      );
    pdf.setTextColor(255, 0, 0);

    // Table Item
    autoTable(pdf, {
      startY: 90,
      theme: "grid",
      headStyles: {
        halign: "left",
        fillColor: [0, 0, 0],
      },
      columnStyles: { halign: "left" },
      body: templateData?.invoiceItems,
      columns: [
        { header: "Item", dataKey: "item" },
        { header: "Quantity", dataKey: "quantity" },
        { header: "Rate", dataKey: "rate" },
        { header: "Amount", dataKey: "amount" },
      ],
    });
    // Table payment calculation

    // let data = [
    //   ["Subtotal", templateData?.subTotal],
    //   ["Tax(15%)", templateData?.tax],
    //   ["Shipping", templateData?.shipping],
    //   ["Discount", templateData?.discount],
    //   ["Total", templateData?.total],
    //   ["Payment", templateData?.payment],
    //   ["Due", templateData?.due],
    // ];

    // // Filter out elements where the second element is 0
    // var filteredData = data.filter(function (item) {
    //   return (
    //     (item[1] !== null && item[0] === "Subtotal") ||
    //     (item[1] !== 0 && item[0] === "Tax(15%)") ||
    //     (item[1] !== null && item[0] === "Shipping") ||
    //     (item[1] !== null && item[0] === "Discount") ||
    //     (item[1] !== null && item[0] === "Total") ||
    //     (item[1] !== null && item[0] === "Payment") ||
    //     (item[1] !== null && item[0] === "Due")
    //   );
    // });

    // var styles = {
    //   fontStyle: "bold",
    //   fontSize: 10,
    //   textColor: 0,
    //   halign: "right",
    // };

    // pdf.autoTable({
    //   tableWidth: 60,
    //   theme: "grid",
    //   margin: { left: pdf.internal.pageSize.width - 74, bottom: 40 },
    //   // head: [filteredData[0]],
    //   body: filteredData.slice(0),
    //   styles: styles,
    //   headStyles: {
    //     europe: { halign: "right" },
    //     fillColor: [0, 0, 0],
    //     textColor: [255, 255, 255],
    //   },
    //   columnStyles: {
    //     0: { fontStyle: "normal" },
    //   },
    // });

    // Footer
    pdf.setTextColor(0, 0, 0);
    pdf.setFontSize(14);

    pdf.text(
      "Authorized Signature",
      pdf.internal.pageSize.width - 15,
      pdf.internal.pageSize.height - 23,
      {
        align: "right",
      }
    );
    pdf.setFontSize(10);
    pdf.setDrawColor(0);
    pdf.setFillColor(0, 0, 0);
    pdf.rect(-10, pdf.internal.pageSize.height - 15, 400, 1, "F");
    let splitTitle = pdf.splitTextToSize(
      getSetting?.footerText,
      pdf.internal.pageSize.width - 15
    );
    pdf.text(splitTitle, 10, pdf.internal.pageSize.height - 7);

    let note = pdf.splitTextToSize(`Note: ${templateData?.note}`, 120);
    pdf.text(note, 10, pdf.internal.pageSize.height - 35);
    // Save the PDF

    if (print === true) {
      pdf.autoPrint();
      pdf.output("dataurlnewwindow");
    }

    view === true && pdf.output("dataurlnewwindow");
    save === true && pdf.save("invoice.pdf");

    // Convert the PDF to a data URL
    const pdfDataUri = pdf.output("datauristring");
    // Set the data URL in the state to trigger a re-render
    return pdfDataUri;
  }
}

let pdfScriptData = new pdfScript();

export default pdfScriptData;
