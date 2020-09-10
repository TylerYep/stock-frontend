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
import FinalProjectImg from '../img/assn/finalProject.png'

export class FinalProject extends Component {

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
                        Final Project
                    </h1>
                    <p className="subtleHeading"><span className="sidebaricon glyphicon glyphicon-calendar"
                            aria-hidden="true"></span>Goal deadline: Monday, May 25th, 11:59PM Anywhere on Earth. Submit by May 29th to get on the public website.
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
                        <img style={{"width":"100%", 'maxWidth':800}}src={FinalProjectImg}></img>
                    </center>
                    <br /><br />
                </p>

                <div className="row">
                    <div className="col-sm-12">
                        <center>
                            <p style={{"textAlign":"center"}}>
                                <i>Your final project is a chance to make any interesting application you would like.</i>

                            </p>
                        </center>
                        <h2>Guidelines</h2>
                        <p>
                            Your project could be small and humble or big and expansive. Both are great. All that we care about is that you 
                            make one thing that is yours. Examples of great projects could be: a word game on the console,
                            a new image algorithm or filter of your design. It could be a datascience challenge where you explore data (perhaps even the <a href="https://github.com/CSSEGISandData/COVID-19">covid19 data</a>)
                             or even a game or movie using the concepts we taught in graphics and <a href="https://www.youtube.com/watch">animation</a>.
                        </p>
                        <p>
                            Please ask for help on Ed if you have trouble (1) deciding on a good project, (2) getting started, (3) conceptual challenges. We are all
                            one big team and we want to support one another.
                        </p>
                        <p>There are two deadlines. Submit by Monday May 25th to have your program viewed by course staff. Submit by Friday May 29th to get your submission
                        put on a public facing website. Your "deliverable" will be a submission of a short video capturing your program running. More details to be announced closer to the deadlines.</p>
                        




                    </div>
                </div>

                

                


                <h2>Assignment Files</h2>
                <p>
                    <div className="row">
                        <div className="col-sm-2 text-center"><a target="_blank" href="//codeinplace2020.github.io/faqs/FinalProject.pdf">
                        	<FontAwesomeIcon icon={faFilePdf} style={{
                                "fontSize": "5em",
                                "marginLeft":"0px"
                            }}/>
                        	<br/><br/><span className="ml-0">Assignment Handout</span></a>
                        </div>
                        <div className="col-sm-2 text-center"><a href="//codeinplace2020.github.io/faqs/FinalProject.zip">
                            <FontAwesomeIcon icon={faCode} aria-hidden="true" style={{
                                "fontSize": "5em",
                                "marginLeft":"0px"
                            }}/>
                            <br /><br /><span
                                    className="ml-0">Blank PyCharm Project</span></a>
                        </div>
                        <div className="col-sm-2 text-center"><a target="_blank" href="https://us.edstem.org/courses/490/lessons/1291/slides/6802">
                            <FontAwesomeIcon icon={faCode} aria-hidden="true" style={{
                                "fontSize": "5em",
                                "marginLeft":"0px"
                            }}/>
                            <br /><br /><span
                                    className="ml-0">Blank Online IDE Project</span></a>
                        </div>
                       {/*<div className="col-sm-2 text-center"><a target="_blank" href="#/handout/submissionA3.html">
                            <FontAwesomeIcon icon={faCheck} aria-hidden="true" style={{
                                "fontSize": "5em",
                                "marginLeft":"0px"
                            }}/>
                            <br /><br /><span
                                    className="ml-0">Submit</span></a>
                        </div>*/}

                    </div>
                    <br />
                </p>

                <div className="alert alert-primary">
                        <b>Standard projects:</b> We will be releasing a set of standard projects before next Monday. Even if you are planning to
                        do a standard project, we challenge you to try brainstorming between now and then.
                    </div>

                <h2>Standard Projects</h2>
                <p>
                    <div className="row">
                        <div className="col-sm-2 text-center"><a target="_blank" href="#/assignment/brickBreaker">
                            <FontAwesomeIcon icon={faFilePdf} style={{
                                "fontSize": "5em",
                                "marginLeft":"0px"
                            }}/>
                            <br/><br/><span className="ml-0">BrickBreaker Handout</span></a>
                        </div>
                        <div className="col-sm-2 text-center"><a href="//codeinplace2020.github.io/faqs/BrickBreaker.zip">
                            <FontAwesomeIcon icon={faCode} aria-hidden="true" style={{
                                "fontSize": "5em",
                                "marginLeft":"0px"
                            }}/>
                            <br /><br /><span
                                    className="ml-0">BrickBreaker Starter Code</span></a>
                        </div>
                        <div className="col-sm-2 text-center"><a target="_blank" href="//codeinplace2020.github.io/faqs/WordGuessing.pdf">
                            <FontAwesomeIcon icon={faFilePdf} aria-hidden="true" style={{
                                "fontSize": "5em",
                                "marginLeft":"0px"
                            }}/>
                            <br /><br /><span
                                    className="ml-0">WordGuessing Handout</span></a>
                        </div>
                        <div className="col-sm-2 text-center"><a href="//codeinplace2020.github.io/faqs/WordGuess.zip">
                            <FontAwesomeIcon icon={faCode} aria-hidden="true" style={{
                                "fontSize": "5em",
                                "marginLeft":"0px"
                            }}/>
                            <br /><br /><span
                                    className="ml-0">WordGuessing Starter Code</span></a>
                        </div>
                        <div className="col-sm-2 text-center"><a href="//us.edstem.org/courses/490/lessons/1299/slides/6853">
                            <FontAwesomeIcon icon={faCode} aria-hidden="true" style={{
                                "fontSize": "5em",
                                "marginLeft":"0px"
                            }}/>
                            <br /><br /><span
                                    className="ml-0">WordGuessing Online IDE</span></a>
                        </div>
                       {/*<div className="col-sm-2 text-center"><a target="_blank" href="#/handout/submissionA3.html">
                            <FontAwesomeIcon icon={faCheck} aria-hidden="true" style={{
                                "fontSize": "5em",
                                "marginLeft":"0px"
                            }}/>
                            <br /><br /><span
                                    className="ml-0">Submit</span></a>
                        </div>*/}

                    </div>
                    <br />
                </p>

                <h2>Resources</h2>
                <div className="row">

                    <div className="col-sm-2 text-center"><a href="//codeinplace2020.github.io/faqs/imageReference.pdf" target="_blank">
                        <FontAwesomeIcon icon={faBookOpen} style={{
                                "fontSize": "5em",
                                "marginLeft":"0px"
                            }}/>
                        <br /><br />
                        <span style={{"margin-left":"-5px"}}>Images Reference</span></a>
                    </div>

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
                    <br/><br/>
                    <div className="alert alert-primary">
                        <b>Note:</b> You can use any IDE that you like, PyCharm or Ed. Note that if you would like to 
                        make a graphical final project, you should use PyCharm. If you need an online IDE for a graphics program there are not
                        very many good solutions -- but you might want to consider repl.
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