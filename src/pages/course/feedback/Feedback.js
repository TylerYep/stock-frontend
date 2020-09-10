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
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams
} from "react-router-dom";

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

const CURR_KEY = 'week1'


export const collectFeedback = (userData, user, submitFeedback) => {
	// then see if we should gather student or SL feedback
	if(!('role' in userData)) return

	// first check if the question has already been answered
	if(alreadyAnswered(userData)) return

	// check if it is the right time to ask them (eg after section)
	if(!isRightTimeToAsk(userData)) return

	if(userData['role'] == 'admittedStudent') {
		studentFeedback(userData, user, submitFeedback)
	} 
	if(userData['role'] == 'sectionLeader') {
		slFeedback(userData, user, submitFeedback)
	}
	
	
}


let isRightTimeToAsk = (userData) => {
	var sectionIndex = null
	if(userData['role'] == 'admittedStudent') {
		sectionIndex = parseInt(userData['studentSectionTime'])
	}
	if(userData['role'] == 'sectionLeader') {
		if(!('slSectionTime' in userData)) {
			return false
		}
		sectionIndex = userData['slSectionTime']['sectionTime']
	}
	if(sectionIndex == null) return false
	// the +2 is because you only want to ask them after
	let firstSection = new Date(2020,3,15,16 + sectionIndex + 2,0);
	var today = new Date();  
	return today > firstSection
}

function diff_hours(dt2, dt1) {

  var diff =(dt2.getTime() - dt1.getTime()) / 1000;
  diff /= (60 * 60);
  return Math.abs(Math.round(diff));
  
 }

let alreadyAnswered = (userData) => {

	if(!('sectionFeedback' in userData)) {
		return false
	}

	if(!(CURR_KEY in userData['sectionFeedback'])) {
		return false
	}

	if(userData['sectionFeedback'][CURR_KEY] == false) {
		return false
	}

	return true
}

const slFeedback = (userData, user, submitFeedback) => {
	Swal.fire({
      title: 'Tiny feedback',
      input: 'checkbox',
      inputValue: 1,
      confirmButtonText: 'Submit',
	  inputPlaceholder:'I want to teach again next week',
      allowOutsideClick:false,
      showCloseButton: true,
      showCancelButton:true,
      cancelButtonText:'I did not teach section',
      html:FORM_HTML_SL,	
      inputValidator: (value) => {
      	if(document.getElementById('aboutSection').value == '') {
      		return 'Tell us one thing you liked!'
      	}
      	if(document.getElementById('improveSection').value == '') {
      		return 'Anything we can do better?'
      	}
      	let overall = undefined
      	let radios = document.getElementsByName('overallQuality')
    	for (var i = 0; i < radios.length; i++) {
    		if(radios[i].checked) {
    			overall = parseInt(radios[i].value)
    		}
    	}
    	if(overall == undefined) {
    		return 'Missing quality score'
    	}
      	
	  },
    }).then((result) => {
      if('dismiss' in result) {
        submitFeedback(user, {'didNotAttend':true}, CURR_KEY)
        return
      }
    	let radios = document.getElementsByName('overallQuality')
    	let overall = undefined
    	for (var i = 0; i < radios.length; i++) {
    		if(radios[i].checked) {
    			overall = parseInt(radios[i].value)
    		}
    	}
    	let sectionFeedback = {
    		'aboutSection':document.getElementById('aboutSection').value,
    		'improveSection':document.getElementById('improveSection').value,
    		'random':document.getElementById('random').value,
    		'overall':overall,
    		'wantNextWeek': result.value
    	}
    	if(overall == undefined) {
    		return
    	}
    	if(sectionFeedback['aboutSection'] == undefined) {
    		return
    	}
    	if(sectionFeedback['improveSection'] == undefined) {
    		return
    	}
    	if(sectionFeedback['random'] == undefined) {
    		sectionFeedback['random'] = ''
    	}

    	submitFeedback(user, sectionFeedback, CURR_KEY)
    })
}

const studentFeedback = (userData, user, submitFeedback) => {
	Swal.fire({
      title: 'Tiny feedback',
      input: 'checkbox',
      inputValue: 1,
      confirmButtonText: 'Submit',
	  inputPlaceholder:'I want to attend next week\'s section',
      allowOutsideClick:false,
      showCloseButton: true,
      showCancelButton:true,
      cancelButtonText:'I did not go to section this week',
      html:FORM_HTML_STUDENT,	
      inputValidator: (value) => {
      	if(document.getElementById('aboutSection').value == '') {
      		return 'Tell us one thing you liked!'
      	}
      	if(document.getElementById('improveSection').value == '') {
      		return 'Anything we can do better?'
      	}

      	
	  },
    }).then((result) => {
      if('dismiss' in result) {
        submitFeedback(user, {'didNotAttend':true}, CURR_KEY)
        return
      }

    	let radios = document.getElementsByName('overallQuality')
    	let overall = undefined
    	for (var i = 0; i < radios.length; i++) {
    		if(radios[i].checked) {
    			overall = parseInt(radios[i].value)
    		}
    	}
    	let sectionFeedback = {
    		'aboutSection':document.getElementById('aboutSection').value,
    		'improveSection':document.getElementById('improveSection').value,
    		'random':document.getElementById('random').value,
    		'overall':overall,
    		'wantNextWeek': result.value
    	}
    	submitFeedback(user, sectionFeedback, CURR_KEY)

    })
}


let FORM_HTML_SL = `<form>
		<label >🌱 Sorry to interrupt. Super fast feedback 🌱</label>
  <div class="form-group mt-2">
    <label for="aboutSection"><b>What did you like about teaching for Code in Place? 🙌</b></label>
    <input style="text-align: center;" type="text" class="form-control" id="aboutSection" aria-describedby="aboutSection" placeholder="Encouragement for other volunteers" />
  </div>
  
  <div class="form-group" style="margin-top:20px">
    <label for="improveSection"><b>What would you improve about the SL experience? ⛰️</b></label>
    <input style="text-align: center;"  type="text" class="form-control" id="improveSection" aria-describedby="improveSection" placeholder="There is always a better way" />
  </div>
  <div class="form-group" style="margin-top:20px">
    	
	  	<label for=""><b>Overall quality of my experience so far? </b></label><br/>
  
	  <div class="form-check form-check-inline">
		  <input class="form-check-input" type="radio" name="overallQuality" id="overallQuality1" value="1">
		  <label class="form-check-label" for="overallQuality1">1 Poor </label>
		</div>
		<div class="form-check form-check-inline">
		  <input class="form-check-input" type="radio" name="overallQuality" id="overallQuality2" value="2">
		  <label class="form-check-label" for="overallQuality2">2</label>
		</div>
		<div class="form-check form-check-inline">
		  <input class="form-check-input" type="radio" name="overallQuality" id="overallQuality3" value="3">
		  <label class="form-check-label" for="overallQuality3">3</label>
		</div>
		<div class="form-check form-check-inline">
		  <input class="form-check-input" type="radio" name="overallQuality" id="overallQuality4" value="4">
		  <label class="form-check-label" for="overallQuality4">4</label>
		</div>
		<div class="form-check form-check-inline">
		  <input class="form-check-input" type="radio" name="overallQuality" id="overallQuality5" value="5">
		  <label class="form-check-label" for="overallQuality5">5 Excellent</label>
		</div>
	</div>
  <div class="form-group" style="margin-top:20px">
    <label for="random"><b>Random message for the admin team? 🦦</b></label>
    <input style="text-align: center;"  type="text" class="form-control" id="random" aria-describedby="random" placeholder="Anything goes" />
  </div>
</form>
<br/>
`

let FORM_HTML_STUDENT = `<form>
		<label >🌱 Sorry to interrupt! Do you have a second to help us out? 🌱</label>
  <div class="form-group mt-2">
    <label for="aboutSection"><b>What did you like about section? 🙌</b></label>
    <input style="text-align: center;" type="text" class="form-control" id="aboutSection" aria-describedby="aboutSection" placeholder="Encouragement for a volunteer" />
  </div>
  
  <div class="form-group" style="margin-top:20px">
    <label for="improveSection"><b>What would you improve about section? ⛰️</b></label>
    <input style="text-align: center;"  type="text" class="form-control" id="improveSection" aria-describedby="improveSection" placeholder="There is always a better way" />
  </div>
  <div class="form-group" style="margin-top:20px">
    	
	  	<label for=""><b>Overall quality of instruction so far?</b></label><br/>
  
	  <div class="form-check form-check-inline">
		  <input class="form-check-input" type="radio" name="overallQuality" id="overallQuality1" value="1">
		  <label class="form-check-label" for="overallQuality1">1 Poor </label>
		</div>
		<div class="form-check form-check-inline">
		  <input class="form-check-input" type="radio" name="overallQuality" id="overallQuality2" value="2">
		  <label class="form-check-label" for="overallQuality2">2</label>
		</div>
		<div class="form-check form-check-inline">
		  <input class="form-check-input" type="radio" name="overallQuality" id="overallQuality3" value="3">
		  <label class="form-check-label" for="overallQuality3">3</label>
		</div>
		<div class="form-check form-check-inline">
		  <input class="form-check-input" type="radio" name="overallQuality" id="overallQuality4" value="4">
		  <label class="form-check-label" for="overallQuality4">4</label>
		</div>
		<div class="form-check form-check-inline">
		  <input class="form-check-input" type="radio" name="overallQuality" id="overallQuality5" value="5">
		  <label class="form-check-label" for="overallQuality5">5 Excellent</label>
		</div>
	</div>
  <div class="form-group" style="margin-top:20px">
    <label for="random"><b>Random message for the teaching team? 🦦</b></label>
    <input style="text-align: center;"  id="random"type="text" class="form-control" id="random" aria-describedby="random" placeholder="Anything goes" />
  </div>
</form>
<br/>`