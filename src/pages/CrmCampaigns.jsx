import React, { Component } from 'react';
import logo from '../assets/images/logos/main_logo_black.png';
import Header from '../othercomponent/Header';
import campaign from '../assets/images/campaign.png';
import Modal from 'react-responsive-modal';
import { Link } from 'react-router-dom';
import { AuthContext } from '../AuthContextProvider';
import { toast } from 'react-toastify';

export class CrmCampaigns extends Component {
  static contextType = AuthContext;
  constructor(props) {
    super(props);
    this.state = {
      inVoiceModal: false,
      openModal: false,
      selectedDiv: null,
      weazy_credits: 0,
      buyCreditsModal: false,
      creditsAmount: '',
      buy_credit_loader: false,
      transaction_id: '',
      transaction_amount: '',
      tax_amount: '',
      order_amount: '',
    };
  }

  componentDidMount() {
    this.setState({ weazy_credits: this.context.weazy_credits });
  }

  buy_credits = () => {
    this.setState({ buy_credit_loader: true });
    fetch(global.api + 'buy_credits_initiate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Application: 'application/json',
        Authorization: this.context.token,
      },
      body: JSON.stringify({
        credits: this.state.creditsAmount,
      }),
    })
      .then((response) => response.json())
      .then((json) => {
        if (json.status) {
          this.setState({
            buyCreditsModal: false,
            inVoiceModal: true,
            transaction_id: json.txn_id,
            transaction_amount: json.txn_amount,
            tax_amount: json.tax,
            order_amount: json.order_amount,
          });
        } else {
          toast.error(json.message);
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      })
      .finally(() => {
        this.setState({ buy_credit_loader: false });
      });
  };

  render() {
    return (
      <div className="main-wrapper">
        <Header />
        <div className="page-wrapper">
          <div className="content">
            <div className="row">
              <div className="col-md-12">
                <div className="crm_campaigns_main_div_color">
                  <div className="row h-100">
                    <div className="col-md-8 crm_campaigns_main_div h-100">
                      <h3>Launch a one-click marketing campaign</h3>
                      <h4>
                        Reach out to customers and promote your products and
                        offers to them.Launch SMS & WhatsApp marketing campaigns
                        and target your customers using customizable templates
                        to grow your business.
                      </h4>
                      <div
                        className="btn btn-primary btn-sm"
                        onClick={() => {
                          if (this.state.weazy_credits > 0) {
                            this.setState({ openModal: true });
                          } else {
                            this.setState({ buyCreditsModal: true });
                            return;
                          }
                        }}
                      >
                        Create your first Campaign
                      </div>
                    </div>
                    <div className="col-md-4">
                      <img src={campaign} alt="" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row mt-4 pt-4">
              <div className="d-flex align-items-center justify-content-between">
                <h3>Overview</h3>
                <div>
                  {this.state.weazy_credits > 0 ? (
                    <button className="btn btn-primary me-2">
                      <h5>
                        Credit Balance :{' '}
                        <strong>{this.state.weazy_credits}</strong>
                      </h5>
                    </button>
                  ) : (
                    <button className="btn btn-danger me-2">
                      <h5>Out of Credits</h5>
                    </button>
                  )}
                </div>
              </div>
              <div className="crm_campaigns_column">
                <div className="crm_campaigns_column_div">
                  <h3>ORDERS FROM MARKETING</h3>
                  <h4>0</h4>
                </div>
              </div>
              <div className="crm_campaigns_column">
                <div className="crm_campaigns_column_div">
                  <h3>SALES FROM MARKETING</h3>
                  <h4>0</h4>
                </div>
              </div>
              <div className="crm_campaigns_column">
                <div className="crm_campaigns_column_div">
                  <h3>MARKETING COST</h3>
                  <h4>0</h4>
                </div>
              </div>
              <div className="crm_campaigns_column">
                <div className="crm_campaigns_column_div">
                  <h3>SMS MESSAGES SENT</h3>
                  <h4>0</h4>
                </div>
              </div>
              <div className="crm_campaigns_column">
                <div className="crm_campaigns_column_div">
                  <h3>WHATSAPP SENT</h3>
                  <h4>0</h4>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Modal
          open={this.state.openModal}
          onClose={() => this.setState({ openModal: false })}
          center
          classNames={{
            modal: 'customModal',
          }}
          animationDuration={800}
        >
          <div className="container">
            <h4>Choose a Service</h4>
            <div className="row">
              <div className="col-md-4">
                <div
                  className={
                    this.state.selectedDiv === 'sms'
                      ? 'campaign_social_media_boxes active'
                      : 'campaign_social_media_boxes'
                  }
                  onClick={() => this.setState({ selectedDiv: 'sms' })}
                >
                  <i className="fa-solid fa-message campaign_social_media_icon"></i>
                  <h5>SMS</h5>
                </div>
              </div>
              <div className="col-md-4">
                <div
                  className={
                    this.state.selectedDiv === 'whatsapp'
                      ? 'campaign_social_media_boxes active'
                      : 'campaign_social_media_boxes'
                  }
                  onClick={() => this.setState({ selectedDiv: 'whatsapp' })}
                >
                  <i className="fa-brands fa-whatsapp campaign_social_media_icon"></i>
                  <h5>WhatsApp</h5>
                </div>
              </div>
              <div className="col-md-4">
                <div
                  className={
                    this.state.selectedDiv === 'email'
                      ? 'campaign_social_media_boxes active'
                      : 'campaign_social_media_boxes'
                  }
                  onClick={() => this.setState({ selectedDiv: 'email' })}
                >
                  <i className="fa-solid fa-envelope campaign_social_media_icon"></i>
                  <h5>Email</h5>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12 d-flex justify-content-end align-items-center">
                <Link to="/crmcampaignscreate">
                  <button className="btn btn-primary btn-sm">Go Ahead</button>
                </Link>
              </div>
            </div>
          </div>
        </Modal>
        <Modal
          open={this.state.buyCreditsModal}
          center
          onClose={() => this.setState({ buyCreditsModal: false })}
          classNames={{
            modal: 'customModal',
          }}
        >
          <div className="container">
            <h4>Buy Credits</h4>
            <div className="row my-4">
              <div className="form-group">
                <label htmlFor="exampleInputEmail1">
                  Enter Credit Amount
                  <span className="text-muted mx-2">
                    1 Rs. is equal to 1 Credit.
                  </span>
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  placeholder="Enter Credit Amount"
                  value={this.state.creditsAmount}
                  onChange={(e) =>
                    this.setState({ creditsAmount: e.target.value })
                  }
                />
                <small id="emailHelp" className="form-text text-muted">
                  Minimum amount should be 100
                </small>
              </div>
              <div className="col-md-12 d-flex justify-content-end align-items-center">
                {this.state.buy_credit_loader ? (
                  <button
                    className="btn btn-primary btn-sm me-2"
                    style={{
                      pointerEvents: 'none',
                      opacity: '0.8',
                    }}
                  >
                    <span
                      class="spinner-border spinner-border-sm me-2"
                      role="status"
                    ></span>
                    Please Wait...
                  </button>
                ) : (
                  <button
                    className="btn btn-primary btn-sm me-2"
                    onClick={() => {
                      if (this.state.creditsAmount >= 100) {
                        this.buy_credits();
                      } else {
                        toast.error('Minimum amount should be 100');
                      }
                    }}
                  >
                    Buy Now
                  </button>
                )}
              </div>
              <div
                className="col-md-4"
                onClick={() => {
                  this.setState({ creditsAmount: 1000 });
                }}
              >
                <div className="buy_credits_box">
                  <h5>1000 Credits</h5>
                  <h6>₹ 1000</h6>
                </div>
              </div>
              <div
                className="col-md-4"
                onClick={() => {
                  this.setState({ creditsAmount: 5000 });
                }}
              >
                <div className="buy_credits_box">
                  <h5>5000 Credits</h5>
                  <h6>₹ 5000</h6>
                </div>
              </div>
              <div
                className="col-md-4"
                onClick={() => {
                  this.setState({ creditsAmount: 10000 });
                }}
              >
                <div className="buy_credits_box">
                  <h5>10000 Credits</h5>
                  <h6>₹ 10000</h6>
                </div>
              </div>
            </div>
          </div>
        </Modal>
        <Modal
          open={this.state.inVoiceModal}
          onClose={() => this.setState({ inVoiceModal: false })}
          center
          classNames={{ modal: 'customModal' }}
        >
          <div
            className="container"
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <h3 className="my-4">Order Details</h3>
            <div className="row">
              <div className="col-md-12 d-flex align-items-center justify-content-around my-2">
                <h5>Order Id</h5>
                <h6>{this.state.transaction_id}</h6>
              </div>
              <div className="col-md-12 d-flex align-items-center justify-content-around my-2">
                <h5>Order Amount</h5>
                <h6>₹ {this.state.order_amount}</h6>
              </div>
              <div className="col-md-12 d-flex align-items-center justify-content-around my-2">
                <h5>
                  G.S.T (<span className="text-muted">18%</span>)
                </h5>
                <h6>₹ {this.state.tax_amount}</h6>
              </div>
              <hr />
              <div className="col-md-12 d-flex align-items-center justify-content-around mb-2">
                <h5>Final Amount</h5>
                <h6>₹ {this.state.transaction_amount}</h6>
              </div>
              <div className="d-flex align-items-center justify-content-center my-2">
                <button className="btn btn-primary btn-sm w-75">
                  Initiate Transaction
                </button>
              </div>
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}

export default CrmCampaigns;
