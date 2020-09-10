/* tslint:disable */
import React, { Component } from "react";
import firebase from "firebase";
import { useDebounce } from "use-debounce";
import { useAuthState } from "react-firebase-hooks/auth";
import { Container, Form } from "react-bootstrap";
import SplitPane from "react-split-pane";
import AceEditor from "react-ace";


import { translate } from "../../../minions/translator.js"
import Button from 'react-bootstrap/Button';

import history from '../../../history';
import Table from 'react-bootstrap/Table'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faEdit, faGlobeAfrica, faClock, faCheck, faCode,faHiking, faBookOpen, faThLarge, faFilePdf, faFileUpload, faQuestion, faCalendar, faEnvelope, faVideo, faBook, faAppleAlt } from '@fortawesome/free-solid-svg-icons'



import{CourseNav} from '../CourseNav.js'
import KhansoleImg from '../img/assn/khansole.png'

export class KhansoleAcademy extends Component {

	render() {
		return (
			<div>
				<CourseNav userName={this.props.userName}/>
				{this.renderBody()}
			</div>
		)
	}

    

	renderBody() {
		return (

	<div className="container container-course">
        <div className="row">
            <div className="col-sm-12">
                <div id="pageHeader">
                    <br />
                    <h1>
                        Assignment 2: KhansoleAcademy
                    </h1>
                    <p className="subtleHeading"><span className="sidebaricon glyphicon glyphicon-calendar"
                            aria-hidden="true"></span>Goal deadline: Friday, May 1st, 11:59PM Anywhere on Earth
                    </p>

                </div>
                <hr />
                
                <div className="alert"></div>
            </div>
        </div>





        <div className="row">
            <div className="col-sm-12">
                <p>
                    <center>
                        <img style={{"width":"100%"}}src={KhansoleImg}></img>
                    </center>
                    <br /><br />
                </p>

                <div className="row">
                    <div className="col-sm-12">
                        <center>
                            <p style={{"textAlign":"center"}}>
                                <i>Your second assignment consists of Console challenges.</i>

                            </p>
                        </center>
                        <h2>Getting Started</h2>
                        <p>
                            There is a starter project including all of these problems that you can access using a link
                            below. Once you have the starter code set up,
                            edit the program files so that the assignment actually does what it’s
                            supposed to do (see the assignment handout), which will involve a cycle of coding, testing,
                            and debugging until
                            everything works. The final step is to submit your assignment.
                        </p>
                        <p>
                            You should write the code for your solution on your own. 
                        </p>
                        




                    </div>
                </div>


                <h2>Assignment Files</h2>
                <p>
                    <div className="row">
                        <div className="col-sm-2 text-center"><a target="_blank" href="//codeinplace2020.github.io/faqs/Assignment2.pdf">
                        	<FontAwesomeIcon icon={faFilePdf} style={{
                                "fontSize": "5em",
                                "marginLeft":"0px"
                            }}/>
                        	<br/><br/><span className="ml-0">Assignment
                                    Handout</span></a>
                        </div>
                        <div className="col-sm-2 text-center"><a target="_blank" href="//codeinplace2020.github.io/faqs/Assignment2.zip">
                            <FontAwesomeIcon icon={faCode} aria-hidden="true" style={{
                                "fontSize": "5em",
                                "marginLeft":"0px"
                            }}/>
                            <br /><br /><span
                                    className="ml-0">Starter Code</span></a>
                        </div>
                        <div className="col-sm-2 text-center"><a target="_blank" href="https://us.edstem.org/courses/490/lessons/1135/slides/5433">
                            <FontAwesomeIcon icon={faCode} aria-hidden="true" style={{
                                "fontSize": "5em",
                                "marginLeft":"0px"
                            }}/>
                            <br /><br /><span
                                    className="ml-0">Online IDE</span></a>
                        </div>
                        <div className="col-sm-2 text-center"><a target="_blank" href="#/handout/submissionA2.html">
                            <FontAwesomeIcon icon={faCheck} aria-hidden="true" style={{
                                "fontSize": "5em",
                                "marginLeft":"0px"
                            }}/>
                            <br /><br /><span
                                    className="ml-0">Submit</span></a>
                        </div>

                    </div>
                    <br />
                    <br />
                    <div className="alert alert-primary">
                        <b>Note:</b> Python can be programmed either on your computer using an application like PyCharm, or it can be programmed in browser. 
                        Ed has an online IDE which is fantastic, and we are going to be using it as our online IDE of choice!
                    </div>
                    <div className="alert alert-info">
                        <b>Note:</b> If you write an extension, create a new file. Name it anything you like. If your extension builds off one of the base parts, please put the extension version in its own file.
                    </div>


                    <br />
                </p>

                <h2>Resources</h2>
                <div className="row">
                    

                    <div className="col-sm-2 text-center"><a href="#/example/index.html" >
                        <FontAwesomeIcon icon={faHiking} style={{
                                "fontSize": "5em",
                                "marginLeft":"0px"
                            }}/>
                        <br /><br />
                        <span style={{"margin-left":"-10px"}}>Worked Examples</span></a>
                    </div>

                    <div className="col-sm-2 text-center"><a href="https://codeinplace2020.github.io/pythonreader/en/intro/" target="_blank">
                        <FontAwesomeIcon icon={faBookOpen} style={{
                                "fontSize": "5em",
                                "marginLeft":"0px"
                            }}/>
                        <br /><br />
                        <span style={{"margin-left":"-5px"}}>Python Reader</span></a>
                    </div>


                    </div>
                <hr/>

                {/*<h2>Submit</h2>

                <div className="row">
                    <div className="col-sm-2 text-center"><a href="#/submissions" >
                        <FontAwesomeIcon icon={faFileUpload} style={{
                                "fontSize": "5em",
                                "marginLeft":"0px"
                            }}/>
                        <br /><br />
                        <span style={{"margin-left":"0px"}}>Upload and submit from my computer</span></a>
                    </div>
                    <div className="col-sm-2 text-center"><a href="#/submissions?include_ide_files=assn1" >
                        <FontAwesomeIcon icon={faFileUpload} style={{
                                "fontSize": "5em",
                                "marginLeft":"0px"
                            }}/>
                        <br /><br />
                        <span style={{"margin-left":"0px"}}>Submit my IDE code</span></a>
                    </div>
                </div>
                <hr/>*/}

            </div>
        </div>

    </div>
		)
	}

}