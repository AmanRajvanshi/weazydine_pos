import React, { Component } from "react";
import Header from "../othercomponent/Header";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import delete_icon from "../assets/images/icons/delete.svg";
import edit_icon from "../assets/images/icons/edit.svg";
import { AuthContext } from "../AuthContextProvider";
import { toast } from "react-toastify";
export class Categorylist extends Component {
  static contextType = AuthContext;
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      openedit: false,
      is_loding:true,
      category:[],
      new_category_name:"",
    };
  }

componentDidMount()
{
  this.fetchCategories ();
}

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
        this.setState({ is_loding: false });
        return json;
      })
      .catch((error) => console.error(error))
      .finally(() => {
     
      });
  };


  add = () => {
    if (this.state.new_category_name != "") {
        fetch(global.api + 'create_category_vendor', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': this.context.token
            },
            body: JSON.stringify({
                category_name: this.state.new_category_name,
                status: 'active'
            })
        }).then((response) => response.json())
            .then((json) => {
                // console.warn(json)
                if (!json.status) {
                    var msg = json.msg;
                    toast.error(msg);
                }
                else {
                  this.setState({ open: false,new_category_name:'' });
                  toast.success(json.msg)
                  this.fetchCategories();
                  

                }
                return json;
            }).catch((error) => {
                console.error(error);
            }).finally(() => {
                this.setState({ isloading: false })
            });

    }
    else {
        toast.error('Please add Category first!');
    }
}



edit =()=>{
  //   alert("sfghsdf")
    if(this.state.new_category_name!="")
    { 
      fetch(global.api+'edit_category', { 
          method: 'POST',
            headers: {    
                Accept: 'application/json',  
                  'Content-Type': 'application/json'  ,
                  'Authorization': this.context.token
                 }, 
                  body: JSON.stringify({   
                      name: this.state.new_category_name,
                      category_id:this.state.category_id,
                      status: this.state.status
                          })}).then((response) => response.json())
                          .then((json) => {
                              // console.warn(json)
                              if(!json.status)
                              {
                                  var msg=json.msg;
                                  toast.success(msg);
                              }
                              else{
                                this.setState({openedit: false,new_category_name:'' });
                                toast.success(json.msg)
                                this.fetchCategories();
                              
                              }
                             return json;    
                         }).catch((error) => {  
                                 console.error(error);   
                              }).finally(() => {
                                 this.setState({isloading:false})
                              });
      
    }
    else{
      toast.error('Please add Category first!');
    }
}

  render() {
    return (
      <>
        <div className="main-wrapper">
          <Header />

          <div className="page-wrapper">
            <div className="content">
              <div className="page-header">
                <div className="page-title">
                  <h4>Category List</h4>
                  <h6>Manage your categories</h6>
                </div>
                <div className="page-btn">
                  <a
                    className="btn btn-added"
                    onClick={() => {
                      this.setState({ open: true });
                    }}
                  >
                    <img
                      src="https://dreamspos.dreamguystech.com/html/template/assets/img/icons/plus.svg"
                      alt="img"
                      className="me-1"
                    />
                    Add New Category
                  </a>
                </div>
              </div>
              {
                (!this.state.is_loding) ? (
              
              <div className="card">
                {this.state.category.length>0?
                <div className="card-body">
                  <div className="table-responsive">
                    <table className="table  datanew">
                      <thead>
                        <tr>
                          <th>Category</th>
                          <th>Products</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {
                          this.state.category.map((item,index)=>(
                        <tr>
                          <td className="productimgname">
                            <a
                              href="javascript:void(0);"
                              className="product-img"
                            >
                              {/* <img
                                src="https://dreamspos.dreamguystech.com/html/template/assets/img/product/product1.jpg"
                                alt="product"
                              /> */}
                            </a>
                            <a href="javascript:void(0);">{item.name}</a>
                          </td>
                          <td>{item.products_count}</td>
                          <td>
                            <a
                              className="me-3"
                              onClick={() => {
                                this.setState({ openedit: true,category_id:item.id,new_category_name:item.name});
                              }}
                            >
                              <img src={edit_icon} alt="img" />
                            </a>
                            {/* <a
                              className="confirm-text"
                              href="javascript:void(0);"
                            >
                              <img src={delete_icon} alt="img" />
                            </a> */}
                          </td>
                        </tr>
                          ))
                        }

                      </tbody>
                    </table>
                  </div>
                </div>:
                <>No category Found</>
  }
              </div>
                )
                :
                <h2>Loading</h2>
                            }
            </div>
          </div>
        </div>
        <Modal
          open={this.state.open}
          onClose={() => this.setState({ open: false })}
          center
          classNames={{
            modal: "customModal",
          }}
        >
          <div className="content">
            <div className="page-header">
              <div className="page-title">
                <h4>Add Category</h4>
              </div>
            </div>
            <div className="card">
              <div className="card-body">
                <div className="row">
                  <div className="col-lg-12">
                    <div className="form-group">
                      <label>Category Name</label>
                      <input type="text" onChange={(e)=>{this.setState(
                        {new_category_name:e.target.value}
                      )}} />
                    </div>
                  </div>
                  <div className="col-lg-12 d-flex justify-content-end">
                    <a
                      href="javascript:void(0);"
                      onClick={()=>{this.add()}}
                      className="btn btn-submit me-2"
                    >
                      Add Category
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Modal>
        <Modal
          open={this.state.openedit}
          onClose={() => this.setState({ openedit: false })}
          center
          classNames={{
            modal: "customModal",
          }}
        >
          <div className="content">
            <div className="page-header">
              <div className="page-title">
                <h4>Edit Category</h4>
              </div>
            </div>
            <div className="card">
              <div className="card-body">
                <div className="row">
                  <div className="col-lg-12">
                    <div className="form-group">
                      <label>Category Name</label>
                      <input type="text" onChange={(e)=>{this.setState(
                        {new_category_name:e.target.value})}}
                        value={this.state.new_category_name}
                        />
                    </div>
                  </div>
                  <div className="col-lg-12 d-flex justify-content-end">
                    <a
                      href="javascript:void(0);"
                      onClick={()=>{this.edit()}}
                      className="btn btn-submit me-2"
                    >
                      Update Category
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Modal>
      </>
    );
  }
}

export default Categorylist;
