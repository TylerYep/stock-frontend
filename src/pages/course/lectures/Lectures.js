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
import { faHome, faEdit, faGlobeAfrica, faClock, faBullhorn, faCode, faBookOpen, faThLarge, faFilePdf, faFileUpload, faQuestion, faCalendar, faEnvelope, faVideo, faBook, faAppleAlt } from '@fortawesome/free-solid-svg-icons'
import YouTube from 'react-youtube';


import{CourseNav} from '../CourseNav.js'
import KarelImg from '../img/assn/karel.png'

class LectureVideo extends Component {
    render() {
        var videos = []
        for (var i = 0; i < this.props.videos.length; i++) {
            let url = this.props.videos[i]
            let componentI =<div className="col-12 col-md-4">

                 {/*<iframe className="lectureVideo"
                 height="200px"
                        src={"https://www.youtube-nocookie.com/embed/"+url +'?rel=0&fullscreen=1'} frameborder="0"
                        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen={true}>
                </iframe>*/}
            </div>
            let component = <YouTube
                containerClassName="col-12 col-md-4"
                className="lectureVideo"
                videoId={url +'?rel=0'}
            />
            videos.push(component)
        }

        var hasFiles = this.props.codeUrl || this.props.slidesUrl

        return (
            <div id={this.props.id} className="card mb-2">
                <div className="card-body">
                    <h3 className="mt-1">{this.props.title}</h3>
                    <p className="subtleHeading">{this.props.when}</p>
                    <p><FontAwesomeIcon icon={faBullhorn}/> {this.props.annoucement}</p>
                    <div className="row">
                        {videos}
                    </div>

                    { hasFiles ?
                        <p>
                        <h4 className="mt-2">Lecture Files</h4>
                        <div className="mt-3 d-flex">
                            <div className="col-sm-2 text-center"><a target="_blank" href={`//codeinplace2020.github.io/faqs/${this.props.slidesUrl}`}>
                                <FontAwesomeIcon icon={faFilePdf} style={{
                                    "fontSize": "3em",
                                    "marginLeft":"0px"
                                }}/>
                                <br/><span className="ml-0">Slides</span></a>
                            </div>
                            { this.props.codeUrl ?

                                <div className="col-sm-2 text-center"><a target="_blank" href={`//codeinplace2020.github.io/faqs/${this.props.codeUrl}`}>
                                <FontAwesomeIcon icon={faCode} aria-hidden="true" style={{
                                        "fontSize": "3em",
                                        "marginLeft":"0px"
                                    }}/>
                                <br /><span
                                            className="ml-0">Lecture Code</span></a>
                                </div> :

                                null
                            }

                        </div>
                        </p> : null
                    }

                    <p><i>{this.props.notes}</i></p>
                  </div>
            </div>
        )
    }
}

export class LecturesWithData extends Component {

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
                        Lectures
                    </h1>


                </div>
                <hr />
            </div>
        </div>





        <div className="row">
            <div className="col-sm-12">
                <div className="alert alert-info">
                Lectures are released every Monday/Wednesday/Friday at 10am PDT.
                </div>

                <LectureVideo
                    title="Lecture 14 - Dictionaries"
                    when="May 13th, 2020"
                    annoucement = "Final projects start today!"
                    notes={<span>Learn how to work with dictionaries a new container</span>}
                    id="lecture14"
                    videos={[
                        'GyexyR1qwZE',
                        'iW6PlKk5XZk',
                        'vN9qV2hHbGk',
                        'IUTaANNVS_w',
                        'Pvcvy0W38T8',
                        'jx8u6dFUxpY'
                    ]}
                    slidesUrl='14-Dictionaries.pdf'
                    codeUrl='Lecture14.zip'
                />

                <LectureVideo
                    title="Lecture 13 - Text Procession"
                    when="May 13th, 2020"
                    annoucement = "Your last section is today! Submit your assignment 3."
                    notes={<span>Learn how to work with strings</span>}
                    id="lecture13"
                    videos={[
                        'BQQVnsE2DZI',
                        'xRhjkyJHFbE',
                        'MOhsuyHr6fU',
                        'fNChmzR6rVs',
                        'SnJYJHmNW7s',
                        '-cIzBBzTnK8',
                        'PB4tJZHdcAk',
                        'BbE4dnoAmXs'
                    ]}
                    slidesUrl='13-TextProcessing.pdf'
                    codeUrl='Lecture13.zip'
                />

                <LectureVideo
                    title="Lecture 12 - Lists"
                    when="May 11th, 2020"
                    annoucement = "The last assignment (images) is due on Wednesday"
                    notes={<span>Lists are truly useful for final projects</span>}
                    id="lecture12"
                    videos={[
                        'QioUAmUAIgE',
                        'A-NrRd9GyYg',
                        'vhknJZ-2Bzg',
                        'w4beNu04CMs',
                        'L_TyVmOQq-I'
                    ]}
                    slidesUrl='12-Lists.pdf'
                    codeUrl='Lecture12.zip'
                />

                <LectureVideo
                    title="Lecture 11 - Animations"
                    when="May 8th, 2020"
                    annoucement = "Have a great weekend. Finish your diagnostic by Sunday night"
                    notes={<span>Make graphics that move!</span>}
                    id="lecture11"
                    videos={[
                        'B8-lPPUU7eY',
                        'jz02xtVaBo8',
                        'frTXMIWSuq0',
                        'qjsxi3UzoA0',
                        'g0G4S_woMRA',
                        'XcvbczJF6CU'
                    ]}
                    slidesUrl='11-Animations.pdf'
                    codeUrl='Lecture11.zip'
                />

                <LectureVideo
                    title="Lecture 10 - Graphics"
                    when="May 6th, 2020"
                    annoucement = "Section today is directly helpful for your next assignment!"
                    notes={<span>Make a graphical program (first step towards movies and games)</span>}
                    id="lecture10"
                    videos={[
                        'h9nnz_QSzZA',
                        '3RMrC1wWyFE',
                        'SfiEWn9RCXM',
                        'Y9Qi-6TWwpM'
                    ]}
                    slidesUrl='10-Graphics.pdf'
                    codeUrl='Lecture10.zip'
                />

                <LectureVideo
                    title="Diagnostic Day"
                    when="May 4th, 2020"
                    annoucement = "We are giving you a day off so you have time to take the diagnostic"
                    notes={<span>May the 4th be with you</span>}
                    id="lectureD"
                    videos={[
                        'wnPd7RX_T5I',
                    ]}
                />

                <LectureVideo
                    title="Lecture 9 - Images"
                    when="May 1st, 2020"
                    annoucement = "The goal deadline for Assignment 2 is tonight!"
                    notes={<span>Edit photos from Python!</span>}
                    id="lecture9"
                    videos={[
                        'gjT_okH7HD8',
                        'iC82OUseeeY',
                        'aeGbb8wC56g',
                        'pAG9rAqA4N4',
                        'x0PpSbK4k_s',
                        'DhohL7AOzsw'
                    ]}
                    slidesUrl='9-Images.pdf'
                    codeUrl='Lecture9.zip'
                />

                <LectureVideo
                    title="Lecture 8 - Functions More Practice"
                    when="April 27th, 2020"
                    annoucement = "Whats the best way to master this concept? Going to section!"
                    notes={<span>More practice with functions is always a good time.</span>}
                    id="lecture8"
                    videos={[
                        'vMy48Q6aPk0',
                        'kZpiuJ1r3rg',
                        'rXtLAPxeSgI',
                        'vmzFKkyjo4o',
                        '8PCQndHgkPE'
                    ]}
                    slidesUrl='8-Parameters.pdf'
                    codeUrl='Lecture8.zip'
                />

                <LectureVideo
                    title="Lecture 7 - Functions Revisited"
                    when="April 27th, 2020"
                    annoucement = "Welcome back to week 3. If you haven't gotten started on assignment 2, its time to get going on it!"
                    notes={<span>Revisiting functions. Now with parameters and returns.</span>}
                    id="lecture7"
                    videos={[
                        'wY68LUvnJ04',
                        'hmcuptr9WBE',
                        'lZ8DGnIRsng',
                        'CS-BMynY5ko',
                        '8vXvRwj8fos'
                    ]}
                    slidesUrl='7-Functions.pdf'
                    codeUrl='Lecture7.zip'
                />

                <LectureVideo
                    title="Lecture 6 - Control Flow Python"
                    when="April 24th, 2020"
                    annoucement = "Have a wonderful weekend and we will see you back here on Monday."
                    notes={<span>Our old friends while/if/for, but now in native python.</span>}
                    id="lecture6"
                    videos={[
                        '60AMFkbGZGY',
                        'c6CZIQ3UFZE',
                        'Y_IWN4OxhlM',
                        'Y7evkU5j7TY',
                        '5BTJ4gVXaFQ',
                        'mVoerPV6YLY'
                    ]}
                    slidesUrl='6-ControlFlowRevisited.pdf'
                    codeUrl='Lecture6.zip'
                />

                <LectureVideo
                    title="Lecture 5 - Expressions"
                    when="April 22nd, 2020"
                    annoucement = "Please go to your second section! Support your section leader :-)"
                    notes={<span>The idea of variables is the next great idea in your computer science journey.</span>}
                    id="lecture5"
                    videos={[
                        'YwePpeJn828',
                        'iTBsRFnaoJ0',
                        'sAo9IdC223s',
                        'H90Ud28sedo',
                        'SQ2_cDLgrHI',
                        '_rMzEF0v6UI'
                    ]}
                    slidesUrl='5-Expressions.pdf'
                    codeUrl='Lecture5.zip'
                />

                <LectureVideo
                    title="Lecture 4 - Variables in Python"
                    when="April 17th, 2020"
                    annoucement = "The submission system will be coming online today. Recall that this class isn't for grade!"
                    notes={<span>The idea of variables is the next great idea in your computer science journey.</span>}
                    id="lecture4"
                    videos={[
                        'pkh2gDQ8tjM',
                        'wEbmXvfl8TM',
                        'oUuIMt5KmyQ'
                    ]}
                    slidesUrl='4-IntroPython.pdf'
                    codeUrl='Lecture4.zip'
                />

                <LectureVideo
                    title="Lecture 3 - Decomposition"
                    when="April 17th, 2020"
                    annoucement = "How can you solve large problems in Karel? Have a great weekend and see you on Monday!"
                    notes={<span>The Online Karel IDE can be found at the bottom of the <a href="#/assignment/karel"> assignment 1 handout</a>.</span>}
                    id="lecture3"
                    videos={[
                        'YFWUzglTrBQ',
                        'Cz-wnRvlAMI',
                        'ecqDCBm8tkY',
                        'JIQr_gtAWrc',
                        '62RtoSXfitU'
                    ]}
                    slidesUrl='3-Decomposition.pdf'
                    codeUrl='Lecture3.zip'
                />

                <LectureVideo
                    title="Lecture 2 - Control Flow in Karel"
                    when="April 15th, 2020"
                    id="lecture2"
                    annoucement = "After these videos you will be ready to get started on Assn 1. Many people started earlier. Great! But not the expectation."
                    notes="These ideas (for, while, if) are core fundamentals of computer science. Take your time to understand them!"
                    videos={[
                        'xAQlbo82EuU',
                        'yVmGFatf-Y8',
                        'S5y2u7VITMo',
                        'ACkcPIB5SZs',
                        'nxu8NBAv2pM'
                    ]}
                    slidesUrl='2-ControlFlow.pdf'
                    codeUrl='Lecture2.zip'
                />
                <LectureVideo
                    title="Lecture 1 - Welcome to Code in Place"
                    when="April 13th, 2020"
                    id="lecture1"
                    annoucement = "Try and watch this lecture and read the rest of the Karel reader by next lecture (in about 48 hours, or Wednesday 10am PDT)."
                    notes="We talked a bit slower than normal to make sure we were easy to understand. You can speed up the video! On Wednesday we will cover for loops, while loops and if statements"
                    videos={[
                        'dxZFXJhZPvU',
                        'ukpUVAhdo94',
                        'LpxjnuQwTg4'
                    ]}
                    slidesUrl='1-Welcome.pdf'
                />

                <hr/>
                <div style={{height:200}} />

            </div>
        </div>

    </div>
		)
	}

}