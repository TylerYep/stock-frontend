import React, { Component } from 'react';
import Navbar from 'react-bootstrap/Navbar'
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLevelUpAlt } from '@fortawesome/free-solid-svg-icons'


class Logo extends Component {

  render() {
    return (
      <Navbar.Brand href="#/splash" className="p-0" variant="dark">
        <img 
          className="homeNav-logo" 
          src={process.env.PUBLIC_URL + '/stanford.png'}
          alt="logo"
        />
        {/*CS106<span style={{fontSize:24}}>&forall;</span>*/}
        Application Home
        
        {/*this.renderBack()*/}
      </Navbar.Brand>
    )
  }

  renderBack() {

    if(this.hasBacklink()) {
      return (
        <a href={this.props.backLink}>
          <FontAwesomeIcon 
            icon={faLevelUpAlt}
            style={{
                'marginLeft':'10px',
                'marginBottom':'2px',
                'fontSize':'75%',
                'color':'white'
            }} 
          />  
        </a>
      )
    } else {
      return <div/>
    }
  }

  hasBacklink() {
    if(!('backLink' in this.props)) {
      return false
    }
    if(this.props.backLink == null) {
      return false
    }
    return true
  }

}


export default Logo
/**

        */