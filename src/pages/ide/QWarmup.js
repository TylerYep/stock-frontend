import React, { Component } from "react";
// import { Router, Link } from "@reach/router"
import Button from "react-bootstrap/Button";
import Navbar from "react-bootstrap/Navbar";
import Spinner from "react-bootstrap/Spinner";
import Nav from "react-bootstrap/Nav";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload, faCheck } from "@fortawesome/free-solid-svg-icons";
import { faVial } from "@fortawesome/free-solid-svg-icons";
import firebase from "firebase";

import KarelWorld from "../../components/Karel/KarelWorld.js"

import {AssnIde} from './AssnIde.js'

const READER_URL ="https://compedu.stanford.edu/karel-reader/docs/python/en/intro.html"

export class QWarmup extends Component {
	static getKey() {
		return 'warmup'
	}

	static faqUrl() {
		return 'https://codeinplace2020.github.io/assignment-zero-faq/'
	}

	static starterCode() {
		return `from karel.stanfordkarel import *

# File: warmup.py
# -----------------------------
# The warmup program defines a "main"
# function which currently just has one
# Command. Add two more commands to make karel: move(),
# pick_beeper(), move()
def main():
   move()
   # add your code here`
	}

	render() {
		return <AssnIde
			{...this.props}
			world = {this.getWorld()}
			goal = {this.getGoal()}
			prompt = {this.getPrompt()}
			faqUrl = {QWarmup.faqUrl()}
		/>
	}

	getPrompt() {
		let completeTitle = this.props.isSolved ? <FontAwesomeIcon icon={faCheck} className="ml-2 text-success"/> : <span/>
    let completeDiscription = this.props.isSolved ? <span /> : <span className="badge badge-secondary ml-2"> Not Complete</span>
    return (
			<div className="p-4" style={{overflow:'hidden'}}>
				<h2>Warmup {completeTitle}</h2>
				<hr/>
				<div className="card bg-light mb-3">
					<div className="card-body" style={{padding:'0.75rem'}}>
						<p className="card-text"><b>Your task</b>:
						Write a program in the editor, that makes Karel move, pick a beeper, then move.

						</p>

					</div>
				</div>
				<p>The "editor" is the area on the far right where you can write text. You should write a solution as a Karel program.</p>

				<p>Your program should have a main function with three commands:</p>
				<ol>
					<li>move()</li>
					<li>pick_beeper()</li>
					<li>move()</li>
				</ol>

				<p>When you hit the run button, your program will execute line-by-line. After it finishes, Karel's world should look like this:
				<KarelWorld
					width={300}
					height={300 * (2/4)}
					makeAccessible={this.props.makeAccessible}
					{...this.getGoal()}
				/>
				</p>

				<p><b>Confused?</b> That is common! Coding is hard at first, but it gets easier with practice. This problem uses material from chapters 1 through 2 in the <a target="_blank" href={READER_URL}>karel reader</a>. Have you read that yet?
				If you have a question, check the FAQ (Frequently Asked Questions) document. See the button on the top right.
				</p>
			</div>
		)
	}

	getWalls() {
	}

	getWorld() {
		return {
			nRows :2,
			nCols :4,
			stones : [{r:1,c:1,n:1}]
		}
	}

	getGoal() {
		return {
			nRows :2,
			nCols :4,
			karelCol :2
		}
	}
}