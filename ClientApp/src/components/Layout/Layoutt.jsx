import React, { Component } from 'react';
// import { Container } from 'reactstrap';
import Navbar from './Navbar';
import Footer from './Footer';
import '../../custom.css';
import { Outlet } from 'react-router-dom';
// import { NavMenu } from '../NavMenu';

export class Layoutt extends Component {
  static displayName = Layoutt.name;

  render() {
    return (
      <div>
        <Navbar />
        {/* <div>
          {console.log(this.props.children)}
        </div> */}
        <Outlet />
        <Footer />
      </div>
    );
  }
}
