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
import Moment from 'react-moment';
import 'moment-timezone';
import YouTube from 'react-youtube';

import Swal from 'sweetalert2'
import Iframe from 'react-iframe'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faThLarge, faLink, faQuestion, faCalendar, faEnvelope, faVideo, faFile, faBook } from '@fortawesome/free-solid-svg-icons'

import {isMobileOnly} from "react-device-detect";

import "brace/mode/json";
import "brace/mode/java";
import "brace/mode/html";
import "brace/mode/python";
import "brace/theme/eclipse.js";


import Logo from './img/logo.gif'
import Mehran from './img/people/mehran-sq.jpg'
import Piech from './img/people/piech-sq.jpg'
import KarelImg from './img/assn/karel.png'
import KhansoleImg from './img/assn/khansole.png'
import ImagesImg from './img/assn/images.png'
import LastSectionImg from './img/home/lastSection.jpg'

class Announcement extends Component {
	render() {
		if(this.props.onlyStaff && !this.props.isSL) return <span />
		let className = this.props.onlyStaff ? 'announcement' : 'announcement'
		return (
			<div className={"card " + className}>
			  <div className="card-body">
			    <div className="newsfeedHeader">
			      <p className="card-title newsfeedTitle">{this.props.title}</p>
			      <i className="text-secondary"><Moment fromNow ago>{this.props.moment}</Moment> ago</i>
			    </div>
			    {this.props.html}
			  </div>
			</div>
		)
	}
}

export class Announcements extends Component {



	render() {
		return (
			<div>

				<p className="subtleHeading">Announcements</p>

				<Announcement
					title={'Standard projects'}
					moment={'2020-05-18T22:00-0700'}
					isSL = {this.props.isSL}
					onlyStaff = {false}
					html = {(
						<div>
						<ul className="readingList">
						<li>Having trouble coming up with a final project? We put together two projects that you can do, WordGuessing and BrickBreaker. 
						See the <a href="#/assignment/finalProject">final project page</a> for more details. They are both a bit challenging.
						If you come up with your own project it doesn't need to be nearly this hard :-).
						</li>
						</ul>
						<div className="row">
						
						</div>
						</div>
					)}
				/>



				<Announcement
					title={'Final projects start today!'}
					moment={'2020-05-15T10:00-0700'}
					isSL = {this.props.isSL}
					onlyStaff = {false}
					html = {(
						<div>
						<ul className="readingList">
						<li>Wahoo! Your <a href="#/assignment/finalProject">final project</a> is a chance to build something which celebrates what you have learned. 
						It can be small, it can be humble, just make something. If you want, we will put your submission 
						on a website that the whole world can see, so that others can recognize what you have achieved.
						</li>
						</ul>
						<div className="row">
						<YouTube
			                containerClassName="col-12 col-md-12"
			                className="lectureVideoSingle"
			                style={{height:250}}
			                videoId={'MhfDD8My8A4'}
			            />
						</div>
						</div>
					)}
				/>

				<Announcement
					title={'Your final section'}
					moment={'2020-05-13T10:30-0700'}
					isSL = {this.props.isSL}
					onlyStaff = {false}
					html = {(
						<div>
						<ul className="readingList">
						<li>This weeks section is the last section of the class. The course will continue next week while you work on final projects, 
						but you will no longer have sections. Go to section and say thanks / bye to your section leader! 
						</li>
						</ul>
						<div >
						<img className="w-100" src={LastSectionImg} />
						</div>
						</div>
					)}
				/>

				<Announcement
					title={'Images section to help with your assignment'}
					moment={'2020-05-06T10:00-0700'}
					isSL = {this.props.isSL}
					onlyStaff = {false}
					html = {(
						<div>
						<ul className="readingList">
						<li>We have another fun section for you this week! This one has been specially designed to be helpful for your assignment 3. Go to section to save your
						future self time.</li>
						</ul>
						</div>
					)}
				/>

				<Announcement
					title={'Take the Diagnostic'}
					moment={'2020-05-04T10:00-0700'}
					isSL = {this.props.isSL}
					onlyStaff = {false}
					html = {(
						<div>
						<ul className="readingList">
						<li>It is time for the <a href="https://us.edstem.org/courses/490/lessons/1198/slides/6432"><FontAwesomeIcon icon={faLink}/> Code in Place diagnostic</a>. We are offering you the exact same self-test that we gave our Stanford students.
						The "diagnostic" is a 1 hour experience where you solve problems without using the IDE (that is the program that runs your code). 
						It is built to help you self-assess where they can improve and it is part of our system of making great programmers.
						The diagnostic is only for your well-being. We will not judge, pass or fail you. It is a learning experience.</li>
						<li>Take the diagnostic by <b>Sunday May 10th</b>. Only if you take the diagnostic will we send you solutions on May 11th.</li>
						</ul>
						</div>
					)}
				/>

				
				<Announcement
					title={'Assignment 3 released'}
					moment={'2020-05-04T10:00-0700'}
					isSL = {this.props.isSL}
					onlyStaff = {false}
					html = {(
						<div>
						<ul className="readingList">
							<li>In <a href="#/assignment/images">Assignment 3</a> you will write a series of exciting image filters. In section we will work on problems directly related to your homework.</li>
						</ul>
						<a href="#/assignment/images"><img style={{'width':'100%'}} src={ImagesImg} /></a>
						
						</div>
					)}
				/>

				<Announcement
					title={'Conceptual Milestone!'}
					moment={'2020-04-29T12:30-0700'}
					isSL = {this.props.isSL}
					onlyStaff = {false}
					html = {(
						<div>
						<ul className="readingList">
						<li>This is a big moment in the class. We have finished building our "foundation" and we are ready to practice 
						what we have learned by applying it to make cool and beautiful programs. The best way to round off your foundation is to <b>go to section!</b>
						&nbsp; Why is it good to have a foundation? As Mehran likes to say "Houses are exciting. 
						The foundation on the other hand is basically just concrete in a hole. But you certainly don't want a house without a foundation".</li>
						</ul>
						<div className="row">
						<YouTube
			                containerClassName="col-12 col-md-12"
			                className="lectureVideoSingle"
			                style={{height:250}}
			                videoId={'yANUka-4mjE'}
			            />
						</div>
						</div>
					)}
				/>

				<Announcement
					title={'Enjoy your second section!'}
					moment={'2020-04-22T10:00-0700'}
					isSL = {this.props.isSL}
					onlyStaff = {false}
					html = {(
						<div>
						<ul className="readingList">
							<li>Regardless of where you are in the class you should go to your second section (either today, tomorrow, or the day after depending on your time). 
							This we are transitioning into regular python. Even if you haven't had a chance to finish or submit Assn1 you should go. We all get a fresh start after Karel!
							Have a wonderful section! Dont remember which section you are in? Check the "Your Section" box on the left of this screen. </li>
						</ul>
						
						</div>
					)}
				/>

				<Announcement
					title={'Assignment 2 released'}
					moment={'2020-04-22T10:00-0700'}
					isSL = {this.props.isSL}
					onlyStaff = {false}
					html = {(
						<div>
						<ul className="readingList">
							<li>Many of you are still finishing up Karel. That is fine! <a href="#/assignment/khansole">Assignment 2</a> is a fresh start, where we dive into the exciting world of Python. Everyone should do part 1 (Sandcastles). Part 2 and Part 3 are optional but recommended. Make sure to go to week 2 section!</li>
						</ul>
						<a href="#/assignment/khansole"><img style={{'width':'100%'}} src={KhansoleImg} /></a>
						
						</div>
					)}
				/>

				<Announcement
					title={'Happy Monday'}
					moment={'2020-04-20T10:00-0700'}
					isSL = {this.props.isSL}
					onlyStaff = {false}
					html = {(
						<div>
						<ul className="readingList">
							<li>Welcome back for another great week of Code in Place. You should see an updated set of "todos" for week 2. This week you will have a second section and 
							your
							regularly scheduled lectures (Monday, Wednesday, Friday). In addition this Wednesday is the goal due-date for Assn 1 : Karel. Try to submit ahead of time. 
							On Wednesday we release the second great assignment. Looking forward to it! </li>
						</ul>
						
						</div>
					)}
				/>

				<Announcement
					title={'Have a nice weekend!'}
					moment={'2020-04-17T19:30-0700'}
					isSL = {this.props.isSL}
					onlyStaff = {false}
					html = {(
						<div>
						<ul className="readingList">
						<li>Happy Friday! We hope you had a nice first week in class and we wish you all a wonderful weekend. 
						If you have time, try and made some progress on the two 
						problems in <a href="#/assignment/karel">Assignment 1</a> (or even the bonus problem). The "goal" completion date is next Wednesday and we will give you
						a way to submit by Monday's class. Be well, Code in Place. See you on Monday.</li>
								<li>
									Couldn't get PyCharm installed? We've got your back. See the "Online IDE" options at the 
						bottom of the
						<a href="#/assignment/karel"> assignment page</a>.
								</li>
								<li>
								If you missed section, not a worry. Let us know if you need a <a href="#/handout/sectionwhattoexpect.html">different time</a> and watch the 
						<a target="_blank" href="https://www.youtube.com/watch?v=VB_giRK51zU"> recoded section</a>.
								</li>
								
								<li>Ever felt a bit overwhelmed? Remember to have fun learning + watch these videos:</li>
							</ul>
						<div className="row">
						<YouTube
			                containerClassName="col-6 col-md-6"
			                className="lectureVideo"
			                videoId={'rwkuIF-oL0M'}
			            />
			            <YouTube
			                containerClassName="col-6 col-md-6"
			                className="lectureVideo"
			                videoId={'BMRU2L8iDK8'}
			            />
						</div>
						</div>
					)}
				/>

				<Announcement
					title={'Sections have been assigned'}
					moment={'2020-04-14T12:30-0700'}
					isSL = {this.props.isSL}
					onlyStaff = {false}
					html = {(
						<div>
						<p>Here is a <a target="_blank" href="https://www.youtube.com/watch?v=RPmatSmjzrU&feature=youtu.be"><FontAwesomeIcon icon={faVideo}/> video</a> which 
						shows you exactly how to get to your section! </p>
							<p>
					      Look to your left! In the side bar you should see a box which says "Your section"
					      that is your time. It should already be converted to your local time (according to the timezone we have on file)!
					      You section also has an <a href="https://us.edstem.org/join/5BjBhN">Ed group</a>. Go say hi.</p>
					      <p>Your section leader will post the link for your section so that you can join when it is time.
					      Try and be there 10 to 15 minutes before it starts so that you are ready.</p>
					      <p>Dont know what to expect from section? Can't see your section? Please see &nbsp;
					      <a href="https://compedu.stanford.edu/codeinplace/v1/#/handout/sectionwhattoexpect.html">
					      this handout on section</a>
					      </p>

						</div>
					)}
				/>

				<Announcement
					title={'Assignment 1 Released'}
					moment={'2020-04-13T03:34-0700'}
					isSL = {this.props.isSL}
					onlyStaff = {false}
					html = {(
						<div class="media">
						  <a href="#/assignment/karel"><img src={KarelImg} class="mr-3" alt="Karel" /></a>
						  <div class="media-body">
						    <p>For your first assignment you will write a series of Karel the Robot programs.
						    See the <a href="#/assignment/karel">assignment page</a> for more details. To stay at the right pacing, you should finish by Wednesday, April 22nd,
						    but make sure to get started early. Though Karel is a fun, simple robot,
						    some of the questions can take a lot of time. If you finish early do "extensions"</p>
						 </div>
						</div>
					)}
				/>

				<Announcement
					title={'Lecture 1 Ready to Watch'}
					moment={'2020-04-13T03:34-0700'}
					isSL = {this.props.isSL}
					onlyStaff = {false}
					html = {(
						<div>
							<p>
					     The first lecture has been released. This video is the first 2 mins. Check out the <a href="#/lectures">Lectures</a> page for the rest! Looking forward to a fun 5 weeks.
					    </p>
					    <YouTube
					    	className="w-100"
							  videoId={'dxZFXJhZPvU'}                  // defaults -> null

							/>
						</div>
					)}
				/>

				<Announcement
					title={'Section Leaders Admitted'}
					moment={'2020-04-06T02:14-0700'}
					isSL = {this.props.isSL}
					onlyStaff = {true}
					html = {(
						<div>
							<p>
					      Welcome to the class, section leader! Students are still applying. This is the "course page" and over the next few days we will gradually add more and more information here.
					      In addition to this course page, this quarter we are using the <a href="https://us.edstem.org/join/5BjBhN">"Ed" discussion forum</a>. Why don't you head on over to the "Ed" discussion forum and say hi!

					    </p>
					    <p>
					      To kick off the section leader teaching team we are going to host two 30 minute "Welcome Meetings"  for section leaders. We would have liked to have just one big meeting,
					      but we span all the time zones (and there are quite a few of us). The time of those meetings is going to be: Friday 8:30AM PST and Saturday 8:30PM PST. Try to make one (or perhaps both).
					      More details coming soon! We are going to explain all the important parts of the course mechanics and schedule at the "Welcome Meetings". Come to see your fellow instructors!
					    </p>
					    <p>
					    Thank you. From the bottom of my heart. This community service project has truly become a collaboration between teachers and students around the world.
					    We are excited for the opportunity to teach and learn with all of you, and genuinely touched. And thank you to the group that has been working tirelessly behind the scenes to make this all happen.
					    None of this would be possible without your dedication!
					    </p>

						</div>
					)}
				/>

				<Announcement
					title={'When do students start?'}
					moment={'2020-04-06T02:14-0700'}
					isSL = {this.props.isSL}
					onlyStaff = {true}
					html = {(
						<div>
							<p>We are gearing up for a fun and history making quarter. Some important dates coming up:
							Student applications are due April 8th.
							The first day of class for students is going to be April 13th.
							Your first section is going to be sometime between April 15th and April 17th (depends on the time you chose).</p>


						</div>
					)}
				/>


				<div className="card announcement">
				  <div className="card-body">
				    <div className="newsfeedHeader">
				      <div className="newsfeedTitle">Welcome!</div>
				      <i className="text-secondary"><Moment fromNow ago>2020-04-06T02:14-0700</Moment> ago</i>
				    </div>

				    <p>
				      Welcome to Code in Place. We're gearing up for a fun and history making course. More information will show up here in the next few days.
				    </p>
				    <p>
				      Start time: The first day of class is Monday. We are going to be releasing the first set of material on Monday 10a PDT.
				    </p>
				    <p>
				      Ask us anything: On monday night <b>California time</b> (April 13th, 9pm PDT) and Tuesday morning (April 14th, 9am PDT) we are going to host an ask me anything to "launch" the class. Details will be posted here one hour before the start of the first session.
				      Come join to learn more about the course.
				    </p>
				    
				  </div>
				</div>
			</div>
		)
	}

}