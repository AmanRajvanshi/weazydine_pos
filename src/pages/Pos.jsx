import React, { Component } from "react";
import Header from "../othercomponent/Header";
import { AuthContext } from "../AuthContextProvider";
import { Bars } from "react-loader-spinner";
import { BiRupee } from "react-icons/bi";

import { Modal } from "react-responsive-modal";
import { RadioButton, RadioGroup } from "react-radio-buttons";
import TableOrderDetails from "./TableOrderDetails";
class Pos extends Component {
  static contextType = AuthContext;
  constructor(props) {
    super(props);
    this.state = {
      category: [],
      products: [],
      active_cat: 0,
      isloading: true,
      cart:[]
    };
  }

  componentDidMount() {
    this.fetchCategories();
  }

  active_cat = (id) => {
    this.setState({ active_cat: id });
    this.fetchProducts(id, 1);
  };

  fetchProducts = (category_id, page) => {
    fetch(global.api + "vendor_get_vendor_product", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: this.context.token,
      },
      body: JSON.stringify({
        vendor_category_id: category_id,
        product_type: "product",
        page: page,
      }),
    })
      .then((response) => response.json())
      .then((json) => {
        //  console.warn(json);
        if (!json.status) {
          var msg = json.msg;
          if (page == 1) {
            this.setState({ products: [] });
          }
        } else {
          if (json.data.length > 0) {
            this.setState({ products: json.data });
          }
        }
        // this.setState({ isloading: false, load_data: false });
        return json;
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        this.setState({ isloading: false });
      });
  };

  fetchCategories = () => {
    fetch(global.api + "fetch_vendor_category", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: this.context.token,
      },
    })
      .then((response) => response.json())
      .then((json) => {
        // console.warn(json.data)
        this.setState({ category: json.data });
        this.fetchProducts(0, 1);
        return json;
      })
      .catch((error) => console.error(error))
      .finally(() => {
        this.setState({ isLoading: false });
      });
  };


  add_to_cart = (product,vv_id,addons)=>
  {
      var match=false;
      var key=0;

      for (var i = 0; i < this.state.cart.length; i++) 
      {
        var item =this.state.cart[i];
        if(item.product.id==product.id && item.variant_id==vv_id)
        {
          match=true;
          key=i;
          break;
        }
      }
    

      if(match)
      {
        cart=this.state.cart;
        cart[key].quantity=cart[key].quantity+1;
        cart[key].price=cart[key].price*2;
        this.setState({cart:cart});
      }  
      else
      {
        let total=parseFloat(product.our_price);
        product.variants.map((item,index)=>{
          if(item.id == vv_id)
          {
            total = item.variants_discounted_price;
          }
        })
  
        product.addon_map.map((item,index)=>{
        if(addons.includes(item.id))
        {
          total = total + item.addon_price;
        }
      }
      )
  
       var cart={product_id:product.id,product:product,variant_id:vv_id,addons:addons,quantity:1,price:total};
       this.setState({cart:[...this.state.cart, cart]});
    }
   
   
  }

  clear_cart = ()=>
  {
    this.setState({cart:[]});
  }


  search = (e) => {
  if(e.target.value.length > 3 )
  {
    fetch(global.api + "search_product", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: this.context.token,
      },
      body: JSON.stringify({
        'search_query' : e.target.value,
      }),
    })
      .then((response) => response.json())
      .then((json) => {
        //  console.warn(json);
        // if (!json.status) {
        //   var msg = json.msg;
         
        // } else {
         
            this.setState({ products: json.data });
     
        // }
        // this.setState({ isloading: false, load_data: false });
        return json;
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        this.setState({ isloading: false });
      });
  }
  else{
    this.fetchProducts(this.state.active_cat, 1);
  }
}
  render() {
    return (
      <>
        <div className="main-wrappers">
          <Header />
          {this.state.isloading ? (
            <div className="main_loader">
              <Bars
                height="80"
                width="80"
                color="#eda332"
                ariaLabel="bars-loading"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
              />
            </div>
          ) : (
            <div className="page-wrapper" id="sidebar">
              <div className="content">
                
                <div className="row">
                  <div className="col-lg-8 col-sm-12 ">

             
                  <input
                    type="text"
                    name=""
                    id=""
                    onChange={(e) => this.search(e)}
                    placeholder="Search Here...."
                    style={{
                      width: "100%",
                      height: "40px",
                      borderRadius: "5px",
                      border: "1px solid #ccc",
                      padding: "0 10px",
                      position: "relative",
                      margin: "10px 0 30px",
                    }}
                  />
                
                {
                  this.state.category.length>0?
                <Category
                  category={this.state.category}
                  fetch_product={this.active_cat}
                />:
                <></>
  }
                  <div style={{position:'fixed',width:'60%',height:'70vh',overflowX:'scroll'}}>
                  <div className="tabs_container" >
        <div className="tab_content active" data-tab="fruits">
          <div className="row">
                  {this.state.products.length > 0 ? (
              this.state.products.map((item, index) => {
                return (
                  <Products data={item} cart={this.add_to_cart} />
                )
              })
                  ) : 
                  <></>
  }

</div>
</div>
</div>
               
                    </div>
                  </div>

                  <div className="col-lg-4 col-sm-12 sidebar_scroll">
                    <div style={{position:'fixed',zIndex:999,width:'30%'}}>
                    <PosAdd clear={this.clear_cart} cart={this.state.cart}/>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </>
    );
  }
}

class PosAdd extends React.Component {
  render() {
    return (
      <>
        {/* <div className="order-list"> */}
          {/* <div className="orderid"> */}
            {/* <h4>Order List</h4> */}
            {/* <h5>Transaction id : #65565</h5> */}
          {/* </div> */}
          {/* <div className="actionproducts">
            <ul>
              <li>
                <a href="javascript:void(0);" className="deletebg confirm-text">
                  <img
                    src="https://dreamspos.dreamguystech.com/html/template/assets/img/icons/delete-2.svg"
                    alt="img"
                  />
                </a>
              </li>
              <li>
                <a
                  href="javascript:void(0);"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  className="dropset"
                >
                  <img
                    src="https://dreamspos.dreamguystech.com/html/template/assets/img/icons/ellipise1.svg"
                    alt="img"
                  />
                </a>
                <ul
                  className="dropdown-menu"
                  aria-labelledby="dropdownMenuButton"
                  data-popper-placement="bottom-end"
                >
                  <li>
                    <a href="#" className="dropdown-item">
                      Action
                    </a>
                  </li>
                  <li>
                    <a href="#" className="dropdown-item">
                      Another Action
                    </a>
                  </li>
                  <li>
                    <a href="#" className="dropdown-item">
                      Something Elses
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
          </div> */}
        {/* </div> */}
        <div className="card card-order">
          
          <div className="split-card" />
          <div className="card-body pt-0">
            <div className="totalitem">
              <h4>Total items : {this.props.cart.length}</h4>
              <a href="javascript:void(0);" onClick={()=>{this.props.clear()}} >Clear all</a>
            </div>
            <div className="product-table" style={{height:'50vh'}}>
            {
              this.props.cart.length>0?
              this.props.cart.map((item,index)=>{
    return(
      <ul className="product-lists">
                <li>
                  <div className="productimg">
                   
                    <div className="productcontet">
                      <h4>
                        {
                          item.product.product_name
                        }
                     

                     {
                        item.product.variants.map((i,index)=>{
                          if(i.id == item.variant_id)
                          {
                            return(
                              <p>- {i.variants_name}</p>
                            )
                          }
                        })
                    
                     }
                      </h4>
                      <div className="productlinkset">
                      {
                        item.product.addon_map.map((i,index)=>{
                        if(item.addons.includes(i.id))
                        {
                          return (
                            <h5>{i.addon_name}</h5>
                          )
                        }
                      })
                     }
                     
                      </div>
                    <div class="row">
                      <div class="col-6">
                      <AddDelete quantity={item.quantity}/>
                      </div>
                      <div class="col-6">
                      <p style={{marginTop:'10px'}}>X {item.price/item.quantity}</p>
                        </div>
                        </div>
                    </div>
                  </div>
                </li>
                <li>{item.price}</li>
                <li>
                  <a className="confirm-text" href="javascript:void(0);">
                    <img
                      src="https://dreamspos.dreamguystech.com/html/template/assets/img/icons/delete-2.svg"
                      alt="img"
                    />
                  </a>
                </li>
              </ul>
    )}):
    <h5>No Cart</h5>
  }
    

            </div>
          </div>
          <div className="split-card" />
          <div className="card-body pt-0 pb-2">
            <div className="setvalue">
              <ul>
                <li>
                  <h5>Subtotal</h5>
                  <h6>    <BiRupee />55.00</h6>
                </li>
                <li>
                  <h5>Tax</h5>
                  <h6>    <BiRupee />5.00</h6>
                </li>
                <li className="total-value">
                  <h5>Total</h5>
                  <h6>    <BiRupee />60.00</h6>
                </li>
              </ul>
            </div>
            {/* <div className="setvaluecash">
              <ul>
                <li>
                  <a href="javascript:void(0);" className="paymentmethod">
                    <img
                      src="https://dreamspos.dreamguystech.com/html/template/assets/img/icons/cash.svg"
                      alt="img"
                      className="me-2"
                    />
                    Cash
                  </a>
                </li>
                <li>
                  <a href="javascript:void(0);" className="paymentmethod">
                    <img
                      src="https://dreamspos.dreamguystech.com/html/template/assets/img/icons/debitcard.svg"
                      alt="img"
                      className="me-2"
                    />
                    Debit
                  </a>
                </li>
                <li>
                  <a href="javascript:void(0);" className="paymentmethod">
                    <img
                      src="https://dreamspos.dreamguystech.com/html/template/assets/img/icons/scan.svg"
                      alt="img"
                      className="me-2"
                    />
                    Scan
                  </a>
                </li>
              </ul>
            </div> */}
            <div className="btn btn-primary" style={{width:'100%'}}>
              <h5>Place Order</h5>
            </div>
          </div>
        </div>
      </>
    );
  }
}

class AddDelete extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
    };
  }
  render() {
    return (
      <div className="increment-decrement">
        <div className="input-groups">
          <input
            type="button"
            defaultValue="-"
            className="button-minus dec button"
            onClick={() => {
              this.setState({ count: this.state.count - 1 });
            }}
          />
          <input
            type="text"
            name="child"
            value={this.props.quantity}
            className="quantity-field"
          />
          <input
            type="button"
            defaultValue="+"
            className="button-plus inc button"
            onClick={() => {
              this.setState({ count: this.state.count + 1 });
            }}
          />
        </div>
      </div>
    );
  }
}

class Category extends Component {
  render() {
    return (
      <div className="row">
        <ul className="tabs horizontal_scroll">
          <li
            onClick={() => {
              this.props.fetch_product(0);
            }}
          >
            <div className="product-details">
              <h6>All</h6>
            </div>
          </li>

          {this.props.category.length > 0 ? (
            this.props.category.map((item, index) => {
              return (
                <li
                  onClick={() => {
                    this.props.fetch_product(item.id);
                  }}
                >
                  <div className="product-details">
                    <h6>{item.name}</h6>
                  </div>
                </li>
              );
            })
          ) : (
            <></>
          )}
        </ul>
      </div>
    );
  }
}

class Products extends Component {
  constructor(props) {
    super(props);

    if (this.props.data.variants.length > 0) {
      var vv = this.props.data.variants[0].id;
    } else {
      var vv = 0;
    }
    
    this.state={
      openModal:false,
      variants_id: vv,
      addon: []
    }
  }

  add_cart(product)
  {
    if(product.addon_map.length > 0 ||
      product.variants.length > 0 )
      {
        this.setState({openModal:true})
      }
      else{
       this.props.cart(product,this.state.variants_id,this.state.addon);
      }
  }

  select_addon = (id) => {
    if (this.state.addon.includes(id)) {
      var index = this.state.addon.indexOf(id);
      if (index > -1) {
        this.state.addon.splice(index, 1);
      }
    } else {
      this.state.addon.push(id);
    }
    this.setState({ addon: this.state.addon });
  };


  onCloseModal = () => {
    this.setState({ openModal: false });
  };

  render() {

    return (
      <>
                  <div className="col-lg-3 d-flex" onClick={()=>{this.add_cart(this.props.data)}} >
                    <div className="productset flex-fill">
                      <div className="productsetimg">
                        <img
                          src={this.props.data.product_img}
                          alt="img"
                          className="product_image"
                        />
                        {/* <h6>Qty: 5</h6> */}
                        <div className="check-product">
                          <i className="fa fa-check" />
                        </div>
                      </div>
                      <div className="productsetcontent">
                        <div>
                          <h4>{this.props.data.product_name}</h4>
                          <h6>    <BiRupee />{this.props.data.our_price}</h6>
                        </div>
                      </div>
                    </div>
                  </div>
              

        <Modal
          open={this.state.openModal}
          onClose={() => this.onCloseModal()}
          center
          showCloseIcon={true}
          classNames={{
            modal: "customModal",
          }}
        >
       
         <h5
                className="mb-2 fw-600 font-md"
                style={{
                  paddingLeft: "10px",
                  paddingBottom: "10px",
                  borderBottom: "1px solid #e0e0e0",
                }}
              >
                Customise as per your taste
              </h5>
              <div className="mx-2">
                {this.props.data.variants.length > 0 ? (
                  <>
                    <h5 className="title-color font-sm fw-600 text-align-center mt-3 mb-3">
                      Variant
                    </h5>
                    <RadioGroup
                      value={this.state.variants_id}
                      onChange={(value) => {
                        this.setState({ variants_id: value, count: 0 });
                        //this.setState({ variants_id: value });
                      }}
                    >
                      {this.props.data.variants.map((values) => {
                        return (
                          <RadioButton
                            value={values.id}
                            pointColor="#f3c783"
                            iconSize={20}
                            rootColor="#37474f"
                            iconInnerSize={10}
                            padding={10}
                            props={{
                              className: "radio-button",
                            }}
                          >
                            <div className="d-flex justify-content-between align-items-center radio_button_text">
                              <p>{values.variants_name}</p>
                              <div className="d-flex">
                                <p className="deleted-text p-0">
                                <BiRupee />{values.variants_price}
                                </p>
                                <p>
                                <BiRupee />{" "}
                                  {values.variants_discounted_price}
                                </p>
                              </div>
                            </div>
                          </RadioButton>
                        );
                      })}
                    </RadioGroup>
                  </>
                ) : (
                  <></>
                )}
                {this.props.data.addon_map.length > 0 ? (
                  <>
                    <h5 className="title-color font-sm fw-600 text-align-center mt-3 mb-3">
                      Addon
                    </h5>
                    {this.props.data.addon_map.map((values) => {
                      return (
                        <div className="d-flex align-items-center single_checkbox new_checkbox">
                          <input
                            type="checkbox"
                            id={values.id}
                            name="vehicle1"
                            value={values.id}
                            className="checkbox"
                            onChange={() => {
                              this.select_addon(values.id);
                            }}
                          />
                          <label
                            for={values.id}
                            className="checkbox_text d-flex justify-content-between align-items-center w-100"
                          >
                            <p>{values.addon_name}</p>
                            <p>
                            <BiRupee /> {values.addon_price}
                            </p>
                          </label>
                        </div>
                      );
                    })}
                  </>
                ) : (
                  <></>
                )}


                <a onClick={()=>{this.props.cart(this.props.data,this.state.variants_id,this.state.addon)}} class="btn btn-primary">Add to cart</a>
              </div>
              
  

        </Modal>
        </>
    );
  }
}

export default Pos;
