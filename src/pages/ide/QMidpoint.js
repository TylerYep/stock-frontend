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
import { faVial, faCheck} from "@fortawesome/free-solid-svg-icons";
import firebase from "firebase";

import KarelWorld from "../../components/Karel/KarelWorld.js"

import {AssnIde} from './AssnIde.js'

const READER_URL ="https://compedu.stanford.edu/karel-reader/docs/python/en/intro.html"

export class QMidpoint extends Component {
  componentWillMount() {
    document.title = "Midpoint";
  }

  static getKey() {
    return 'midpoint'
  }

  static faqUrl() {
    return null
  }

  static starterCode() {
    return `from karel.stanfordkarel import *

# File: midpoint.py
# -----------------------------
# Write a program, using only karel featuers,
# which allows Karel to put a beeper in the midpoint
# of a world of any width.
def main():
   move()
   # add your code here`
  }

  render() {
    return <AssnIde
      {...this.props}
      goal = {this.getGoal()}
      prompt = {this.getPrompt()}
      equalsIgnore = {[
        'karelRow',
        'karelCol',
        'karelDir'
      ]}
      assignment = "assn1"
      onwards={null}
      faqUrl = {null}
      worlds = {[
        this.getEmptyWorldFile(9,9),
        this.getEmptyWorldFile(6,5),
        this.getEmptyWorldFile(9,8),
        this.getEmptyWorldFile(2,2),
        this.getEmptyWorldFile(1,1)
      ]}
    />
  }

  getEmptyWorldFile(nRows, nCols) {
    return {
      'name':`${nRows}x${nCols}.w`,
      'world':{
        nRows :nRows,
        nCols :nCols
      }
    }
  }

  getPrompt() {
    return (
      <div className="p-4" style={{overflow:'hidden'}}>
        <h2>Midpoint Karel</h2>
        <div className="card bg-light mb-3">
          <div className="card-body" style={{padding:'0.75rem'}}>
            <p className="card-text"><b>Your task</b>: Write a program to implement the Hospital Building Karel project. Remember that your program should work for different worlds.
            </p>

          </div>
        </div>
        <p>If you finished the other two problems, consider this challenge.
.

As an exercise in solving algorithmic problems, program Karel to place a single beeper at the center of 1st row. For example, say Karel starts in the 5x5 world pictured bellow.

</p>

      <KarelWorld
          width={300}
          height={300}
          makeAccessible={this.props.makeAccessible}
          nRows ={5}
          nCols ={5}
        />
        <p></p>
        <p>Karel should end with Karel standing on a beeper in the following position </p>

      <KarelWorld
          width={300}
          height={300}
          makeAccessible={this.props.makeAccessible}
          nRows = {5}
          nCols = {5}
          stones = {[{r:4,c:2,n:1}]}
        />

        <p></p>
        <p>Note that the final configuration of the world should have only a single beeper at the midpoint of 1st row. Along the way, Karel is allowed to place additional beepers wherever it wants to, but must pick them all up again before it finishes.  Similarly, if Karel paints/colors any of the corners in the world, they must all be uncolored before Karel finishes</p>

        <p>In solving this problem, you may count on the following facts about the world:<ul>
<li> Karel starts at 1st row and 1st column, facing east, with an infinite number of beepers in its bag.</li>
<li> The initial state of the world includes no interior walls or beepers.</li>
<li> The world need not be square, but you may assume that it is at least as tall as it is wide.</li></ul></p>

<p>Your program, moreover, can assume the following simplifications: If the width of the world is odd, Karel must put the beeper in the center square. If the width is even, Karel may drop the beeper on either of the two center squares.
It does not matter which direction Karel is facing at the end of the run.</p>

<p>There are many different algorithms you can use to solve this problem so feel free to be creative!</p>


         </div>
    )
  }


  getWorld() {
    return {
      nRows :9,
      nCols :9
    }
  }

  getGoal() {
    return {
      nRows :9,
      nCols :9,
      stones : [{r:8, c:4, n:1}]
    }
  }
}