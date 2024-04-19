import React from "react";
import { NavLink } from "react-router-dom";
import { route } from "../../../routes/routes";

const Sidebar = () => {
  return (
    <div className="cool-sidebar">
      <div className="content-wrapper">
        <div className="cool-sidebar-container">
          <div className="cool-sidebar-list">
            <div className="cool-sidebar-list-element">
              <NavLink to={route.home}>
                <div className="cool-sidebar-list-text">STRONA GŁÓWNA</div>
              </NavLink>
            </div>
          </div>
          <div className="cool-sidebar-head">
            <h3>SZYFRY:</h3>
          </div>
          <div className="cool-sidebar-list">
            <div className="cool-sidebar-list-element">
              <NavLink to={route.caesarCipher}>
                <div className="cool-sidebar-list-text">SZYFR CEZARA</div>
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
