import React from "react";
import { NavLink } from "react-router-dom";

const MasterLayout = (props) => {
  return (
    <section className="bg-[#09101A] w-full min-h-screen">
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
      <footer>
        <p>this is footer</p>
      </footer>
    </section>
  );
};

export default MasterLayout;
