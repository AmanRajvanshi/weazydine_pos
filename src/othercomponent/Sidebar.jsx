import React, { Component } from "react";
import { NavLink } from "react-router-dom";

export class Sidebar extends Component {
  render() {
    return (
      <div className="sidebar" id="sidebar">
        <div className="sidebar-inner slimscroll">
          <div id="sidebar-menu" className="sidebar-menu">
            <ul>
              <li>
                <NavLink
                  // exact={true}
                  end={true}
                  className={({ isActive }) =>
                    isActive ? "active" : "not-active"
                  }
                  to="/"
                >
                  Dashboard
                </NavLink>
              </li>
              <li>
                <NavLink
                  className={({ isActive }) =>
                    isActive ? "active" : "not-active"
                  }
                  to="/pos"
                >
                  POS
                </NavLink>
              </li>
              <li>
                <NavLink
                  className={({ isActive }) =>
                    isActive ? "active" : "not-active"
                  }
                  to="/orders"
                >
                  Orders
                </NavLink>
              </li>{" "}
              <li>
                <NavLink
                  className={({ isActive }) =>
                    isActive ? "active" : "not-active"
                  }
                  to="/kot"
                >
                  KOT
                </NavLink>
              </li>
              <li>
                <NavLink
                  className={({ isActive }) =>
                    isActive ? "active" : "not-active"
                  }
                  to="/productlist"
                >
                  Product List
                </NavLink>
              </li>
              <li>
                <NavLink
                  className={({ isActive }) =>
                    isActive ? "active" : "not-active"
                  }
                  to="/categorylist"
                >
                  Category List
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default Sidebar;
