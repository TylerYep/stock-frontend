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
import { faHome, faEdit, faGlobeAfrica, faClock, faCode, faBookOpen, faThLarge, faFilePdf, faFileUpload, faQuestion, faCalendar, faEnvelope, faVideo, faBook, faAppleAlt } from '@fortawesome/free-solid-svg-icons'



import{CourseNav} from '../CourseNav.js'
import KarelImg from '../img/assn/karel.png'

export class Karel extends Component {

	render() {
		return (
			<div>
				<CourseNav userName={this.props.userName}/>
				{this.renderBody()}
			</div>
		)
	}

    renderOnlineIde() {
        return (
            <div id="ide">
             <h2>Online IDE</h2>
                <p>We recommend downloading Pycharm. If you have trouble, you should <b>not</b> let that stop you from making progress. More worlds are coming soon!</p>
                <div className="row">
                    <div className="col-sm-2 text-center"><a href="#/karel/assn1/tripple" target="_blank">
                        <FontAwesomeIcon icon={faCode} style={{
                                "fontSize": "5em",
                                "marginLeft":"0px"
                            }}/>
                        <br /><br />
                        <span style={{"margin-left":"0px"}}>Tripple</span></a>
                    </div>

                    <div className="col-sm-2 text-center"><a href="#/karel/assn1/arches" target="_blank">
                        <FontAwesomeIcon icon={faCode} style={{
                                "fontSize": "5em",
                                "marginLeft":"0px"
                            }}/>
                        <br /><br />
                        <span style={{"margin-left":"-10px"}}>Stone Mason</span></a>
                    </div>

                    <div className="col-sm-2 text-center"><a href="#/karel/assn1/midpoint" target="_blank">
                        <FontAwesomeIcon icon={faCode} style={{
                                "fontSize": "5em",
                                "marginLeft":"0px"
                            }}/>
                        <br /><br />
                        <span style={{"margin-left":"-5px"}}>(Optional) Midpoint</span></a>
                    </div>
                </div>
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
                        Assignment 1: Karel
                    </h1>
                    <p className="subtleHeading"><span className="sidebaricon glyphicon glyphicon-calendar"
                            aria-hidden="true"></span>Goal deadline: Wednesday, April 22nd, 11:59PM Anywhere on Earth
                    </p>

                </div>
                <hr />
                <div className="alert alert-info"><b>Submission:</b> Want to submit your assignment. Use one of the two buttons at the bottom of this page.
                </div>
                <div className="alert"></div>
            </div>
        </div>





        <div className="row">
            <div className="col-sm-12">
                <p>
                    <center>
                        <img src={KarelImg}></img>
                    </center>
                    <br /><br />
                </p>

                <div className="row">
                    <div className="col-sm-12">
                        <center>
                            <p style={{"textAlign":"center"}}>
                                <i>Your first assignment consists of three Karel programs.</i>

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
                        <p>

                            <strong>Note:</strong> You may only use <strong>concepts covered in the Karel
                                coursereader</strong> to solve these problems. In particular, you may not use Python
                            concepts you may have learned previously such as variables, parameters,
                            <code>return</code>, <code>break</code>, etc. If you have any questions about what
                            is ok/not ok to use, please feel free to ask on Ed.
                        </p>




                    </div>
                </div>


                <h2>Assignment Files</h2>
                <p>
                    <div className="row">
                        <div className="col-sm-2 text-center"><a target="_blank" href="//codeinplace2020.github.io/faqs/Assignment1.pdf">
                        	<FontAwesomeIcon icon={faFilePdf} style={{
                                "fontSize": "5em",
                                "marginLeft":"0px"
                            }}/>
                        	<br/><br/><span className="ml-0">Assignment
                                    Handout</span></a>
                        </div>
                        <div className="col-sm-2 text-center"><a target="_blank" href="https://compedu.stanford.edu/codeinplace/starterCode/Assignment1.zip">
                        <FontAwesomeIcon icon={faCode} aria-hidden="true" style={{
                                "fontSize": "5em",
                                "marginLeft":"0px"
                            }}/>
                        <br /><br /><span
                                    className="ml-0">Starter Code</span></a>
                        </div>

                    </div>
                    <br />
                    <br />
                    <div className="alert alert-info">
                        <b>Note:</b> Karel can be programmed either on your computer using an application like PyCharm, or it can be programmed in browser like we did for assignment 0.
                        We would like everyone to try and install PyCharm, it will help down the road. We will make the browser-based option available on Wednesday, April 15th, 11:50pm, Anywhere on earth. Happy coding!
                    </div>
                    <div className="alert alert-info">
                        <b>Note:</b> If you wrote a Karel program as an extension in <code>ExtensionKarel.py</code>
                        &nbsp; and made new Karel Worlds to run the program in, please submit the <code>.w</code>&nbsp; files
                        alongside your assignment code.
                    </div>


                    <br />
                </p>

                <h2>Resources</h2>
                <div className="row">
                    <div className="col-sm-2 text-center"><a href="#/handout/installingPyCharm.html" target="_blank">
                        <FontAwesomeIcon icon={faFilePdf} style={{
                                "fontSize": "5em",
                                "marginLeft":"0px"
                            }}/>
                        <br /><br />
                        <span style={{"margin-left":"0px"}}>Get PyCharm</span></a>
                    </div>

                    <div className="col-sm-2 text-center"><a href="#/handout/karelInPycharm.pdf" target="_blank">
                        <FontAwesomeIcon icon={faFilePdf} style={{
                                "fontSize": "5em",
                                "marginLeft":"0px"
                            }}/>
                        <br /><br />
                        <span style={{"margin-left":"-10px"}}>Using Karel in PyCharm</span></a>
                    </div>

                    <div className="col-sm-2 text-center"><a href="https://compedu.stanford.edu/karel-reader/docs/python/en/intro.html" target="_blank">
                        <FontAwesomeIcon icon={faBookOpen} style={{
                                "fontSize": "5em",
                                "marginLeft":"0px"
                            }}/>
                        <br /><br />
                        <span style={{"margin-left":"-5px"}}>Karel Reader</span></a>
                    </div>


                    </div>
                {this.renderOnlineIde()}
                <hr/>

                <h2>Submit</h2>

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
                <hr/>

            </div>
        </div>

    </div>
		)
	}

}