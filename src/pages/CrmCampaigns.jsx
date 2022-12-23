import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../othercomponent/Header';
import { BiRupee } from 'react-icons/bi';
import { Bars } from 'react-loader-spinner';
import { AuthContext } from '../AuthContextProvider';
import moment from 'moment';
import no_order from '../assets/images/no_orders.webp';
import DateRangePicker from '@wojtekmaj/react-daterange-picker';
import Countdown from 'react-countdown';
import coming_soon from '../assets/images/coming_soon.png';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { Tooltip as ReactTooltip } from 'react-tooltip';
import campaign from '../assets/images/campaign.png';

export class CrmCampaigns extends Component {
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
                      <div className="btn btn-primary btn-sm">
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
                <button className="btn btn-primary">
                  <h5>
                    Credits : <strong>Rs. 3000</strong>
                  </h5>
                </button>
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
      </div>
    );
  }
}

export default CrmCampaigns;
