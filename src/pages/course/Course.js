/* tslint:disable */
import React, { Component } from "react";
import firebase from "firebase";
import { useDebounce } from "use-debounce";
import { useAuthState } from "react-firebase-hooks/auth";
import { Container, Form } from "react-bootstrap";
import SplitPane from "react-split-pane";
import AceEditor from "react-ace";


import { translate } from "../../minions/translator.js"
import Button from 'react-bootstrap/Button';

import history from '../../history';

import Swal from 'sweetalert2'
import Iframe from 'react-iframe'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faEdit, faMountain, faGlobeAfrica, faFlag, faFile,faCheck, faClock, faLink, faThLarge, faQuestion, faCalendar, faEnvelope, faVideo, faBook, faAppleAlt, faFolderOpen } from '@fortawesome/free-solid-svg-icons'

import {isMobileOnly} from "react-device-detect";

import {LinkShow} from "../../components/general/LinkShow.js"

import "brace/mode/json";
import "brace/mode/java";
import "brace/mode/html";
import "brace/mode/python";
import "brace/theme/eclipse.js";

import Logo from './img/logo.gif'
import Mehran from './img/people/mehran-sq.jpg'
import Piech from './img/people/piech-sq.jpg'
import EdIcon from './img/icons/ed.svg'
import SpotifyIcon from './img/icons/spotify.ico'
import Sls from './img/people/sl-sq.jpg'
import MainQuad from './img/people/mainquad-sq.jpg'
import TeaRoom from './img/home/teaRoom.jpg'
import TeachersLounge from './img/home/coffeeRoom.jpg'
import PyCharmIcon from './img/icons/pycharm.png'

import {collectFeedback} from './feedback/Feedback.js'
import {CourseNav} from './CourseNav.js'
import {Announcements} from './Announcements.js'

import {getSectionDayTimeStr, getStudentSectionDayTimeStr, getTimezoneStr} from '../../minions/userHelper.js'


export class CourseWithData extends Component {
	componentWillMount() {
		this.setState({
			isSlRoleView:this.props.isSL
		})
	}

	componentDidMount() {
		// if they owe you feedback, ask them!
		collectFeedback(this.props.userData, this.props.user, this.props.submitFeedback)
	}

	toggleRoleView() {
		this.setState({
			isSlRoleView:!this.state.isSlRoleView
		})
	}

	render() {
		return (
			<div>
				<CourseNav
					isSL = {this.props.isSL}
					userName={this.props.userName}
					isSlRoleView={this.state.isSlRoleView}
					toggleRoleView={() => this.toggleRoleView()}
				/>
				{this.renderHeader()}
				{this.renderBody()}
			</div>
		)
	}

	renderHeader() {
		return (
			<div className="header container container-course pt-3" >
				<div className="row">
					<div className="col">
						<div className="logo">
							<img className="logoImg" src={Logo} />
						</div>
						<div className="headerText pb-3">
							<div className="title">
								Code in Place :  {this.props.userName}
							</div>
							<div>
								One-time Offering | Spring 2020
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}

	renderBody() {
		return (

			<div className="container container-course">
				<div className="d-flex justify-content-between homeContainer pt-3">

					{this.renderInfoCol()}


					<div className="announcement-col">

						<Announcements isSL = {this.state.isSlRoleView}/>

						<hr/>

						<div style={{height:50}} />

					</div>
					<div className="extra-col"  style={{height:900}}>



						<p className="subtleHeading ">Your todo list</p>
						<div className="card mb-0">
	  					<div className="card-body extra-body">

	  						<p className="mb-1"><b style={{color:'#555'}}>Week 6:</b><br/>
					  					<FontAwesomeIcon icon={faCheck}/> Work on <a href="#/assignment/finalProjec">projects!</a><br/>
					  					
					  					</p>


					  		<LinkShow text="Show Week 5"
		  						html = {(
		  							<div>
				  						<p className="mb-1"><b style={{color:'#555'}}>Week 5:</b><br/>
					  					<FontAwesomeIcon icon={faCheck}/> Learn about data!<br/>
					  					<FontAwesomeIcon icon={faCheck}/> Your last <a href="#/handout/sectionwhattoexpect.html">section!</a><br/>
					  					<FontAwesomeIcon icon={faCheck}/> More <a href="#/lectures">lectures</a><br/>
					  					<span><FontAwesomeIcon icon={faCheck}/> Submit <a href="#/assignment/images">Assn3</a></span><br/>
					  					<span><FontAwesomeIcon icon={faCheck}/> Read the <a href="https://codeinplace2020.github.io/pythonreader/en/intro/">reader</a></span><br/>
					  					<span><FontAwesomeIcon icon={faCheck}/> Start <a href="#/assignment/finalProject">final project</a></span><br/>
					  					
					  					</p>
				  					</div>
		  						)}
		  					/>
		  					<br/>

	  						<LinkShow text="Show Week 4"
		  						html = {(
		  							<div>
				  						<p className="mb-1"><b style={{color:'#555'}}>Week 4:</b><br/>
					  					<FontAwesomeIcon icon={faCheck}/> Learn images!<br/>
					  					<FontAwesomeIcon icon={faCheck}/> More <a href="#/lectures">lectures</a><br/>
					  					<FontAwesomeIcon icon={faCheck}/> Go to <a href="#/handout/sectionwhattoexpect.html">section!</a><br/>
					  					<span><FontAwesomeIcon icon={faCheck}/> Early start on <a href="#/assignment/images">Assn3</a></span><br/>
					  					<span><FontAwesomeIcon icon={faCheck}/> Take 1hr <a href="https://us.edstem.org/courses/490/lessons/1198/slides/6432">diagnostic</a></span><br/>
					  					<span><FontAwesomeIcon icon={faCheck}/> Read about <a href="//codeinplace2020.github.io/faqs/imageReference.pdf">images</a></span><br/>
					  					<span><FontAwesomeIcon icon={faCheck}/> Read the <a href="https://codeinplace2020.github.io/pythonreader/en/intro/">reader</a></span><br/>
					  					
					  					</p>
				  					</div>
		  						)}
		  					/>
		  					<br/>
	  						

	  						<LinkShow text="Show Week 3"
		  						html = {(
		  							<div>
			  							<p className="mb-1"><b style={{color:'#555'}}>Week 3:</b><br/>
					  					<FontAwesomeIcon icon={faCheck}/> Learn functions<br/>
					  					<FontAwesomeIcon icon={faCheck}/> More <a href="#/lectures">lectures</a><br/>
					  					<FontAwesomeIcon icon={faCheck}/> A great <a href="#/handout/sectionwhattoexpect.html">section!</a><br/>
					  					<span><FontAwesomeIcon icon={faCheck}/> <a href="#/assignment/khansole">Assn2 by Friday</a></span><br/>
					  					
					  					<span><FontAwesomeIcon icon={faCheck}/> Read the <a href="https://codeinplace2020.github.io/pythonreader/en/intro/">reader</a></span><br/>
					  					
					  					</p>
					  				</div>
		  						)}
		  					/>
		  					<br/>
		  					
		  					<LinkShow text="Show Week 2"
		  						html = {(
		  							<div>
			  							<p className="mb-0"><b style={{color:'#555'}}>Week 2:</b><br/>
			  							<FontAwesomeIcon icon={faCheck}/> Use Variables<br/>
					  					<FontAwesomeIcon icon={faCheck}/> Watch new <a href="#/lectures">lectures</a><br/>
					  					<FontAwesomeIcon icon={faCheck}/> Go to your <a target="_blank" href="https://www.youtube.com/watch?v=RPmatSmjzrU&feature=youtu.be">section</a><br/>
					  					<span><FontAwesomeIcon icon={faCheck}/> <a href="#/handout/submissionInstructions.html">Submit Assn1</a></span><br/>
					  					
					  					<span><FontAwesomeIcon icon={faCheck}/> Read the <a href="https://codeinplace2020.github.io/pythonreader/en/intro/">reader</a></span><br/>
					  					
					  					<span><FontAwesomeIcon icon={faCheck}/> Early <a href="#/assignment/khansole">start Assn2</a></span><br/>
					  					</p>
					  				</div>
		  						)}
		  					/><br/>
		  					<LinkShow text="Show Week 1"
		  						html = {(
		  							<div>
			  							<p className="mb-0"><b style={{color:'#555'}}>Week 1:</b><br/>
			  							<FontAwesomeIcon icon={faCheck}/> Learn Karel<br/>
					  					<FontAwesomeIcon icon={faCheck}/> Watch first <a href="#/lectures">3 lectures</a><br/>
					  					<FontAwesomeIcon icon={faCheck}/> Read the <a href="https://compedu.stanford.edu/karel-reader/docs/python/en/intro.html">Karel reader</a><br/>
					  					<FontAwesomeIcon icon={faCheck}/> Go to your <a target="_blank" href="https://www.youtube.com/watch?v=RPmatSmjzrU&feature=youtu.be">section</a><br/>
					  					<FontAwesomeIcon icon={faCheck}/> Download <a href="#/handout/installingPyCharm.html">PyCharm</a><br/>
					  					<FontAwesomeIcon icon={faCheck}/> Start <a href="#/assignment/karel">Assn1</a><br/>
					  					</p>
					  				</div>
		  						)}
		  					/>
	  					</div>
	  					</div>

	  					<p className="subtleHeading mt-4">Course Playlists</p>
						<div className="card mb-0">
		  					<div className="card-body extra-body">
			  					<p className="mb-0"><b style={{color:'#555'}}>Add + Enjoy:</b><br/>
			  					<img src={SpotifyIcon} className="sidebaricon" alt="icon"></img>
									<a target="_blank" href="https://open.spotify.com/playlist/2LUKGVxQgv9UdmAE8F3Z4Q?si=n3t2x_EuTCWkPzyJLKGQDgm">Relaxed</a><br/>
			  					<img src={SpotifyIcon} className="sidebaricon" alt="icon"></img>
									<a target="_blank" href="https://open.spotify.com/playlist/0IAmcARxo5exTVA0FZb5C9?si=9BK_Cy2SS6ihaqpNfFVVDw">Upbeat</a><br/>
					  					
			  					</p>
		  					</div>
	  					</div>


	  					<p className="subtleHeading mt-4">Covid-19 Course</p>
						<div className="card mb-0">
		  					<div className="card-body extra-body">
			  					<p className="mb-0"><b style={{color:'#555'}}>Our values:</b><br/>
			  					Humanity<br/>
			  					Intellectual joy<br/>
			  					Social connection<br/>
			  					New skills<br/>
			  					Gratitude<br/>
			  					Everyone is welcome<br/>
			  					</p>
		  					</div>
	  					</div>

	  				<p className="subtleHeading mt-4">Tea Room</p>
	  				<img className="w-100" src={TeaRoom} />
	  				<i>What is the tea room?!?</i>



	  				{this.renderTeachersLounge()}

	  				<p className="subtleHeading mt-4">Making History</p>
	  				<div className="card mb-0">
	  					<div className="card-body extra-body">
		  					<p className="mb-0">
		  						Is this the class with the most teachers ever?
		  						We have over 800 wonderful teachers from all walks of life who have volunteered to help you learn.
		  						&nbsp;<FontAwesomeIcon icon={faAppleAlt} />.
		  					</p>
	  					</div>
	  				</div>


					</div>

				</div>
			</div>

		)
	}

	renderSectionLink() {
		var href = "https://us.edstem.org/courses/"+this.props.userData.studentSectionCode+"/discussion/"
		return <li>
			<FontAwesomeIcon className="sidebaricon" icon={faLink} />
			<a href={href}> Section Ed</a>
		</li>
	}

	renderSection() {
		if(!this.state.isSlRoleView) {
			if('studentSectionTime' in this.props.userData) {
				if('userTimezone' in this.props.userData) {
					try {
					  let tz = getTimezoneStr(this.props.userData)
					  let dayTime = getStudentSectionDayTimeStr(this.props.userData)
					  return (
							<ul className="readingList">
								<li>
									<FontAwesomeIcon className="sidebaricon" icon={faClock} /> {dayTime}

								</li>
								<li>
								<FontAwesomeIcon className="sidebaricon" icon={faGlobeAfrica} /> {tz}
								</li>
								{this.renderSectionLink()}
								<li>Details will be posted on your section Ed</li>
							</ul>
						)
					}
					catch(err) {
					  return <i>Ask your section leader in "Ed" for your section time</i>
					}

				} else {
					return <i>Ask your section leader in "Ed" for your section time</i>
				}

			}
			return (<i>It looks like you are not in a section. That likely means that you signed up late or
			didn't get your preferences in by the time we started
			assigning sections. Fill out
			<a href="https://docs.google.com/forms/d/e/1FAIpQLScCWxU7zOxkqABUi8pcbsB9e-BBldZ24tAzKKI-xl12oH-6eQ/viewform"> this form</a> .</i>
			)
		}
		return (
			<ul className="readingList">
				<li>
					<FontAwesomeIcon className="sidebaricon" icon={faClock} /> {getSectionDayTimeStr(this.props.userData)}

				</li>
				<li>
				<FontAwesomeIcon className="sidebaricon" icon={faGlobeAfrica} /> {getTimezoneStr(this.props.userData)}
				</li>
			</ul>
		)
	}

	renderTeachersLounge() {
		if(!this.state.isSlRoleView) {
			return <span />
		}
		return (
			<span>
			<p className="subtleHeading mt-4">Teachers Lounge</p>
	  		<a target="_blank" href="https://stanford.zoom.us/j/97305311125?pwd=cWJKN2RhMmYvcTE4Zk5zS3B6cEtmUT09">
	  			<img className="w-100" src={TeachersLounge} />
	  			<i>Join on the hour, every hour.</i>
	  		</a>
	  		</span>
		)
	}

	renderInfoCol() {
		return (
			<div className="info-col sticky-top">



				<p className="subtleHeading">Resources</p>

				<ul className="readingList">
					<li>
						<FontAwesomeIcon className="sidebaricon" icon={faThLarge} />
						<a href="#/course/schedule">Class Schedule</a>
					</li>

					{/*<li>
						<FontAwesomeIcon className="sidebaricon" icon={faQuestion} />
						<a href="{{pathToRoot}}handouts/coursecommunication.html">Getting Help</a>
					</li>

					<li>
						<FontAwesomeIcon className="sidebaricon" icon={faCalendar} />
						<a href="{{pathToRoot}}oh.html">Office Hours</a>
					</li>*/}

					<li>
						<FontAwesomeIcon className="sidebaricon" icon={faVideo} />
						<a href = "#/lectures">Lectures</a>
					</li>

					<li>
						<img src={EdIcon} className="sidebaricon" alt="icon"></img>
						<a target="_blank" href="https://us.edstem.org/join/5BjBhN">Discussion Forum</a>
					</li>

					<li>
						<img src={PyCharmIcon} className="sidebaricon" alt="icon"></img>
						<a target="_blank" href="#/handout/installingPyCharm">PyCharm</a>
					</li>

					<li>
						<FontAwesomeIcon className="sidebaricon" icon={faBook} />
						<a target="_blank"
							href="https://compedu.stanford.edu/karel-reader/docs/python/en/intro.html">Karel Reader</a>
					</li>
					<li>
						<FontAwesomeIcon className="sidebaricon" icon={faBook} />
						<a target="_blank"
							href="https://codeinplace2020.github.io/pythonreader/en/intro/">Python Reader</a>
					</li>
					<li>
						<FontAwesomeIcon className="sidebaricon" icon={faBook} />
						<a target="_blank"
							href="//codeinplace2020.github.io/faqs/imageReference.pdf">Image Reference</a>
					</li>

			        
				</ul>
				<hr/>

				<p className="subtleHeading">Your Section</p>
					{this.renderSection()}



				<hr />
				<p className="subtleHeading">Assignments</p>
				<ul class="readingList mb-0">
					<li>

						<FontAwesomeIcon className="sidebaricon" icon={faFile} />
						<a href="#/assignment/karel">
						Assn 1
						</a>
						&nbsp;[<a href="#/handout/submissionInstructions.html">submit</a>]
					</li>
					<li>

						<FontAwesomeIcon className="sidebaricon" icon={faFile} />
						<a href="#/assignment/khansole">
						Assn 2
						</a>
						&nbsp;[<a 
			              href="#/handout/submissionA2.html">submit</a>]
					</li>
					<li>

						<FontAwesomeIcon className="sidebaricon" icon={faFile} />
						<a href="#/assignment/images">
						Assn 3
						</a>
						&nbsp;[<a 
			              href="#/handout/submissionA3.html">submit</a>]
					</li>
					<li>
						<FontAwesomeIcon className="sidebaricon" icon={faFile} />
						<a href="https://us.edstem.org/courses/490/lessons/1198/slides/6432">
						Diagnostic
						</a>
					</li>
					<li>
						<FontAwesomeIcon className="sidebaricon" icon={faFlag} />
						<a href="#/assignment/finalProject">
						Final Project!
						</a>
					</li>
					 
				</ul>
				<hr />

				<p className="subtleHeading">Instructors</p>
				<div className="staffBox d-flex justify-content-between flex-wrap">

					<div className="mb-3">
						<a >800+ Section Leaders</a>
						<br />
						<img targe="_blank" className="round-img" src={Sls} alt="Chris"></img><br />
					</div>

					<div className="mb-3">
						Prof. <a href="//stanford.edu/~cpiech">Chris Piech</a>
						<br />
						<img targe="_blank" className="round-img" src={Piech} alt="Chris"></img><br />
					</div>

					<div className="mb-2">
						Prof. <a targe="_blank" href="//robotics.stanford.edu/~sahami/bio.html">Mehran Sahami</a>
						<br />
						<img className="round-img" src={Mehran} alt="Mehran"></img><br />
					</div>

					{/*<div className="mb-2">
						<a targe="_blank" href="">Community Learning</a>
						<br />
						<img className="round-img" src={MainQuad} alt="Mehran"></img><br />
					</div>*/}


				</div>

				<hr/>
				<div style={{height:40}}/>



			</div>
		)
	}
}