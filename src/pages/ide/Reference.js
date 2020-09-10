import React, { Component } from "react";

import "./Reference.css"

export class Reference extends Component {

  render(){
    return <div className="d-flex justify-content-center">
      <div className="reference">

        <h1> Reference </h1>
        <hr/>

        <p>
          A cheat-sheet with the structure of the Karel programming language:
        </p>

        <div className="refCard bordered">
          <div className="refCol">
            <div className="refCel bordered">
              <b>Base Karel commnds:</b>
              
              <p className="refCode">
                <code>move()</code><br/>
                <code>turn_left()</code><br/>
                <code>put_beeper()</code><br/>
                <code>pick_beeper()</code><br/>
              </p>
            </div>

            <div className="refCel bordered">
              <b>Karel program structures:</b>
              
              <p className="refCode">
                <code className="comment"># Comments can be included in any part<br/>
        # of a program. They start with a #<br/>
        # and include the rest of the line.<br/></code>
                <br/>
                <code><span className="keyword">def</span> main() :</code><br/>
                <code>&nbsp;&nbsp;&nbsp;</code><i className="demoText">code to execute</i><br/>
                <br/>
                <i className="demoText">declarations of other functions</i><br/>
              </p>
            </div>

            <div className="refCel bordered">
              <b>Names of the conditions:</b>
              
              <div className="refCard" style={{"marginTop":"7px"}}>
                <div className="refCol">
                  <code>front_is_clear()</code><br/>
                  <code>beepers_present()</code><br/>
                  <code>beepers_in_bag()</code><br/>
                  <code>left_is_clear()</code><br/>
                  <code>right_is_clear()</code><br/>
                  <code>facing_north()</code><br/>
                  <code>facing_south()</code><br/>
                  <code>facing_east()</code><br/>
                  <code>facing_west()</code><br/>
                  
                </div>
                <div className="refCol">
                  <code>front_is_blocked()</code><br/>
                  <code>no_beepers_present()</code><br/>
                  <code>no_beepers_in_bag()</code><br/>
                  <code>left_is_blocked()</code><br/>
                  <code>right_is_blocked()</code><br/>
                  <code>not_facing_north()</code><br/>
                  <code>not_facing_south()</code><br/>
                  <code>not_facing_east()</code><br/>
                  <code>not_facing_west()</code><br/>
                </div>
              </div>
              <div style={{"height":"8px"}}> </div>
              
            </div>


            
          </div>

          <div className="refCol">
            <div className="refCel bordered">
              <b>Conditions:</b>
              <p className="refCode"><code><span className="keyword">if</span> </code><i className="demoText">condition</i><code>:</code><br/><i className="demoText" style={{"marginLeft":"2em"}}>code run if condition passes</i></p>

              <p className="refCode" style={{"marginTop":"15px"}}><code><span className="keyword">if</span> </code><i className="demoText">condition</i><code>:</code><br/><i className="demoText" style={{"marginLeft":"2em"}}>code block for "yes"</i><br/><code><span className="keyword">else</span>:</code><br/><i className="demoText" style={{'marginLeft':'2em'}}>code block for "no"</i></p>
            </div>
            <div className="refCel bordered">
              <b>Loops:</b>
              <p className="refCode"><code><span className="keyword">for</span> i in range(</code>&nbsp;<i className="demoText" >count</i><code>):</code><br/><i className="demoText" style={{"marginLeft":"2em"}}>code to repeat</i></p>

              <p className="refCode" style={{"marginTop":"15px"}}><code><span className="keyword">while</span> </code><i className="demoText">condition</i><code>:</code><br/><i className="demoText" style={{"marginLeft":"2em"}}>code to repeat</i></p>
            </div>

            <div className="refCel bordered">
              <b>Function Declaration:</b>
              <p className="refCode"><code><span className="keyword">def</span></code><i className="demoText ml-2" >name</i><code>():</code><br/><i className="demoText" style={{"marginLeft":"2em"}}>body of the function.</i><br/></p>
            </div>
            

            <div className="refCel bordered">
              <b>Additional commands:</b>
              
              <p className="refCode">
                <code>random(</code><i className="demoText">p</i><code>)</code><br/>
                <code>paint_corner(</code><i className="demoText">color</i><code>)</code><br/>
              </p>
              <div style={{"height":"25px"}}> </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  }
}

