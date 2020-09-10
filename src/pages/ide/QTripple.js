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

export class QTripple extends Component {
  componentWillMount() {
    document.title = "Tripple";
  }

  static getKey() {
    return 'tripple'
  }

  static faqUrl() {
    return null
  }

  static starterCode() {
    return `from karel.stanfordkarel import *

# File: triple.py
# -----------------------------
# Write a program, using only karel featuers,
# which solve the triple problem
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
        {'name':'TripleKarel.w', 'world':this.getTrippleKarelWorld()},
        {'name':'Triple1.w', 'world':this.getTripple1()},
        {'name':'Triple2.w', 'world':this.getTripple2()},
        {'name':'Triple3.w', 'world':this.getTripple3()},
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
        <h2>Triple Karel</h2>
        <div className="card bg-light mb-3">
          <div className="card-body" style={{padding:'0.75rem'}}>
            <p className="card-text"><b>Your task</b>: Write a program to implement the Hospital Building Karel project. Remember that your program should work for different worlds.
            </p>

          </div>
        </div>
        <p>Your first task is to help Karel paint the exterior of some oddly-shaped buildings using beepers!
For this problem, Karel starts facing west next to a “building” (represented by a rectangle,
constructed from walls) whose sides span one or more corners. Karel’s goal is to paint all of the
buildings present in the world by placing beepers along three of the sides of each of the buildings.
</p>
<p>We recommend breaking down the problem into the following steps:

<ol>
<li>First, Karel should paint one side of the rectangle, placing beepers on all corners that are
adjacent to the wall of the building. Note that there’s a boundary detail here: the last
square where Karel ends should not have a beeper on it.</li>
<li>Next, Karel should accomplish the task of painting a single rectangle. Think about how
you can use the functionality of the previous subtask to help you accomplish this goal. You
may need to write a small amount of code to reposition Karel in between painting
individual walls of a building.</li>
<li>Finally, the overall TripleKarel problem is just painting all three buildings in the world.
Again, you may need to write a small amount of code to reposition Karel in between
painting individual buildings.</li>

</ol>
</p>
<p>
You can assume that:
<ul>
<li>Karel will always start facing west at the upper right corner of the leftmost building (at the
position where the first beeper should be placed).</li>
<li>Karel will have infinite beepers in his beeper bag, so he can paint any size of buildings</li>
<li>Although buildings may be of varying sizes, there will always be exactly three of them,
and their relative position to one another will always be the same (as displayed in Figure
4). If you are still confused about what assumptions you can make about the world, see
the additional Triple world files we have included.</li>
</ul>
</p>

         </div>
    )
  }

  getRectangle(rStart, cStart, width, height) {
    let walls = []
    for (var i = 0; i < width; i++) {
      let col = cStart + i
      walls.push({'r': rStart, 'c': col, 'd': 'North'})
      walls.push({'r': rStart+height, 'c': col, 'd': 'North'})
    }
    for (var i = 0; i < height; i++) {
      var row = rStart + i
       walls.push({'r': row, 'c': cStart-1, 'd': 'East'})
        walls.push({'r': row, 'c': cStart+width-1, 'd': 'East'})

    }
    return walls
  }

   getTripple3() {
    let walls = []
    walls.push(...this.getRectangle(2, 3, 4, 5))
    walls.push(...this.getRectangle(4, 9, 4, 2))
    walls.push(...this.getRectangle(7, 8, 1, 1))
    return {
      nRows:10,
      nCols:15,
      walls:walls,
      karelCol :6,
      karelRow :1,
      karelDir :'West',
    }
  }

   getTripple2() {
    let walls = []
    walls.push(...this.getRectangle(3, 2, 1, 5))
    walls.push(...this.getRectangle(8, 4, 12, 1))
    walls.push(...this.getRectangle(3, 16, 4, 4))
    return {
      nRows:13,
      nCols:25,
      walls:walls,
      karelCol :2,
      karelRow :2,
      karelDir :'West',
    }
  }

  getTripple1() {
    let walls = []
    walls.push(...this.getRectangle(3, 2, 1, 1))
    walls.push(...this.getRectangle(2, 5, 1, 1))
    walls.push(...this.getRectangle(4, 4, 1, 1))
    return {
      nRows:8,
      nCols:10,
      walls:walls,
      karelCol :2,
      karelRow :2,
      karelDir :'West',
    }
  }

  getTrippleKarelWorld() {
    let walls = []
    walls.push(...this.getRectangle(3, 1, 4, 3))
    walls.push(...this.getRectangle(2, 9, 2, 3))
    walls.push(...this.getRectangle(6, 6, 3, 3))
    return {
      nRows:11,
      nCols:12,
      walls:walls,
      karelCol :4,
      karelRow :2,
      karelDir :'West',
    }
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