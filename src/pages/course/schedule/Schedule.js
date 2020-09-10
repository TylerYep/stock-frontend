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

import Swal from 'sweetalert2'
import Iframe from 'react-iframe'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faEdit, faGlobeAfrica, faClock, faUserFriends, faHammer, faThLarge, faVial, faFileUpload, faQuestion, faCalendar, faEnvelope, faVideo, faBook, faAppleAlt } from '@fortawesome/free-solid-svg-icons'

import {getSectionDateTimeStr} from '../../../minions/userHelper.js'
import {isMobileOnly} from "react-device-detect";

import{CourseNav} from '../CourseNav.js'

import "brace/mode/json";
import "brace/mode/java";
import "brace/mode/html";
import "brace/mode/python";
import "brace/theme/eclipse.js";


const SECTION_TBD = 'Time: Tbd'
export class ScheduleWithData extends Component {
	render() {
		return (
			<div>
				<CourseNav userName={this.props.userName}/>
				<div className="container container-course">
					<div className="row">
						<div className="col">
							<h1 className="mt-5">Course Schedule</h1>
							<hr/>

								<div className="table-responsive">
									<Table responsive bordered>
										<thead>
											<tr>
												<th className="non-mobile-only-tc" style={{'width':'8%'}}>Wk</th>
												<th style={{'min-width':'78'}}>Monday</th>
												<th style={{'minWidth':'78'}}>Wednesday</th>
												<th style={{'minWidth':'78px'}}>Section</th>
												<th style={{'minWidth':'78'}}>Friday</th>
											</tr>
										</thead>
										<Week1 userData={this.props.userData} displaySection={this.props.isSL}/>
										<Week2 userData={this.props.userData} displaySection={this.props.isSL}/>
										<Week3 userData={this.props.userData} displaySection={this.props.isSL}/>
										<Week4 userData={this.props.userData} displaySection={this.props.isSL}/>
										<Week5 userData={this.props.userData} displaySection={this.props.isSL}/>
										<Week6 userData={this.props.userData} displaySection={this.props.isSL}/>
									</Table>
									<p>The schedule is subject to change by the management at any time. </p>
								</div>
							<hr/>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

class Day extends Component {

	render() {
		let hwIcon = 'assn' in this.props ? (
		<span>
			<span>
				<FontAwesomeIcon className="sidebaricon" icon={faFileUpload} /><br className="mobile-only"/>  Assn {this.props.assn} due
			</span>
		</span>): <span />
		return (
			<td className="calendarCell">
				<p className="subtleHeading">{this.props.date}</p>
				<FontAwesomeIcon className="mt-2 sidebaricon" icon={this.props.icon} /> {this.props.num} <br className="mobile-only"/>{this.props.name} <br/>
				{hwIcon}
			</td>
		)
	}
}

class Section extends Component {
	render() {
		return (
			<td className="calendarCell" style={{backgroundColor:'#edefff'}}>
				<p className="subtleHeading">{this.props.section}</p>
				<FontAwesomeIcon className="sidebaricon"icon={faUserFriends} /><br className="mobile-only"/> {this.props.name}<br/>

			</td>
		)
	}
}

class Week1 extends Component {
	render() {
		let section = this.props.displaySection ? getSectionDateTimeStr(this.props.userData, 0) : SECTION_TBD
		return (
			<tr>
				<td className="calendarWeekCell non-mobile-only-tc">1</td>
				<Day
					num={'1.'}
					date="Apr 13th"
					name="Welcome"
					icon={faVideo}
					url={'#/lectures'}
				/>
				<Day
					num={'2.'}
					date="Apr 15th"
					name="Control Flow"
					icon={faVideo}
				/>
				<Section
					name="Karel Section"
					section = {section}
				/>
				<Day
					num={'3.'}
					date="Apr 17th"
					name="Refinement"
					icon={faVideo}
				/>
			</tr>
		)
	}
}

class Week2 extends Component {
	render() {
		let section = this.props.displaySection ? getSectionDateTimeStr(this.props.userData, 1) : SECTION_TBD
		return (
			<tr>
				<td className="calendarWeekCell non-mobile-only-tc">2</td>
				<Day
					num={'4.'}
					date="Apr 20th"
					name="Variables in Python"
					icon={faVideo}

				/>
				<Day
					num={'5.'}
					date="Apr 22nd"
					name="Expressions"
					icon={faVideo}
					assn={1}
				/>
				<Section
					name="Hello Python Section"
					section = {section}
				/>
				<Day
					num={'6.'}
					date="Apr 24th"
					name="Flow in Python"
					icon={faVideo}
				/>
			</tr>
		)
	}
}

class Week3 extends Component {
	render() {
		let section = this.props.displaySection ? getSectionDateTimeStr(this.props.userData, 2) : SECTION_TBD
		return (
			<tr>
				<td className="calendarWeekCell non-mobile-only-tc">3</td>
				<Day
					num={'7.'}
					date="Apr 27th"
					name="Functions Revisited"
					icon={faVideo}
				/>
				<Day
					num={'8.'}
					date="Apr 29th"
					name="More Parameters"
					icon={faVideo}
				/>
				<Section
					name="Functions Section"
					section = {section}
				/>
				<Day
					num={'9.'}
					date="May 1st"
					name="Images"
					assn ={2}
					icon={faVideo}
				/>
			</tr>
		)
	}
}

class Week4 extends Component {
	render() {
		let section = this.props.displaySection ? getSectionDateTimeStr(this.props.userData, 3) : SECTION_TBD
		return (
			<tr>
				<td className="calendarWeekCell non-mobile-only-tc">4</td>
				<Day
					num={''}
					date="May 4th"
					name="Diagnostic"
					icon={faVial}
				/>
				<Day
					num={'10.'}
					date="May 6th"
					name="Graphics"
					icon={faVideo}
				/>
				<Section
					name="Graphics Section"
					section = {section}
				/>
				<Day
					num={'11.'}
					date="May 8th"
					name="Animation"
					icon={faVideo}
				/>
			</tr>
		)
	}
}

class Week5 extends Component {
	render() {
		let section = this.props.displaySection ? getSectionDateTimeStr(this.props.userData, 4) : SECTION_TBD
		return (
			<tr>
				<td className="calendarWeekCell non-mobile-only-tc">5</td>
				<Day
					num={'12.'}
					date="May 11th"
					name="Lists"
					icon={faVideo}
				/>
				<Day
					num={'13.'}
					date="May 13th"
					name="Text Processing"
					assn ={3}
					icon={faVideo}
				/>
				<Section
					name="Data Section"
					section = {section}
				/>
				<Day
					num={'14.'}
					date="May 15th"
					name="Dictionaries"
					icon={faVideo}
				/>
			</tr>
		)
	}
}

class Week6 extends Component {
	render() {
		let section = this.props.displaySection ? getSectionDateTimeStr(this.props.userData, 5) : SECTION_TBD
		return (
			<tr>
				<td className="calendarWeekCell non-mobile-only-tc">6</td>
				<Day
					num={''}
					date="May 18th"
					name="Final Project"
					icon={faHammer}
				/>
				<Day
					num={''}
					date="May 20th"
					name="Final Project"
					icon={faHammer}
				/>
				<td className="calendarCell">
				<p className="subtleHeading">No Section</p>

			</td>
				<Day
					num={''}
					date="May 22nd"
					name="Final Project"
					
					icon={faHammer}
				/>
			</tr>
		)
	}
}