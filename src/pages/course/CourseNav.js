/* tslint:disable */
import React, { Component } from "react";
import firebase from "firebase";
import { useDebounce } from "use-debounce";
import { useAuthState } from "react-firebase-hooks/auth";
import { Container, Form } from "react-bootstrap";
import SplitPane from "react-split-pane";
import AceEditor from "react-ace";

import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'


import { translate } from "../../minions/translator.js"
import Button from 'react-bootstrap/Button';

import history from '../../history';

import Swal from 'sweetalert2'
import Iframe from 'react-iframe'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faThLarge, faQuestion, faUser, faCalendar, faEnvelope, faVideo, faBook } from '@fortawesome/free-solid-svg-icons'

import {isMobileOnly} from "react-device-detect";

import "brace/mode/json";
import "brace/mode/java";
import "brace/mode/html";
import "brace/mode/python";
import "brace/theme/eclipse.js";

import Logo from './img/logo.gif'
import Mehran from './img/people/mehran-sq.jpg'
import Piech from './img/people/piech-sq.jpg'
import EdIcon from './img/icons/ed.svg'

export class CourseNav extends Component {

	getFirstName() {
		return this.props.userName.split(' ')[0]
	}

	getUserIcon() {
		return  <span className="nav-icon"><FontAwesomeIcon  icon={faUser} /> {this.getFirstName()}</span>
	}

	render() {

		let viewButtonTxt = this.props.isSlRoleView ? 'As Student' : 'As SL'
		let viewButton = this.props.isSL ? (
			<Nav.Link onClick = {() => this.props.toggleRoleView()}className="nav-icon">
				{viewButtonTxt}
			</Nav.Link>
		) : <span />
		return (
			<Navbar  collapseOnSelect expand="lg" bg="dark" variant="dark">
				<div className=" container container-course " >
				  <Navbar.Brand href="#/course">Code in Place</Navbar.Brand>
				  <Navbar.Toggle aria-controls="responsive-navbar-nav" />
				  <Navbar.Collapse id="responsive-navbar-nav">
				    <Nav className="mr-auto">
				      <NavDropdown title="Lectures" id="collasible-nav-dropdown">
				        <NavDropdown.Item href="#/lectures">1 - Welcome</NavDropdown.Item>
				        <NavDropdown.Item href="#/lectures">2 - Control Flow</NavDropdown.Item>
				        <NavDropdown.Item href="#/lectures">3 - Decomposition</NavDropdown.Item>
				        <NavDropdown.Item href="#/lectures">4 - Variables</NavDropdown.Item>
				        <NavDropdown.Item href="#/lectures">5 - Expressions</NavDropdown.Item>
				        <NavDropdown.Item href="#/lectures">6 - Control Flow Revisited</NavDropdown.Item>
				        <NavDropdown.Item href="#/lectures">7 - Functions Revisited</NavDropdown.Item>
				        <NavDropdown.Item href="#/lectures">8 - Functions More Practice</NavDropdown.Item>
				        <NavDropdown.Item href="#/lectures">9 - Images</NavDropdown.Item>
				        <NavDropdown.Item href="#/lectures">Diagnostic Day</NavDropdown.Item>

				        <NavDropdown.Item href="#/lectures">10 - Graphics</NavDropdown.Item>
				        <NavDropdown.Item href="#/lectures">11 - Animation</NavDropdown.Item>
				        <NavDropdown.Item href="#/lectures">12 - Lists</NavDropdown.Item>
				         <NavDropdown.Item href="#/lectures">13 - Text Processing</NavDropdown.Item>
				         <NavDropdown.Item href="#/lectures">14 - Dictionaries</NavDropdown.Item>
				      </NavDropdown>
				      <NavDropdown title="Assignments" id="collasible-nav-dropdown">
				        <NavDropdown.Item href="#/assignment/karel">1 - Karel</NavDropdown.Item>
				        <NavDropdown.Item href="#/assignment/khansole">2 - Khansole Academy</NavDropdown.Item>
				        <NavDropdown.Item href="#/assignment/images">3 - Images</NavDropdown.Item>
				        <NavDropdown.Item href="#/assignment/finalProject">Final Project</NavDropdown.Item>
				        <hr />
				        <NavDropdown.Item href="https://us.edstem.org/courses/490/lessons/1198/slides/6432">Diagnostic</NavDropdown.Item>
				      </NavDropdown>

				      <NavDropdown title="Sections" id="collasible-nav-dropdown">
				        <NavDropdown.Item target="_blank" href="//codeinplace2020.github.io/faqs/section1.pdf">Section 1 - Handout</NavDropdown.Item>
				         <NavDropdown.Item href="#/karel/section1/hospital">Section 1 - IDE</NavDropdown.Item>
				          <NavDropdown.Item target="_blank" href="https://youtu.be/VB_giRK51zU">Section 1 - Recorded</NavDropdown.Item>
				          <hr/>
				          <NavDropdown.Item target="_blank" href="//codeinplace2020.github.io/faqs/section2.pdf">Section 2 - Handout</NavDropdown.Item>
				          <NavDropdown.Item href="https://us.edstem.org/courses/490/lessons/1134/slides/5430">Section 2 - IDE</NavDropdown.Item>
				          <NavDropdown.Item target="_blank"  href="//youtu.be/BslV7xiE4lw">Section 2 - Recorded</NavDropdown.Item>
				          <hr/>
				          <NavDropdown.Item><i>There are three versions of this weeks section!</i></NavDropdown.Item>
				          <NavDropdown.Item target="_blank" href="//codeinplace2020.github.io/faqs/section3-v2.pdf">Section 3 - New</NavDropdown.Item>
				          <NavDropdown.Item target="_blank" href="//codeinplace2020.github.io/faqs/section3.pdf">Section 3 - Origial</NavDropdown.Item>
				          <NavDropdown.Item target="_blank" href="//codeinplace2020.github.io/faqs/section3-alt.pdf">Section 3 - Animal</NavDropdown.Item>
				          <NavDropdown.Item href="https://us.edstem.org/courses/490/lessons/1186/slides/5906">Section 3 - IDE</NavDropdown.Item>
				          <NavDropdown.Item target="_blank"  href="//www.youtube.com/watch?v=vm5lanrmgyY">Section 3 - Recorded</NavDropdown.Item>
				          <hr/>
				          <NavDropdown.Item target="_blank" href="//codeinplace2020.github.io/faqs/section4.pdf">Section 4 - Handout</NavDropdown.Item>
				          <NavDropdown.Item href="https://us.edstem.org/courses/490/lessons/1233/slides/6389">Section 4 - IDE</NavDropdown.Item>
				          <NavDropdown.Item target="_blank" href="//www.youtube.com/watch?v=G7T8dcfgzFg&feature=youtu.be">Section 4 - Recorded</NavDropdown.Item>
				          <hr/>
				          <NavDropdown.Item target="_blank" href="//codeinplace2020.github.io/faqs/section5.pdf">Section 5 - Handout</NavDropdown.Item>
				          <NavDropdown.Item href="https://us.edstem.org/courses/490/lessons/1286/slides/6780">Section 5 - IDE</NavDropdown.Item>
				          <NavDropdown.Item target="_blank" href="//youtu.be/Y66ydtZDEmo">Section 5 - Recorded</NavDropdown.Item>
				      </NavDropdown>
				      <NavDropdown title="Handouts" id="collasible-nav-dropdown">
				     	<NavDropdown.Item target="_blank" href="//compedu.stanford.edu/karel-reader/docs/python/en/intro.html">Karel Reader</NavDropdown.Item>
				     	<NavDropdown.Item target="_blank" href="//codeinplace2020.github.io/pythonreader/en/intro/">Python Reader</NavDropdown.Item>
				     	 <NavDropdown.Item target="_blank" href="//codeinplace2020.github.io/faqs/imageReference.pdf">Image Reference</NavDropdown.Item>
				     	 <NavDropdown.Item target="_blank" href="#/handout/graphicsReference.html">Graphics Reference</NavDropdown.Item>
				     	<hr />
				        <NavDropdown.Item href="#/handout/info.html">General Info</NavDropdown.Item>
				        <NavDropdown.Item href="#/handout/coursefaqs.html">Course FAQs</NavDropdown.Item>
				        <NavDropdown.Item href="#/handout/installingPyCharm.html">Installing PyCharm</NavDropdown.Item>
				        <NavDropdown.Item href="#/handout/karelInPycharm.pdf">Karel in PyCharm</NavDropdown.Item>
				        <NavDropdown.Item href="#/handout/sectionwhattoexpect.html">Section Info</NavDropdown.Item>
				        <NavDropdown.Item target="_blank" href="//codeinplace2020.github.io/faqs/studentZoomGuide.pdf">Zoom Guide</NavDropdown.Item>
				        <NavDropdown.Item href="#/handout/submissionInstructions.html">Submission Assn1</NavDropdown.Item>
				        <NavDropdown.Item href="#/handout/submissionA2.html">Submission Assn2</NavDropdown.Item>
				        <NavDropdown.Item href="#/handout/submissionA3.html">Submission Assn3</NavDropdown.Item>

				      </NavDropdown>
				      <NavDropdown title="Examples" id="collasible-nav-dropdown">

				        <NavDropdown.Item href="#/example/am_i_18">Can Vote?</NavDropdown.Item>
				        <NavDropdown.Item href="#/example/how-much-TP">How Much TP?</NavDropdown.Item>
				        <NavDropdown.Item href="#/example/leap-year">Leap Year</NavDropdown.Item>
				        <NavDropdown.Item href="#/example/emc2-console">E = MC^2</NavDropdown.Item>
				        <NavDropdown.Item href="#/example/temperature_convertor">Temperature Converter</NavDropdown.Item>
				        <NavDropdown.Item href="#/example/triangle-calculator">Triangles</NavDropdown.Item>
				        <NavDropdown.Item href="#/example/quadratic_formula">Quadratic Formula</NavDropdown.Item>
				        <hr/>
				        <NavDropdown.Item href="#/example/greenscreen">Greenscreen</NavDropdown.Item>
				        <NavDropdown.Item href="#/example/mirror">Mirror</NavDropdown.Item>
				        <NavDropdown.Item href="#/example/pencil_sketch">Pencil Sketch</NavDropdown.Item>
				        <hr/>
				        <NavDropdown.Item href="#/example/programming-is-awesome">Programming is Awesome</NavDropdown.Item>
				        <hr/>
				        <NavDropdown.Item href="#/example/index.html">Many more!</NavDropdown.Item>
				      </NavDropdown>
				    </Nav>
				    <Nav>
				      {viewButton}
				      <Nav.Link target="_blank" href="https://us.edstem.org/join/5BjBhN" className="nav-icon">
				     		<img src={EdIcon} style={{width:'28px'}} alt="icon"></img>
				      </Nav.Link>
				      <NavDropdown title={this.getUserIcon()} id="collasible-nav-dropdown">
				      {/*<NavDropdown.Item href="#/sl/sectiontime">Edit Section</NavDropdown.Item>*/}
				      	<NavDropdown.Item onClick={() => firebase.auth().signOut()}>Sign Out</NavDropdown.Item>
				      </NavDropdown>

				      <Nav.Link href="#/course/schedule" className="nav-icon">
				        <FontAwesomeIcon  icon={faThLarge} /> Schedule
				      </Nav.Link>
				    </Nav>
				  </Navbar.Collapse>
				</div>
			</Navbar>
		)
	}
}