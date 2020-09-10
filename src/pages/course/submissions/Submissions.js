/* tslint:disable */
import React, { Component } from "react";

import CodePostEmbed from 'codepost-embed';

import{CourseNav} from '../CourseNav.js'

export class SubmissionsWithData extends Component {


	render() {
		return (
			<div>
				<CourseNav userName={this.props.userName}/>
				{this.renderBody()}
			</div>
		)
	}

	renderBody() {

    let route = "/";
    if (this.props.isSL) {
      route = "/grader/Code%20in%20Place/Spring%202020/my_sections";
    } else {
      route = "/student/Code%20in%20Place/Spring%202020/";
    }

		return (

	<div style={{height: "calc(100vh - 61px)"}}>
       <CodePostEmbed
        token={this.props.userToken}
        auth_type="Firebase"
        source="Code in Place"
        route={route}
        assignment={this.props.codePostAssignmentId}
        files={this.props.codePostFiles}
      />

    </div>
		)
	}

}