import React, { Component } from 'react';
import Header from '../othercomponent/Header';
import campaign from '../assets/images/campaign.png';
import Modal from 'react-responsive-modal';
import { Link } from 'react-router-dom';

export class CrmCampaigns extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openModal: false,
      selectedDiv: null,
    };
  }
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
                          this.setState({ openModal: true });
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
                  <button className="btn btn-primary me-2">
                    <h5>
                      Credit Balance : <strong>Rs. 3000</strong>
                    </h5>
                  </button>
                  <button className="btn btn-primary">
                    <h5>
                      Credits : <strong>Rs. 3000</strong>
                    </h5>
                  </button>
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
      </div>
    );
  }
}

export default CrmCampaigns;
