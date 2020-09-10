/* tslint:disable */
import React, { Component } from "react";
import firebase from "firebase";
import { useDebounce } from "use-debounce";
import { useAuthState } from "react-firebase-hooks/auth";
import { Container, Form } from "react-bootstrap";
import SplitPane from "react-split-pane";
import AceEditor from "react-ace";

import KarelPythonCompiler from "../../components/Karel/compiler/karelPythonCompiler.js"
import KarelWorld from "../../components/Karel/KarelWorld.js"
import {KarelEquality} from "../../components/Karel/KarelEquality.js"

import { translate } from "../../minions/translator.js"
import Button from 'react-bootstrap/Button';
import IdeNav from './IdeNav.js'
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'

import history from '../../history';

import Swal from 'sweetalert2'
import Iframe from 'react-iframe'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome } from '@fortawesome/free-solid-svg-icons'
import { faClock } from '@fortawesome/free-solid-svg-icons'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { faWalking } from '@fortawesome/free-solid-svg-icons'
import { faRunning } from '@fortawesome/free-solid-svg-icons'
import {faPlay} from '@fortawesome/free-solid-svg-icons'
import {faSyncAlt} from '@fortawesome/free-solid-svg-icons'
import {faPuzzlePiece} from '@fortawesome/free-solid-svg-icons'
import {faShoePrints} from '@fortawesome/free-solid-svg-icons'

import {isMobileOnly} from "react-device-detect";

import "brace/mode/json";
import "brace/mode/java";
import "brace/mode/html";
import "brace/mode/python";
import "brace/theme/eclipse.js";

const WORLD_SIZE = 360
const MS_PER_HEARTBEAT_SLOW = 1000
const SPEED_VALUE_MAX = 10

// const FAQ_URL = 'https://docs.google.com/document/d/e/2PACX-1vQI0PBFfq8ErMGueHACNgcHgF1zMRKrdQ-i1WpD38Vko4bwYf6_Gy7GBpx9lJeYqt-4zrIjqCKHd_Pl/pub?embedded=true'
// const QUESTION_FAQ_HTML = `
// <iframe style="width:720px;height:80vh" src="https://docs.google.com/document/d/e/2PACX-1vQI0PBFfq8ErMGueHACNgcHgF1zMRKrdQ-i1WpD38Vko4bwYf6_Gy7GBpx9lJeYqt-4zrIjqCKHd_Pl/pub?embedded=true"></iframe>`

const getFaqFrame = function(url) {
  if(!url) return null
  return `<iframe
    style="width:720px; height:80vh"
    src="${url}"
  ></iframe>`
}

class AssnIdePage extends Component {
  compiler = null;
  heartbeatTimeout = null;

  componentWillMount() {
    this.setState({
      isReset:true,
      isRunning:false,
      status:'Karel is ready to run.',
      speed:5,
      currWorldName:this.props.worlds[0].name
    })
  }

  reset() {
    let editor = this.refs.editor
    editor.editor.clearSelection();
    this.stop();
    this.refs.world.reset(() => {
      this.setState({
        isReset:true,
        isRunning:false,
        status:'Karel is ready to run.'
      })
    })
  }

  componentWillUnmount(){
    this.stop();
  }

  run() {
    this.setState({
      isReset:false,
      isRunning:true
    }, () => {
      let world = this.refs.world
      let editor = this.refs.editor
      this.higlightLine(editor, 0)

      let codeText = this.props.data
      this.compiler = new KarelPythonCompiler(world)

      let compileResult = this.compiler.compile(codeText)


      if(compileResult.status != 'success') {
        // let error = eval(compileResult.error.message) // errors return json strings
        let error = null
        try{
          error = JSON.parse(compileResult.error.message)
        } catch(e) {
          error = {msg:compileResult.error.message,lineNumber:null}
        }
        this.compilerWarning(error)
        this.setState({
          isReset:true,
          isRunning:false
        })
      } else {
        editor.editor.getSession().clearAnnotations()
        this.setState({
          status:<span>Karel is running...</span>
        }, () =>
          this.heartbeat(editor, () => this.executionComplete())
        )
      }
    })
  }

  stop(){
    if (this.heartbeatTimeout != null){
      clearTimeout(this.heartbeatTimeout);
    }
    if (this.compiler != null) {
      this.compiler.stop();
      this.compiler = null
    }
  }

  executionComplete() {
    this.setState({
        isRunning:false,
        status:'Karel finished running.'
      })
    // this code used to check if the problem was solved. 
    // It got a lot more compelex when I added in multiple worlds...
    // for now Im "dropping" this featue

    // let solved = KarelEquality.stateEquals(this.refs.world,this.props.goal,this.props.equalsIgnore)
    // if(solved) {
    //   this.props.setSolved()
    //   this.setState({
    //     isRunning:false,
    //     status:'You solved the exercise!',
    //   })
    //   if(this.props.onwards) {
    //     Swal.fire({
    //       title: 'Good times!',
    //       text: "You solved the exercise",
    //       icon:"success",
    //       showCancelButton: true,
    //       confirmButtonText: 'Onwards!',
    //       cancelButtonText: 'Keep Working'
    //     }).then((result) => {
    //       let shouldGoHome = result.value
    //       if(result.value){
    //         console.log('go home')
    //         window.location = '#/splash';
    //       }
    //     })
    //   } else {
    //     this.setState({
    //       isRunning:false,
    //       status:"Karel finished running but didn't solve the problem."
    //     })
    //   }
    // } else {
    //   this.setState({
    //     isRunning:false,
    //     state:'Karel finished running.'
    //   })
    // }

  }

  compilerWarning(error) {
    // make the message
    let lineNumMsg = <span></span>
    if(error.lineNumber){
      lineNumMsg = <span>On line number {error.lineNumber+1}. </span>
    }

    // console output
    let newStatus = (
      <div className="alert alert-warning" role="alert">
        <p>Karel can't run because there is a typo in your code:</p>
        <p><code>{error.msg}</code></p>
        <p>{lineNumMsg}Fix the typo and try to run again.</p>
      </div>
    )
    this.setState({
      status:newStatus
    })

    // show error on the editor
    if(error.lineNumber) {
      let editor = this.refs.editor.editor
      editor.getSession().setAnnotations([{
        row: error.lineNumber,
        column: 0,
        text: error.msg, // Or the Json reply from the parser
        type: "error" // also "warning" and "information"
      }]);
    }
  }

  higlightLine(editor, lineNum) {
    editor.editor.clearSelection();
    editor.editor.moveCursorTo(lineNum)
  }

  getMsPerHeartbeat() {
    // speedValue: number between 0 and SPEED_VALUE_MAX inclusive
    // 0 should map to MS_PER_HEARTBEAT_SLOW
    // SPEED_VALUE_MAX should map to 0
    // linear interpolation is fine
    let speedValue = this.state.speed
    // value in the range 0 (fast) to 1 (slow)
    let slownessValue = (SPEED_VALUE_MAX - speedValue)/ SPEED_VALUE_MAX

    return slownessValue * MS_PER_HEARTBEAT_SLOW

  }

  heartbeat(editor, callback) {
    // execute one step
    this.compiler.executeStep((results) => {
      // when finished executing, do another
      // (unless you are done) in 400ms
      if(!results.isDone) {
        this.heartbeatTimeout = setTimeout(() => {
          this.heartbeat(editor, callback)
        }, this.getMsPerHeartbeat())
      } else {
        if(callback) callback()
      }
      let lineNum = results.lineNumber
      if(lineNum) {
        this.higlightLine(editor, lineNum)

      }
    }, () => {
      this.setState({
        isRunning:false,
        status:'Karel crashed.'
      })
    })
  }

  onCodeChange(newCode) {
    const sanitized = newCode.split('\t').join('   ')
    this.props.setData(sanitized)
  }

  setWorld(worldName) {
    this.stop()
    this.setState({
      currWorldName:worldName
    }, () => {
      let newWorld = this.getCurrWorld()
      this.refs.world.setNewWorld(newWorld)
      this.setState({
        isReset:true,
        isRunning:false,
        status:'Karel is ready enjoying a new world.'
      })
    })
  }

  worldEditorResize() {
    this.refs.world.resize()
    
  }

  render() {
    let content = null
    let showDesktop = isMobileOnly != undefined && !isMobileOnly

    if(showDesktop) {
      content = (
        <SplitPane onChange={() => this.worldEditorResize()} style={{height:'calc(100% - 54px)'}} split="vertical" primary="first" defaultSize="560px" minSize={5} maxSize={-5} className="">
          {this.renderPrompt()}
          <SplitPane onChange={() => this.worldEditorResize()} statusyle={{height:'calc(100%)'}} split="vertical" primary="first" defaultSize={'45%'} minSize={WORLD_SIZE + 25} maxSize={-5} className="">
            {this.renderWorld()}
            <div className="flex-grow-1 h-100">
              {this.renderEditor()}
            </div>

          </SplitPane>
        </SplitPane>
      )
    } else {
      content = (
        <div>
          <div className="alert alert-warning"><b>Heads up:</b> You can't program karel from a mobile device.</div>
          {this.renderPrompt()}
        </div>
      )
    }
    return (
      <div className="d-flex flex-column" style={{height:'100vh'}}>
        <IdeNav isMobile = {isMobileOnly} faqHtml = {getFaqFrame(this.props.faqUrl)}/>
        <div >
          {content}
        </div>
      </div>
    );
  }

  renderPrompt() {
    return (
      <div style={{textAlign:'justify'}}>
        
        <div className="container container-narrow p-0">
          <div className="row">
            <div className="col">
            {this.props.prompt}
              <hr/>

            </div>
          </div>
        </div>
      </div>
    )
  }

  renderWorldChoices() {
    let options = []
    for (var i = 0; i < this.props.worlds.length; i++) {
      let nextWorld = this.props.worlds[i]
      let name = nextWorld.name
      let nextOption = <Dropdown.Item onClick={() => this.setWorld(name)}>{name}</Dropdown.Item>
      options.push(nextOption)
    }
    return options
  }

  renderWorldChooser() {
    if(!('worlds' in this.props)) return <h2>World:</h2>
    return (
      <div className="d-flex justify-content-between align-items-stretch">
        <h2>World:</h2>
        <DropdownButton variant="light" id="dropdown-basic-button" title={this.state.currWorldName}>
          {this.renderWorldChoices()}
        </DropdownButton>
      </div>
    )
  }

  getCurrWorld() {
    let key = this.state.currWorldName
    for (var i = 0; i < this.props.worlds.length; i++) {
      let nextWorld = this.props.worlds[i]
      if(key === nextWorld.name){
        return nextWorld.world
      }
    }
    return null
  }

  renderWorld() {
    // jank fix for non-square world
    // note that we dont use props to render the world
    // after the initial render.
    let world = this.props.worlds[0].world
    const {nRows, nCols} = {...world};
    return (
      <div className="p-4 d-flex flex-column">
        {this.renderWorldChooser()}
        <div className="mb-2">
          <KarelWorld
            ref="world"
            makeAccessible={this.props.makeAccessible}
            {...world}
          />
        </div>
        <div className ="d-flex">
          {this.renderRunResetButton()}
          {this.renderSpeedController()}
        </div>

        {this.renderStatus()}
      </div>
    )
  }

  onSpeedChange(e) {
    let newValue = e.target.value
    this.setState({
      speed:newValue
    })
  }

  renderStatus() {
    return (
      <div className="w-100 mt-3" style={{maxWidth:WORLD_SIZE}}>
        {this.state.status}
      </div>
    )
  }

  renderEditor() {

    return (
      <div className="pt-4 d-flex flex-column h-100">
        <h2 className=" pl-4 pr-4 ">Editor:</h2>
        <AceEditor
          height="100%"
          width="100%"
          mode="python"
          theme="eclipse"
          fontSize="15px"
          onChange={e => this.onCodeChange(e)}
          name="codeEditor"
          value={this.props.data}
          readOnly={this.state.isRunning}
          ref="editor"
          highlightActiveLine = {true}
          editorProps={{$blockScrolling: true}}
          tabSize={3}
        />
      </div>
    );
  }

  renderSpeedController() {
    return (
      <div className="d-flex align-items-center ml-4" style={{height:50}}>
        <FontAwesomeIcon icon={faWalking} style={{fontSize:24}}/>
        <Form.Control
          className="slider primary custom-range"
          min={0} max={SPEED_VALUE_MAX} step={1}
          style={{margin:10}}
          bsStyle={'primary'}
          type="range"
          custom={true}
          onChange={(e)=>this.onSpeedChange(e)}
          value={this.state.speed}
        />
        <FontAwesomeIcon icon={faRunning} style={{fontSize:24}}/>
      </div>
    )
  }

  renderRunResetButton() {
    if(this.state.isReset) {
      return <Button className="ideButton wideButton" size="lg" onClick = {() => this.run()}>
        <FontAwesomeIcon icon={faPlay}/> &nbsp;{translate('Run')}
      </Button>
    } else {
      return <Button className="ideButton wideButton" size="lg" onClick = {() => this.reset()}>
        <FontAwesomeIcon icon={faSyncAlt}/> &nbsp; {translate('Reset')}
      </Button>
    }
  }
}

export function AssnIde(props) {
  return <AssnIdePage {...props} />;
}