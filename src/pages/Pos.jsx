import React, { Component } from "react";
import logo from "../assets/images/logo.png";
import Multiselect from "multiselect-react-dropdown";
import { Link } from "react-router-dom";

export class Pos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      options: [{ name: 1 }, { name: 2 }, { name: 3 }, { name: 4 }],
    };
  }

  onSelect(selectedList, selectedItem) {
    console.log(selectedList, selectedItem);
  }

  onRemove(selectedList, removedItem) {
    console.warn(selectedList, removedItem);
  }
  render() {
    return (
      <div className="container">
        <header
          className=" position-sticky top-0 bg-white"
          style={{
            zIndex: "10",
          }}
        >
          <div className="d-flex flex-column flex-md-row align-items-center p-3 mb-4 border-bottom">
            <Link
              to="/pos"
              className="d-flex align-items-center text-dark text-decoration-none"
            >
              <img src={logo} alt="logo" width={150} className="mr-3" />
            </Link>
            <nav className="d-inline-flex mt-2 mt-md-0 ms-md-auto">
              <div className="d-flex align-items-center">
                <Multiselect
                  options={this.state.options} // Options to display in the dropdown
                  selectedValues={this.state.selectedValue} // Preselected value to persist in dropdown
                  onSelect={this.onSelect} // Function will trigger on select event
                  onRemove={this.onRemove} // Function will trigger on remove event
                  displayValue="name" // Property name to display in the dropdown options
                  className="mr-2"
                />
                <button className="btn btn-primary">Signout</button>
              </div>
            </nav>
          </div>
        </header>
        <main>
          <div className="row" data-masonry='{"percentPosition": true }'>
            <div className="col-sm-6 col-lg-4 mb-4">
              <div className="card text-center p-3 py-0">
                <div className="mb-0">
                  <div className="blockquote mt-1 p-2 text-bg-primary rounded">
                    <p className="text-center">Indian</p>
                  </div>
                  <Singleorder />
                  <Singleorder />
                  <Singleorder />
                  <Singleorder />
                </div>
              </div>
            </div>
            <div className="col-sm-6 col-lg-4 mb-4">
              <div className="card text-center p-3 py-0">
                <div className="mb-0">
                  <div className="blockquote mt-1 p-2 text-bg-primary rounded">
                    <p className="text-center">Chinese</p>
                  </div>
                  <Singleorder />
                  <Singleorder />
                  <Singleorder />
                  <Singleorder />
                </div>
              </div>
            </div>
            <div className="col-sm-6 col-lg-4 mb-4">
              <div className="card text-center p-3 py-0">
                <div className="mb-0">
                  <div className="blockquote mt-1 p-2 text-bg-primary rounded">
                    <p className="text-center">Italian</p>
                  </div>
                  <Singleorder />
                  <Singleorder />
                  <Singleorder />
                  <Singleorder />
                </div>
              </div>
            </div>
            <div className="col-sm-6 col-lg-4 mb-4">
              <div className="card text-center p-3 py-0">
                <div className="mb-0">
                  <div className="blockquote mt-1 p-2 text-bg-primary rounded">
                    <p className="text-center">Tandoor</p>
                  </div>
                  <Singleorder />
                  <Singleorder />
                  <Singleorder />
                  <Singleorder />
                </div>
              </div>
            </div>
            <div className="col-sm-6 col-lg-4 mb-4">
              <div className="card text-center p-3 py-0">
                <div className="mb-0">
                  <div className="blockquote mt-1 p-2 text-bg-primary rounded">
                    <p className="text-center">South Indian</p>
                  </div>
                  <Singleorder />
                  <Singleorder />
                  <Singleorder />
                  <Singleorder />
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }
}

class Singleorder extends React.Component {
  constructor(props) {
    super(props);
  }

  backgroundChange = (e) => {
    if (e.target.value == "preparing") {
      document.getElementById("main_cart").classList.add("text-bg-danger");
    } else if (e.target.value == "prepared") {
      document.getElementById("main_cart").classList.add("text-bg-success");
    } else {
      document.getElementById("main_cart").classList.remove("text-bg-danger");
      document.getElementById("main_cart").classList.remove("text-bg-success");
    }
  };

  render() {
    return (
      <div className="card my-2" id="main_cart">
        <div className="card-body">
          <div className="d-flex align-items-center justify-content-between mb-2">
            <h5 className="card-title text-start mb-0">
              Dal Makhni <strong>x2</strong>
            </h5>
            <select
              name=""
              id=""
              onChange={(e) => {
                this.backgroundChange(e);
                // alert(e.target.value);
              }}
              style={{
                border: "none",
                borderBottom: "1px solid black",
                focusVisible: "none",
                borderRadius: "3px",
                borderRadius: "3px",
              }}
            >
              <option value="order_received">Order Received</option>
              <option value="preparing">Preparing</option>
              <option value="prepared">Prepared</option>
            </select>
          </div>
          <p className="card-text text-start">
            <small>
              With supporting text below as a natural lead-in to additional
              content.sssssss
            </small>
          </p>
        </div>
      </div>
    );
  }
}

export default Pos;
