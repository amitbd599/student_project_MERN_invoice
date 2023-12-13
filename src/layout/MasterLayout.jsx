import React from "react";
import { NavLink } from "react-router-dom";

const MasterLayout = (props) => {
  return (
    <>
      <section className="bg-gray-100 w-full min-h-screen">
        <section className="bg-[#141C27] w-full h-[100px] flex items-center">
          <div className="container mx-auto">
            {/* Header sectoion */}
            <header className="flex justify-between">
              <div className="logo">
                <img src="assets/img/logo-dark.png" alt="" />
              </div>
              <nav className="flex items-center">
                <ul className="flex gap-10">
                  <li>
                    <NavLink
                      to="/"
                      className={(navData) =>
                        navData.isActive ? "navActive" : "navNotActive"
                      }
                    >
                      Home
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/all-invoice"
                      className={(navData) =>
                        navData.isActive ? "navActive" : "navNotActive"
                      }
                    >
                      All Invoice
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/setting"
                      className={(navData) =>
                        navData.isActive ? "navActive" : "navNotActive"
                      }
                    >
                      Setting
                    </NavLink>
                  </li>
                </ul>
              </nav>
            </header>
          </div>
        </section>

        {/* main body */}
        <main>{props.children}</main>

        {/* Footer */}
        <footer className="bg-[#141C27] pt-[80px] pb-[20px]">
          <div className="container mx-auto">
            <div className="grid grid-cols-12 gap-[40px] border-b border-gray-800 pb-[40px]">
              <div className="col-span-4">
                <div className="flex gap-[30px]">
                  <div>
                    <div className="bg-[#55E6A5] w-[80px] h-[80px] flex justify-center items-center rounded-full">
                      <img
                        src="assets/img/map.svg"
                        alt=""
                        className="w-[40px]"
                      />
                    </div>
                  </div>
                  <div>
                    <div>
                      <h3 className="font-semibold text-[18px]">Address</h3>
                      <p className="mt-2">
                        2118 Thornridge Cir. Syracuse, Connecticut 35624
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-span-4">
                <div className="flex gap-[30px]">
                  <div>
                    <div className="bg-[#55E6A5] w-[80px] h-[80px] flex justify-center items-center rounded-full">
                      <img
                        src="assets/img/phone.svg"
                        alt=""
                        className="w-[40px]"
                      />
                    </div>
                  </div>
                  <div>
                    <div>
                      <h3 className="font-semibold text-[18px]">
                        Lets talk us
                      </h3>
                      <p className="mt-2">99-(963)-85-525</p>
                      <p className="mt-1">99-(639)-85-885</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-span-4">
                <div className="flex gap-[30px]">
                  <div>
                    <div className="bg-[#55E6A5] w-[80px] h-[80px] flex justify-center items-center rounded-full">
                      <img
                        src="assets/img/phone.svg"
                        alt=""
                        className="w-[40px]"
                      />
                    </div>
                  </div>
                  <div>
                    <div>
                      <h3 className="font-semibold text-[18px]">
                        Send us email
                      </h3>
                      <p className="mt-2">ostadpdfmaker@gmail.com</p>
                      <p className="mt-1">pdfmaker@amitjs.com</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-center pt-[20px]">
              <p className="text-sm">
                © PDF Maker 2023 ||{" "}
                <span className="text-[#55E6A5]">Ostad MERN Stack Batch 5</span>{" "}
                || All Rights Reserved
              </p>
            </div>
          </div>
        </footer>
      </section>
    </>
  );
};

export default MasterLayout;
