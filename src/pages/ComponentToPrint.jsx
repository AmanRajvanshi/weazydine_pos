import React from "react";


// Using a class component, everything works without issue
export class ComponentToPrint extends React.PureComponent {
  render() {
    return <div>My cool content here!</div>;
  }
}