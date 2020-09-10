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
import { faDownload } from "@fortawesome/free-solid-svg-icons";
import { faVial, faCheck } from "@fortawesome/free-solid-svg-icons";
import firebase from "firebase";

import {AssnIde} from './AssnIde.js'

const READER_URL ="https://compedu.stanford.edu/karel-reader/docs/python/en/intro.html"

export class QHouse extends Component {
	static getKey() {
		return 'house'
	}

	static faqUrl() {
    return 'https://codeinplace2020.github.io/assignment-zero-faq/'
  }

	static starterCode() {
		return `from karel.stanfordkarel import *

# File: house.py
# -----------------------------
# The warmup program defines a "main"
# function which should make Karel 
# move to the beeper, pick it up, and
# return home.
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
			equalsIgnore = {[
        'karelDir'
      ]}
      faqUrl = {QHouse.faqUrl()}
		/>
	}

	getPrompt() {
		let completeTitle = this.props.isSolved ? <FontAwesomeIcon icon={faCheck} className="ml-2 text-success"/> : <span/>
    let completeDiscription = this.props.isSolved ? <span /> : <span className="badge badge-secondary ml-2"> Not Complete</span>
    return (
			<div className="p-4" style={{overflow:'hidden'}}>
				<h2>Shelter-in-Place {completeTitle}</h2>
				<hr/>
				<div className="card bg-light mb-3">
					<div className="card-body" style={{padding:'0.75rem'}}>
						<p className="card-text"><b>Your task</b>: 
						Write a program in the editor, that makes Karel pick up a beeper and go back into its house.
						 
						</p>
					</div>
				</div>

				<p>People around the world are staying at home to reduce the spread of COVID-19. Karel is doing their part by sheltering in place!</p>

				<p>Karel starts off in the corner of its house as shown in the world. The problem Karel needs to solve is to collect some food, represented (as all objects in Karel's world are) by a beeper, from outside the doorway and then to return to its initial position.</p>

				<p>You can assume that every part of the world is always the same. The house is exactly this size, the door is always in the position shown, and the beeper is just outside the door. Thus, all you have to do is write the sequence of commands necessary to have Karel</p>
				<ol>
				<li>Move to the beeper,</li>
				<li>Pick it up, and</li>
				<li>Return to its starting point.</li>
				</ol>
				<p>Even though the program is only a few lines, it is still worth getting at least a little practice in decomposition. In your solution, include a function for moving to the package, and returning to the starting point.</p>
				<p><b>Confused?</b> No worries. This problem uses material from chapters 1 through 4 in the <a target="_blank" href={READER_URL}>karel reader</a>. Have you read that yet?</p>
			</div>
		)
	}

	getWalls() {
		return [
			// top roof
			{r:1,c:1,d:'North'},
			{r:1,c:2,d:'North'},
			{r:1,c:3,d:'North'},

			// bottom floor
			{r:4,c:1,d:'North'},
			{r:4,c:2,d:'North'},
			{r:4,c:3,d:'North'},

			// left wall
			{r:1,c:0,d:'East'},
			{r:2,c:0,d:'East'},
			{r:3,c:0,d:'East'},

			// right wall
			{r:1,c:3,d:'East'},
			{r:3,c:3,d:'East'},
		]
	}

	getGoal() {
		return {
			nRows :5,
			nCols :5,
			karelCol :1,
			karelRow :1,
			walls : this.getWalls()
		}
	}

	getWorld() {
		return {
			nRows :5,
			nCols :5,
			karelCol :1,
			karelRow :1,
			walls : this.getWalls(),
			stones : [{r:2,c:4,n:1}]
		}
	}
}