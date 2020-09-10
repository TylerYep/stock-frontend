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

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faEdit, faGlobeAfrica, faClock, faCheck, faCode,faHiking, faBookOpen, faThLarge, faFilePdf, faFileUpload, faQuestion, faCalendar, faEnvelope, faVideo, faBook, faAppleAlt } from '@fortawesome/free-solid-svg-icons'



import{CourseNav} from '../CourseNav.js'
import FinalProjectImg from '../img/assn/finalProject.png'
import BreakoutImg from '../img/assn/breakout.png'
import BreakoutBricks from '../img/assn/bricks.png'
import BreakoutCollision from '../img/assn/breakoutCollision.png'

export class Breakout extends Component {

	render() {
		return (
			<div>
				<CourseNav userName={this.props.userName}/>
				{this.renderBody()}
			</div>
		)
	}

    

	renderBody() {
		return (

	<div className="container container-course">
        <div className="row">
            <div className="col-sm-12">
                <div id="pageHeader">
                    <br />
                    <h1>
                        BrickBreaker
                    </h1>
                    <p className="subtleHeading"><span className="sidebaricon glyphicon glyphicon-calendar"
                            aria-hidden="true"></span>Goal deadline: Monday, May 25th, 11:59PM Anywhere on Earth. Submit by May 29th to get on the public website.
                    </p>

                </div>
                <hr />
                
                <div className="alert"></div>
            </div>
        </div>





        <div className="row">
            <div className="col-sm-12">
             <h2>Assignment Files</h2>
                <p>
                    <div className="row">
                        
                        <div className="col-sm-2 text-center"><a href="//codeinplace2020.github.io/faqs/BrickBreaker.zip">
                            <FontAwesomeIcon icon={faCode} aria-hidden="true" style={{
                                "fontSize": "5em",
                                "marginLeft":"0px"
                            }}/>
                            <br /><br /><span
                                    className="ml-0">PyCharm Project</span></a>
                        </div>
                        
                       {/*<div className="col-sm-2 text-center"><a target="_blank" href="#/handout/submissionA3.html">
                            <FontAwesomeIcon icon={faCheck} aria-hidden="true" style={{
                                "fontSize": "5em",
                                "marginLeft":"0px"
                            }}/>
                            <br /><br /><span
                                    className="ml-0">Submit</span></a>
                        </div>*/}

                    </div>
                    <br />
                </p>

                <p>
                Your job in this assignment is to write the classic arcade game of BrickBreaker, which was invented by Steve Wozniak before he founded Apple with Steve Jobs (moment of silence). It is a large assignment, but entirely manageable as long as you break the problem up into pieces.
                </p>


                <h2>The BrickBreaker Game</h2>
                <p>In Breakout, the initial configuration of the world appears as shown on the right. The colored rectangles in the top part of the screen are bricks, and the slightly larger rectangle at the bottom is the paddle. The paddle is in a fixed position in the vertical dimension, but moves back and forth across the screen along with the mouse until it reaches the edge of its space.</p>

                <p>
                    <center>
                        <img style={{"width":"100%", 'maxWidth':800}}src={BreakoutImg}></img>
                    </center>
                    <br /><br />
                </p>

                <p>A complete game consists of three turns. 
                On each turn, a ball is launched from the center of the window toward the bottom of the screen at a random angle. 
                That ball bounces off the paddle and the walls of the world, in accordance with the physical principle 
                generally expressed as "the angle of incidence equals the angle of reflection" 
                (which turns out to be very easy to implement as discussed later in this handout). 
                Thus, after two bounces--one off the paddle and one off the right wall--the ball might have the trajectory
                 shown in the second diagram. (Note that the dotted line is there to show the ball's path and won't appear on the screen.)</p>

                <p>
                    As you can see from the second diagram, the ball is about to collide with one of the bricks on the bottom row.  When that happens, the ball bounces just as it does on any other collision, but the brick disappears.  The third diagram shows what the game looks like after that collision and after the player has moved the paddle to put it in line with the oncoming ball.
                </p>

                <p>
                    The play on a turn continues in this way until one of two conditions occurs: 
                    </p>

                <ol>
                        <li>The ball hits the lower wall, which means that the player must have missed it with the paddle.  In this case, the turn ends and the next ball is served if the player has any turns left.  If not, the game ends in a loss for the player.</li>
                        <li>The last brick is eliminated.  In this case, the player wins, and the game ends immediately.</li>
                    </ol>

                <p>
                    Success in this assignment will depend on breaking up the problem into manageable pieces and getting each one working before you move on to the next.  The next few sections describe a reasonable staged approach to the problem.
                </p>
                


               

                <h2>1. Create bricks</h2>

                <p>
                    Before you start playing the game, you have to set up the various pieces.  An important part of the setup consists of creating the rows of bricks at the top of the game, which look like this:
                </p>
                <center><img src={BreakoutBricks} /></center>
                <p></p>
                <p>
                    The number, dimensions, and spacing of the bricks are specified using 
                     constants in the starter file, as is the distance from the top of the 
                     window to the first line of bricks. 
                     Initially you can make all the bricks 'red'. If you feel like adding some color
                     you can color every two rows in
                      the following rainbow-like sequence: 'red', 'orange', 'yellow', 'green', 'cyan'.
                </p>

                <h2>2. Add a bouncing ball</h2>

                <p>At one level, creating the ball is easy, given that it's just a filled oval. 
                The interesting part lies in getting it to move and bounce appropriately. 
                To start, create a ball and put it in the center of the window.
                 As you do so, keep in mind that the coordinates of the create_oval function do not specify the location of 
                 the center of the ball but rather its upper left corner and bottom right corner.</p>

                 <p>The program needs to keep track of the how much to move the ball each animation heart-beat, which consists of two separate 
                 components, which you will presumably declare as variables like this:</p>

                <div className="card">
  <div className="card-body">
<code>change_x = 10<br/>
change_y = 10</code>
  </div>
</div>
<p></p>

                <p>
                    The "change" components represent the change in position that occurs on each animation time step.  
                    Initially, the ball should be heading downward, and you might try a starting velocity of +10.0 
                    for chnage_x and change_y. 
                </p>

                <p>
                    Recall that there are two ways to move an object in the python graphics library:

<div className="card">
  <div className="card-body">
<code># Move the object to a specific new_x, new_y<br/>
# Note this doesn't work in some old versions of tkinter<br />
canvas.moveto(object, new_x, new_y)<br/>
<br/>
# Increase the x coordinate by change_x and the y coordinate by change_y<br/>
canvas.move(object, change_x, change_y)</code>
  </div>
</div>
                    

        </p>

                <p>
                    Once you've created your ball and the change variables, your next challenge is to get the ball to bounce around the 
                    world, ignoring entirely the bricks. This will require that you program an "animation loop" where you move the ball and then pause.
                    Then you can consider how to make the ball bounce. To do so, you need to check to see if the coordinates of the ball have gone beyond the 
                    boundary. Thus, to see if the ball has bounced off the right wall, you need to see whether the coordinate of the right 
                    edge of the ball has become greater than the width of the window; the other three directions are treated similarly.  
                    For now, have the ball bounce off the bottom wall so that you can watch it make its path around the world.
                </p>

                <p>You might find these helper methods useful. They allow you to get the left and top coordinates of a graphical object:</p>

<div className="card">
  <div className="card-body">
<code>def get_top_y(canvas, object):<br/>
&nbsp;&nbsp;&nbsp;&nbsp;return canvas.coords(object)[1]<br/>
<br/>
def get_left_x(canvas, object):<br/>
&nbsp;&nbsp;&nbsp;&nbsp;return canvas.coords(object)[0]</code>
  </div>
</div>
<p></p>

    <p>
                    Computing what happens after a bounce is simple.  If a ball bounces off the top or bottom wall, all you need to do is reverse the sign of change_y.  
                    Symmetrically, bounces off the side walls simply reverse the sign of change_x.
                </p>

                <h2>3. Add the paddle</h2>


                <p>The next step is to create the paddle. There is only one paddle, which is a filled rectangle. 
                You even know its position relative to the bottom of the window.</p>

                <p>The challenge in creating the paddle is to make it track the mouse. 
                Here, however, you only have to pay attention to the x coordinate of the mouse because the y position of the paddle is fixed.</p>

                <p>Each time through the animation loop, ask for the location of the mouse and move the rectangle representing the paddle.
                To get the location of the mouse you can use the canvas function <code>winfo_pointerx</code></p>

<div className="card">
  <div className="card-body">
<code>mouse_x = canvas.winfo_pointerx()</code>
  </div>
</div>
<p></p>
                <pre></pre>

                <h2>4. Check for Collisions</h2>

                <p>Now comes the interesting part.  In order to make BrickBreaker into a real game, you have to be able to tell whether the ball is colliding with another object in the window.  As scientists often do, it helps to begin by making a simplifying assumption and then relaxing that assumption later.  Suppose the ball were a single point rather than a circle.  In that case, how could you tell whether it had collided with another object?</p>
                
                <p>
                    There is a canvs function: canvas.find_overlapping(x_1, y_1, x_2, y_2) which returns a list of all objects that are overlapping the rectangle defined by the four coordinates.
                    </p>

                    <p>
                    The easiest thing to do, which is in fact typical of real computer games, is to check a larger bounding box for collision. Look for any objects in this rectangle:

                </p>

                


                

                <center><img style={{maxWidth:400}}src={BreakoutCollision} /></center>

<p>To get a list of objects that are overlapping the ball you can use code as follows. Note that the ball itself will be in the colliding_list:</p>

                <div className="card">
  <div className="card-body">
<code>
# this graphics method gets the location of the ball as a list<br/>
ball_coords = canvas.coords(ball)<br/>
# the list has four elements:<br/>
x_1 = ball_coords[0]<br/>
y_1 = ball_coords[1]<br/>
x_2 = ball_coords[2]<br/>
y_2 = ball_coords[3]<br/>
# we can then get a list of all objects in that area<br/>
colliding_list = canvas.find_overlapping(x_1, y_1, x_2, y_2)</code>
  </div>
</div>
<p></p>

                <p>If you get all overlapping objects in that rectangle, you will be returned a list. In that list will be the ball, as well as any object the ball is currently colliding with. 
                To test if a colliding object is the ball, you can simply check if the element is <code>==</code> to your ball variable.</p>
                <p>If the ball collides with the paddle you should make the ball bounce. If the ball collides with bricks you should remove all bricks and flip the direction of the change_y variable.</p>
            


                <h2>5. Extra Touches</h2>

                <p>If you've gotten to here, you've done all the hard parts.  There are, however, a few more details you could take into account if you have time.</p>
                
                <ol>
                    <li>Can you make your bricks rainbow colored like in the first image?</li>
                    <li>Take care of the case when the ball hits the bottom wall.  In the prototype you've been building, the ball just bounces off this wall like all the others, but that makes the game pretty hard to lose.  Modify your loop structure so that it tests for hitting the bottom wall as one of its terminating conditions.</li>
                    <li>Make your game play three turns!</li>
                    <li>Make it so that your ball bounces differently, depending on where it hits the paddle. If it hits the left of the paddle it bounces more to the left. If it hits the right of the paddle it bounces more to the right.</li>
                    <li>Check for the other terminating condition, which is hitting the last brick. How do you know when you've done so?  Although there are other ways to do it, one of the easiest is to have your program keep track of the number of bricks remaining.  Every time you hit one, subtract one from that counter.  When the count reaches zero, you must be done.  It would be nice to give the player a little feedback that at least indicates whether the game was won or lost.</li>
                    <li>Test your program to see that it works.  If you think everything is working, here is something to try: Just before the ball is going to pass the paddle level, move the paddle quickly so that the paddle collides with the ball rather than vice-versa.  Does everything still work, or does your ball seem to get "glued" to the paddle? This error occurs because the ball collides with the paddle, changes direction, and then collides with the paddle again before escaping. How can you fix this bug?</li>
                </ol>

                <h2>Demo</h2>
                <iframe style={{
                    width: '410px', 
                    height: '650px', 
                    border: 'none',
                  }}
                  src="https://web.stanford.edu/class/archive/cs/cs106a/cs106a.1164/assignments/Assignment3/Breakout/"
                ></iframe>

                <h2>Extensions</h2>
                <p>
                    If you have the basic play working well, then this would be a great opportunity to go above and beyond. We encourage you to use your imagination to come up with fun ideas.
                </p>

                <hr/>
            </div>
        </div>

    </div>
		)
	}

}