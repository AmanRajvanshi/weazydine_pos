import React, { Component } from "react";
import logo from "../assets/images/logo.png";
import Multiselect from "multiselect-react-dropdown";
import { Link } from "react-router-dom";

export class Pos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orderedItems: [],
      options: [{ name: 1 }, { name: 2 }, { name: 3 }, { name: 4 }],
    };
  }

  componentDidMount() {
    window.setInterval(() => {
      this.fetchItems();
    }, 60000);
    this.fetchItems();
  }

  onSelect(selectedList, selectedItem) {
    console.log(selectedList, selectedItem);
  }

  onRemove(selectedList, removedItem) {
    console.warn(selectedList, removedItem);
  }

  fetchItems = () => {
    fetch(global.api + "fetch_item_for_cooking", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        vendor_id: 3,
      }),
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.status) {
          console.log(json);
          this.setState({
            orderedItems: json.data,
          });
          // console.log(json);
        } else {
          console.log(json);
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {});
  };
  render() {
    return (
      <>
        <header
          className=" position-sticky top-0 bg-white"
          style={{
            zIndex: "10",
          }}
        >
          <div className="d-flex flex-column flex-md-row align-items-center p-3 mb-4 border-bottom">
            <div className="container d-flex header_column">
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
                  <button
                    className="btn btn-primary"
                    style={{ marginLeft: "10px" }}
                  >
                    Signout
                  </button>
                </div>
              </nav>
            </div>
          </div>
        </header>
        <div className="container">
          <main>
            <div className="row" data-masonry='{"percentPosition": true }'>
              {this.state.orderedItems.map((items) => {
                return (
                  <>
                    {items.order_item.length > 0 ? (
                      <div className="col-sm-6 col-lg-4 mb-4">
                        <div className="card text-center p-3 py-0">
                          <div className="mb-0">
                            <div className="blockquote mt-1 p-2 text-bg-primary rounded">
                              <p className="text-center">{items.name}</p>
                            </div>
                            <Singleorder
                              singleItem={items.order_item}
                              fetchItems={() => this.fetchItems()}
                            />
                          </div>
                        </div>
                      </div>
                    ) : (
                      <></>
                    )}
                  </>
                );
              })}
            </div>
          </main>
        </div>
      </>
    );
  }
}

class Singleorder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: props.singleItem,
    };
  }

  backgroundChange = (e) => {
    console.log(e);
    if (e == "preparing") {
      document.getElementById("main_cart").classList.add("text-bg-danger");
    } else if (e == "prepared") {
      document.getElementById("main_cart").classList.add("text-bg-success");
      document.getElementById("main_cart").classList.remove("text-bg-danger");
    } else {
      document.getElementById("main_cart").classList.remove("text-bg-danger");
      document.getElementById("main_cart").classList.remove("text-bg-success");
    }
  };

  changeOrderStatus = (id, e) => {
    fetch(global.api + "update_item_for_cooking", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        item_id: id,
        item_status: e.target.value,
      }),
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.status) {
          // this.backgroundChange();
        } else {
          console.log(json);
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        this.props.fetchItems();
      });
  };

  render() {
    return (
      <>
        {this.props.singleItem.map((item) => {
          return (
            <div className="card my-2 border pb-3" id="main_cart">
              <select
                name=""
                id=""
                onChange={(e) => {
                  this.changeOrderStatus(item.id, e);
                  this.backgroundChange(e.target.value);
                }}
                style={{
                  border: "1px solid #000",
                  padding: "10px",
                }}
                value={item.order_product_status}
              >
                <option value="preparing">Preparing</option>
                <option value="prepared">Prepared</option>
              </select>
              <div className="card-body pb-0">
                <div className="d-flex align-items-center justify-content-between mb-2">
                  <h5 className="card-title text-start mb-0">
                    {item.product.product_name}{" "}
                    <strong>x{item.product_quantity}</strong>
                  </h5>
                </div>
                <p className="card-text text-start">
                  Addons:{" "}
                  <small className="border border-warning rounded px-2 py-1">
                    {item.addon_name}{" "}
                  </small>
                </p>
              </div>
            </div>
          );
        })}
      </>
    );
  }
}

export default Pos;
