import React, { Component } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../AuthContextProvider";

export class Toggle extends Component {
  static contextType = AuthContext;
  constructor(props) {
    super(props);
    this.state = {
      status: true,
      product_id: props.product_id,
      type: this.props.action_type,
    };
  }

  componentDidMount() {
    if (this.props.status == "active") {
      this.setState({ status: true });
    } else {
      this.setState({ status: false });
    }
  }

  handleStatus = (e) => {
    if (this.state.status) {
      this.setState({ status: false });
      var status = "inactive";
    } else {
      this.setState({ status: true });
      var status = "active";
    }

    var product_id = this.state.product_id;
    fetch(global.api + "update_status_product_offer", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: this.context.token,
      },
      body: JSON.stringify({
        action_id: product_id,
        type: this.state.type,
        status: status,
      }),
    })
      .then((response) => response.json())
      .then((json) => {
        if (!json.status) {
          var msg = json.msg;
          // Toast.show(msg);
        } else {
          //   Toast.show("jhsd")
        }
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        // this.setState({ isloading: false })
      });
  };

  render() {
    return (
      <div className="status-toggle">
        <input
          type="checkbox"
          id={this.state.product_id+this.props.id}
          className="check"
          value={this.state.product_id}
          onChange={this.handleStatus}
          checked={this.state.status}
        />
        <label htmlFor={this.state.product_id+this.props.id} className="checktoggle"></label>
      </div>
    );
  }
}
