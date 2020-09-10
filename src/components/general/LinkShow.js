import React, { Component } from "react";

import Button from 'react-bootstrap/Button';

export class LinkShow extends Component {

  componentWillMount() {
    this.setState({
      visible:false
    })
  }

  toggleVisibility() {
    this.setState({
      visible:!this.state.visible
    })
  }

  render() {
    if(!this.state.visible) {
      return (
        <Button className="p-0" variant="link" size="sm" onClick={() => this.toggleVisibility()}>
          {this.props.text}
        </Button>
      )
    } 
    return this.props.html
  }

}
