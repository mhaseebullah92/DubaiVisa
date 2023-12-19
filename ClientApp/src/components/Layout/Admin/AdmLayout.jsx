import React, { Component } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './SideBar';
import "./admincss.css"

export class AdmLayout extends Component {
  static displayName = AdmLayout.name;

  render() {
    return (
      <div className="wrapper bodyclass">
        <Sidebar />
        <Outlet />
        {/* <Footer /> */}
      </div>
    );
  }
}
