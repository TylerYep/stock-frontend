import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import EfesBroken from './images/q2_efesBroken.png'
import EfesRepaired from './images/q2_efesRepaired.png'

import {AssnIde} from './AssnIde.js'

export class QArches extends React.Component {

	static getKey() {
		return 'arches'
	}

	static starterCode() {
		return `# This is an editor! Write your solution here.
# Make karel create four columns of beepers
def main():
   put_beeper()
   `
	}

	render() {
		return <AssnIde
			{...this.props}
			worlds = {[
				{
					'world':this.getWorld(),
					'name':'StoneMasonKarel.w'
				}
			]}
			prompt = {this.getPrompt()}
		/>
	}

	getPrompt() {
		let complete = this.props.isSolved ? <b style={{color:'green'}}> Complete</b> : <b> Not Complete</b>

		return (
			<div className="p-4" style={{overflow:'hidden'}}>
				<h1>Build Arch Karel</h1>
				<hr/>
				<div className="card bg-light mb-3">
					<div className="card-body" style={{padding:'0.75rem'}}>
						<p className="card-text"><b>Your task</b>:
						Write a program to help Karel build the columns of the arch.
						{complete}
						</p>
					</div>
				</div>

				<p>
					Your second task is to repair the damage done to the Main Quad in the 1989 Loma Prieta
earthquake. In particular, Karel should repair a set of arches where some of the stones (represented
by beepers, of course) are missing from the columns supporting the arches, as illustrated below:</p>

				<div style={{width: "100%", textAlign: "center"}}>
					<img
						width="80%"
						src={EfesBroken}>
					</img>
				</div>

				<p>
					When Karel is done, the missing columns should be replaced by beepers, so the final picture would look like this:
				</p>

				<div style={{width: "100%", textAlign: "center"}}>
					<img
						width="80%"
						src={EfesRepaired}>
					</img>
				</div>

				<p>
					Karel may count on the following facts about the world, listed below:

					<ul>
						<li>Karel starts at 1st row and 1st col, facing east.</li>
						<li>The columns are exactly four squares apart, on 1st, 5th, 9th and 13th columns.</li>
						<li>Karel can assume that columns are always five units high.</li>
					</ul>
				</p>

				<p>Even though the program is only a few lines, it is still worth getting a little practice in decomposition. For example, it would make sense to have a build_column function.</p>

			</div>
		)
	}

	getGoal() {
		return {
			nRows :8,
			nCols :13,
			karelCol :12,
			karelRow :8,
			walls: this.getWalls(),
			stones : this.getStones()
		}
	}

	getWorld() {
		return {
			nRows :8,
			nCols :13,
			walls : this.getWalls(),
			stones: this.getInitStones()
		}
	}

	getInitStones() {
		return [
			{'r':3,'c':0,'n':1},
			{'r':4,'c':0,'n':1},
			{'r':4,'c':4,'n':1},
			{'r':6,'c':4,'n':1},
			{'r':7,'c':4,'n':1},
			{'r':3,'c':8,'n':1},
			{'r':5,'c':8,'n':1},
			{'r':3,'c':12,'n':1},
			{'r':5,'c':12,'n':1},
			{'r':7,'c':12,'n':1},
		]
	}

	getStones() {
		return [
		 {'r': 8, 'c': 0, 'n': 1},
		 {'r': 7, 'c': 0, 'n': 1},
		 {'r': 6, 'c': 0, 'n': 1},
		 {'r': 5, 'c': 0, 'n': 1},
		 {'r': 4, 'c': 0, 'n': 1},
		 {'r': 8, 'c': 4, 'n': 1},
		 {'r': 7, 'c': 4, 'n': 1},
		 {'r': 6, 'c': 4, 'n': 1},
		 {'r': 5, 'c': 4, 'n': 1},
		 {'r': 4, 'c': 4, 'n': 1},
		 {'r': 8, 'c': 8, 'n': 1},
		 {'r': 7, 'c': 8, 'n': 1},
		 {'r': 6, 'c': 8, 'n': 1},
		 {'r': 5, 'c': 8, 'n': 1},
		 {'r': 4, 'c': 8, 'n': 1},
		 {'r': 8, 'c': 12, 'n': 1},
		 {'r': 7, 'c': 12, 'n': 1},
		 {'r': 6, 'c': 12, 'n': 1},
		 {'r': 5, 'c': 12, 'n': 1},
		 {'r': 4, 'c': 12, 'n': 1}
		]
	}

	getWalls() {
		let old = [
			{'r': 4, 'c': 0, 'd': 'North'},
			{'r': 3, 'c': 1, 'd': 'North'},
			{'r': 2, 'c': 2, 'd': 'North'},
			{'r': 3, 'c': 3, 'd': 'North'},
			{'r': 3, 'c': 0, 'd': 'East'},
			{'r': 2, 'c': 1, 'd': 'East'},
			{'r': 2, 'c': 2, 'd': 'East'},
			{'r': 3, 'c': 3, 'd': 'East'},
			{'r': 4, 'c': 4, 'd': 'North'},
			{'r': 3, 'c': 5, 'd': 'North'},
			{'r': 2, 'c': 6, 'd': 'North'},
			{'r': 3, 'c': 7, 'd': 'North'},
			{'r': 3, 'c': 4, 'd': 'East'},
			{'r': 2, 'c': 5, 'd': 'East'},
			{'r': 2, 'c': 6, 'd': 'East'},
			{'r': 3, 'c': 7, 'd': 'East'},
			{'r': 4, 'c': 8, 'd': 'North'},
			{'r': 3, 'c': 9, 'd': 'North'},
			{'r': 2, 'c': 10, 'd': 'North'},
			{'r': 3, 'c': 11, 'd': 'North'},
			{'r': 3, 'c': 8, 'd': 'East'},
			{'r': 2, 'c': 9, 'd': 'East'},
			{'r': 2, 'c': 10, 'd': 'East'},
			{'r': 3, 'c': 11, 'd': 'East'},
			{'r': 4, 'c': 12, 'd': 'North'}
		]
		for (var i = 0; i < old.length; i++) {
			old[i].r -= 1
		}
		return old
	}
}