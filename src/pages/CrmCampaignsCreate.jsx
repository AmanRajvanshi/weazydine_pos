import React, { Component } from 'react';
import Header from '../othercomponent/Header';
import { Stepper, Step, StepLabel } from '@material-ui/core';
import { ReversedRadioButton, RadioGroup } from 'react-radio-buttons';

export class CrmCampaignsCreate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeStep: 0,
      completedSteps: [],
    };
  }

  handleNext = () => {
    this.setState((state) => ({
      activeStep: state.activeStep + 1,
      completedSteps: state.completedSteps.concat(state.activeStep),
    }));
  };

  handleBack = () => {
    this.setState((state) => ({
      activeStep: state.activeStep - 1,
      completedSteps: state.completedSteps.filter(
        (step) => step !== state.activeStep
      ),
    }));
  };

  render() {
    const { activeStep, completedSteps } = this.state;
    const steps = ['Select Message', 'Campaign Update', 'Final'];
    return (
      <div className="main-wrapper">
        <Header />
        <div className="page-wrapper">
          <div className="content">
            <div className="container">
              <div className="row">
                <div className="col-md-2">
                  <div class="sticky-container">
                    <div className="card">
                      <div className="card-body p-0">
                        <Stepper activeStep={activeStep} orientation="vertical">
                          {steps.map((label, index) => (
                            <Step
                              key={label}
                              completed={completedSteps.includes(index)}
                            >
                              <StepLabel>{label}</StepLabel>
                            </Step>
                          ))}
                        </Stepper>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-10">
                  <div className="card">
                    <div className="card-body">
                      {activeStep === 0 && (
                        <>
                          <div className="d-flex align-items-center justify-content-between mb-4">
                            <h5>Select Message</h5>
                            <button
                              className="btn btn-sm btn-primary"
                              onClick={this.handleNext}
                            >
                              Next
                            </button>
                          </div>
                          <RadioGroup onChange={this.onChange} vertical>
                            <ReversedRadioButton
                              pointColor="#5bc2c1"
                              iconSize={20}
                              rootColor="#37474f"
                              iconInnerSize={10}
                              padding={10}
                            >
                              Lorem, ipsum dolor sit amet consectetur
                              adipisicing elit. Labore, ut amet. Dolorem aut
                              quae est reprehenderit! Accusantium iste
                              assumenda, ut fugiat ipsa sunt numquam. Harum
                              veritatis modi nobis obcaecati ipsum?
                            </ReversedRadioButton>
                            <ReversedRadioButton
                              pointColor="#5bc2c1"
                              iconSize={20}
                              rootColor="#37474f"
                              iconInnerSize={10}
                              padding={10}
                            >
                              Lorem, ipsum dolor sit amet consectetur
                              adipisicing elit. Labore, ut amet. Dolorem aut
                              quae est reprehenderit! Accusantium iste
                              assumenda, ut fugiat ipsa sunt numquam. Harum
                              veritatis modi nobis obcaecati ipsum?
                            </ReversedRadioButton>
                            <ReversedRadioButton
                              pointColor="#5bc2c1"
                              iconSize={20}
                              rootColor="#37474f"
                              iconInnerSize={10}
                              padding={10}
                            >
                              Loremksfjdofsoiu230r92u3092ue, ipsum dolor sit amet consectetur
                              adipisicing elit. Labore, ut amet. Dolorem aut
                              quae est reprehenderit! Accusantium iste
                              assumenda, ut fugiat ipsa sunt numquam. Harum
                              veritatis modi nobis obcaecati ipsum?
                            </ReversedRadioButton>
                            <ReversedRadioButton
                              pointColor="#5bc2c1"
                              iconSize={20}
                              rootColor="#37474f"
                              iconInnerSize={10}
                              padding={10}
                            >
                              Lorem, ipsum dolor sit amet consectetur
                              adipisicing elit. Labore, ut amet. Dolorem aut
                              quae est reprehenderit! Accusantium iste
                              assumenda, ut fugiat ipsa sunt numquam. Harum
                              veritatis modi nobis obcaecati ipsum?
                            </ReversedRadioButton>
                            <ReversedRadioButton
                              pointColor="#5bc2c1"
                              iconSize={20}
                              rootColor="#37474f"
                              iconInnerSize={10}
                              padding={10}
                            >
                              Lorem, ipsum dolor sit amet consectetur
                              adipisicing elit. Labore, ut amet. Dolorem aut
                              quae est reprehenderit! Accusantium iste
                              assumenda, ut fugiat ipsa sunt numquam. Harum
                              veritatis modi nobis obcaecati ipsum?
                            </ReversedRadioButton>
                            <ReversedRadioButton
                              pointColor="#5bc2c1"
                              iconSize={20}
                              rootColor="#37474f"
                              iconInnerSize={10}
                              padding={10}
                            >
                              Lorem, ipsum dolor sit amet consectetur
                              adipisicing elit. Labore, ut amet. Dolorem aut
                              quae est reprehenderit! Accusantium iste
                              assumenda, ut fugiat ipsa sunt numquam. Harum
                              veritatis modi nobis obcaecati ipsum?
                            </ReversedRadioButton>
                            <ReversedRadioButton
                              pointColor="#5bc2c1"
                              iconSize={20}
                              rootColor="#37474f"
                              iconInnerSize={10}
                              padding={10}
                            >
                              Lorem, ipsum dolor sit amet consectetur
                              adipisicing elit. Labore, ut amet. Dolorem aut
                              quae est reprehenderit! Accusantium iste
                              assumenda, ut fugiat ipsa sunt numquam. Harum
                              veritatis modi nobis obcaecati ipsum?
                            </ReversedRadioButton>
                            <ReversedRadioButton
                              pointColor="#5bc2c1"
                              iconSize={20}
                              rootColor="#37474f"
                              iconInnerSize={10}
                              padding={10}
                            >
                              Lorem, ipsum dolor sit amet consectetur
                              adipisicing elit. Labore, ut amet. Dolorem aut
                              quae est reprehenderit! Accusantium iste
                              assumenda, ut fugiat ipsa sunt numquam. Harum
                              veritatis modi nobis obcaecati ipsum?
                            </ReversedRadioButton>
                            <ReversedRadioButton
                              pointColor="#5bc2c1"
                              iconSize={20}
                              rootColor="#37474f"
                              iconInnerSize={10}
                              padding={10}
                            >
                              Lorem, ipsum dolor sit amet consectetur
                              adipisicing elit. Labore, ut amet. Dolorem aut
                              quae est reprehenderit! Accusantium iste
                              assumenda, ut fugiat ipsa sunt numquam. Harum
                              veritatis modi nobis obcaecati ipsum?
                            </ReversedRadioButton>
                            <ReversedRadioButton
                              pointColor="#5bc2c1"
                              iconSize={20}
                              rootColor="#37474f"
                              iconInnerSize={10}
                              padding={10}
                            >
                              Lorem, ipsum dolor sit amet consectetur
                              adipisicing elit. Labore, ut amet. Dolorem aut
                              quae est reprehenderit! Accusantium iste
                              assumenda, ut fugiat ipsa sunt numquam. Harum
                              veritatis modi nobis obcaecati ipsum?
                            </ReversedRadioButton>
                            <ReversedRadioButton
                              pointColor="#5bc2c1"
                              iconSize={20}
                              rootColor="#37474f"
                              iconInnerSize={10}
                              padding={10}
                            >
                              Lorem, ipsum dolor sit amet consectetur
                              adipisicing elit. Labore, ut amet. Dolorem aut
                              quae est reprehenderit! Accusantium iste
                              assumenda, ut fugiat ipsa sunt numquam. Harum
                              veritatis modi nobis obcaecati ipsum?
                            </ReversedRadioButton>
                            <ReversedRadioButton
                              pointColor="#5bc2c1"
                              iconSize={20}
                              rootColor="#37474f"
                              iconInnerSize={10}
                              padding={10}
                            >
                              Lorem, ipsum dolor sit amet consectetur
                              adipisicing elit. Labore, ut amet. Dolorem aut
                              quae est reprehenderit! Accusantium iste
                              assumenda, ut fugiat ipsa sunt numquam. Harum
                              veritatis modi nobis obcaecati ipsum?
                            </ReversedRadioButton>
                          </RadioGroup>
                        </>
                      )}
                      {activeStep === 1 && (
                        <>
                          <div className="d-flex align-items-center justify-content-between mb-4">
                            <h5>Update Campaign</h5>
                            <button
                              className="btn btn-sm btn-primary"
                              onClick={this.handleNext}
                            >
                              Next
                            </button>
                          </div>
                          <div className="row">
                            <div className="form-group">
                              <label htmlFor="name">
                                Enter The Name of Campaign
                                <span className="text-danger">*</span>
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                id="name"
                                placeholder="Enter name"
                              />
                            </div>
                            <div className="d-flex align-items-center justify-content-end mb-4">
                              <button className="btn btn-sm btn-primary">
                                Submit
                              </button>
                            </div>
                          </div>
                        </>
                      )}
                      {activeStep === 2 && (
                        <div>
                          Content for step 3
                          <button onClick={this.handleNext}>Next</button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CrmCampaignsCreate;
