import React, { Component } from 'react';
import Header from '../othercomponent/Header';

export class KitchenProducts extends Component {
  render() {
    return (
      <>
        <div className="main-wrappers">
          <Header />
          <div className="page-wrapper">
            <div className="content">
              <div className="page-header">
                <div className="page-title">
                  <h4>Kitchen Products</h4>
                </div>
              </div>
              <div className="row">
                <div className="col-lg-2 col-sm-6 col-12">
                  <div className={'dash-count1'}>
                    <p>aa</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default KitchenProducts;
