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

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams
} from "react-router-dom";

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
export class ExampleWithData extends Component {
	render() {

		let path = this.props.exampleId.split(':').join('/')


		let url = "//codeinplace2020.github.io/workedExamples/en/"+path
		console.log(url)
		return (
			<div className="d-flex flex-column" style={{height:'100vh'}}>
				<CourseNav userName={this.props.userName}/>
				<iframe class="exampleFrame" style={{flex:1}} src={url} />

			</div>
		)
	}
}