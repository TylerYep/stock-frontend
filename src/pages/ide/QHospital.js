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

export class QHospital extends Component {
  componentWillMount() {
    document.title = "Hospital";
  }

  static getKey() {
    return 'hospital'
  }

  static faqUrl() {
    return 'https://codeinplace2020.github.io/assignment-zero-faq/'
  }

  static starterCode() {
    return `from karel.stanfordkarel import *

# File: hospital.py
# -----------------------------
# Here is a place to program your section problem
def main():
   move()
   # add your code here`
  }

  render() {
    // by default the world is the first one in the worlds list...
    return <AssnIde
      {...this.props}
      prompt = {this.getPrompt()}
      equalsIgnore = {[
        'karelRow',
        'karelCol',
        'karelDir'
      ]}
      assignment = "section1"
      onwards = {null}
      faqUrl = {null} 
      worlds = {[
        {
          'name':'Hospital1.w',
          'world':this.getWorld()
        },
        {
          'name':'Hospital2.w',
          'world':this.getWorld2()
        }
      ]}
    />
  }

  getPrompt() {
    return (
      <div className="p-4" style={{overflow:'hidden'}}>
        <h2>Hospital Karel</h2>
        <div className="card bg-light mb-3">
          <div className="card-body" style={{padding:'0.75rem'}}>
            <p className="card-text"><b>Your task</b>: Write a program to implement the Hospital Building Karel project. Remember that your program should work for different worlds.
            </p>

          </div>
        </div>
        <p>Countries around the world are dispatching hospital-building robots to make sure anyone who gets sick can be treated. They have decided to enlist Karel robots. Your job is to program those robots.
Karel begins at the left end of a row that might look like this:</p>

      <KarelWorld
          makeAccessible={this.props.makeAccessible}
          {...this.getWorld()}
        />
        <p></p>


        <p>Each beeper in the figure represents a pile of supplies. Karel’s job is to walk along the row and build a new hospital in the places marked by each beeper. Each hospital should look exactly like the picture below (two columns of three beepers)
</p>

        <p>The new hospital should start at the corner at which the pile of supplies. At the end of the run, Karel should be at the end of the row having created a set of hospitals. For the initial conditions shown, the result would look like this:
</p>

      <KarelWorld
          width={60}
          height={60 * (3/2)}
          nRows={3}
          nCols={2}
          karelCol={-10}
          stones={[
            {r:0,c:0,n:1},
            {r:1,c:0,n:1},
            {r:2,c:0,n:1},
            {r:0,c:1,n:1},
            {r:1,c:1,n:1},
            {r:2,c:1,n:1}
          ]}
        />
        <p></p>

        <p>After your program finishes, Karel's world should have no beepers:
        <KarelWorld
          width={500}
          height={500 * (6/15)}
          makeAccessible={this.props.makeAccessible}
          {...this.getGoal()}
        />
        </p>

        <p>
          You may also assume that there will always be space for a hospital. 
        </p>

        <p><b>Confused?</b> No worries. This problem uses material from chapter 5 in the <a target="_blank" href={READER_URL}>karel reader</a>. Have you read that yet?</p>
      </div>
    )
  }

  getStartBeepers() {
    return [
      {r:5,c:2, n:1},
      {r:5,c:8, n:1},
      {r:5,c:12, n:1}
    ]
  }

  getGoalBeepers() {
    let startBeepers = this.getStartBeepers()
    let allBeepers = []
    for (var i = 0; i < startBeepers.length; i++) {
      var next = startBeepers[i]
      allBeepers.push(next) 
      allBeepers.push({r:4,c:next.c,n:1})
      allBeepers.push({r:3,c:next.c,n:1})  

      allBeepers.push({r:5,c:next.c+1,n:1})
      allBeepers.push({r:4,c:next.c+1,n:1})
      allBeepers.push({r:3,c:next.c+1,n:1}) 
    }
    return allBeepers
  }

  getWorld() {
    return {
      nRows :6,
      nCols :15,
      stones : this.getStartBeepers()
    }
  }

  getWorld1() {
    return {
      nRows :12,
      nCols :15,
      stones : [
        {r:11,c:2, n:1},
        {r:11,c:8, n:1},
        {r:11,c:12, n:1}
      ]
    }
  }

  getWorld2() {
    return {
      nRows :7,
      nCols :8,
      stones : [
        {r:6,c:0, n:1},
        {r:6,c:3, n:1},
        {r:6,c:6, n:1}
      ]
    }
  }

  getGoal() {
    return {
      nRows :6,
      nCols :15,
      stones: this.getGoalBeepers()
    }
  }
}