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

export class QPiles extends Component {
  static getKey() {
    return 'piles'
  }

  static faqUrl() {
    return 'https://codeinplace2020.github.io/assignment-zero-faq/'
  }

  static starterCode() {
    return `from karel.stanfordkarel import *

# File: piles.py
# -----------------------------
# The warmup program defines a "main"
# function which should make Karel
# pick up all the beepers in the world.
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
        'karelRow',
        'karelCol',
        'karelDir'
      ]}
      faqUrl = {QPiles.faqUrl()}
    />
  }

  getPrompt() {
    let completeTitle = this.props.isSolved ? <FontAwesomeIcon icon={faCheck} className="ml-2 text-success"/> : <span/>
    let completeDiscription = this.props.isSolved ? <span /> : <span className="badge badge-secondary ml-2"> Not Complete</span>
    return (
      <div className="p-4" style={{overflow:'hidden'}}>
        <h2>Piles Karel {completeTitle}</h2>
        <div className="card bg-light mb-3">
          <div className="card-body" style={{padding:'0.75rem'}}>
            <p className="card-text"><b>Your task</b>:
            Write a program in the editor, that makes Karel pick up all the beepers in this world.

            </p>

          </div>
        </div>


        <p>After your program finishes, Karel's world should have no beepers:
        <KarelWorld
          width={300}
          height={300 * (5/7)}
          makeAccessible={this.props.makeAccessible}
          {...this.getGoal()}
          karelCol={5}
        />
        </p>

        <p><b>Confused?</b> No worries. This problem uses material from chapter 5 in the <a href={READER_URL}>karel reader</a>. Have you read that yet?</p>
      </div>
    )
  }



  getGoalBeepers() {
    return [
      {r:4, c:1, n:10},
      {r:4, c:3, n:10},
      {r:4, c:5, n:10}
    ]
  }

  getWorld() {
    return {
      nRows :5,
      nCols :7,
      stones : this.getGoalBeepers()
    }
  }

  getGoal() {
    return {
      nRows :5,
      nCols :7,
    }
  }
}