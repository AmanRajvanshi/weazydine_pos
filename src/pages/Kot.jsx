import React, { Component } from "react";
import Header from "../othercomponent/Header";
import Sidebar from "../othercomponent/Sidebar";

export class Kot extends Component {
  render() {
    return (
      <div>
        <Sidebar />
        <Header />
      </div>
    );
  }
}

export default Kot;
