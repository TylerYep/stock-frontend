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

import KarelWorld from "../../components/Karel/KarelWorld.js"

import {AssnIde} from './AssnIde.js'

const READER_URL ="https://compedu.stanford.edu/karel-reader/docs/python/en/intro.html"

export class QFrame extends Component {
  static getKey() {
    return 'frame'
  }

  static faqUrl() {
    return 'https://codeinplace2020.github.io/assignment-zero-faq/'
  }

  static starterCode() {
    return `# This is an editor! An editor is where you write code.
# Make karel: move, turn_left, move
def main():
   move()
   turn_left()
   move()
   # add your code here
   `
  }

  render() {
    return <AssnIde
      {...this.props}
      world = {this.getWorld()}
      goal = {this.getGoal()}
      prompt = {this.getPrompt()}
      equalsIgnore = {[
        'karelDir',
        'karelRow',
        'karelCol'
      ]}
      faqUrl = {QFrame.faqUrl()}
    />
  }

  getPrompt() {
    let completeTitle = this.props.isSolved ? <FontAwesomeIcon icon={faCheck} className="ml-2 text-success"/> : <span/>
    let completeDiscription = this.props.isSolved ? <span /> : <span className="badge badge-secondary ml-2"> Not Complete</span>
    return (
      <div className="p-4" style={{overflow:'hidden'}}>
        <h1>Frame Karel {completeTitle}</h1>
        <hr/>
        <div className="card bg-light mb-3">
          <div className="card-body" style={{padding:'0.75rem'}}>
            <p className="card-text"><b>Your task</b>:
            Write a program in the editor, that makes Karel draw a frame.

            </p>

          </div>
        </div>


        <p>When you hit the run button, your program will run. After it finishes, Karel's world should look like this (though karel can be anywhere facing any direction):
        <KarelWorld
          width={300}
          height={300 * (8/7)}
          makeAccessible={this.props.makeAccessible}
          {...this.getGoal()}
        />
        </p>

        <p><b>Confused?</b> No worries. This problem uses material from chapter 5 in the <a target="_blank" href={READER_URL}>karel reader</a>. Have you read that yet?</p>
      </div>
    )
  }

  getGoalBeepers() {
    var beepers = []
    for(var i = 0; i < 4; i++) {
      beepers.push({r:1,c:i + 1, n:1})
      beepers.push({r:6,c:i + 2, n:1})
    }
    for(var i = 0; i < 5; i++) {
      beepers.push({r:2+i,c:1, n:1})
      beepers.push({r:1+i,c:5, n:1})
    }
    return beepers
  }

  getWorld() {
    return {
      nRows :8,
      nCols :7,
    }
  }

  getGoal() {
    return {
      nRows :8,
      nCols :7,
      stones:this.getGoalBeepers()
    }
  }
}