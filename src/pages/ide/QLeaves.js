import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import KarelWorld from "../../components/Karel/KarelWorld.js"

import {AssnIde} from './AssnIde.js'

export class QLeaves extends React.Component {

	static getKey() {
		return 'leaves'
	}

	static starterCode() {
		return `# This is an editor! Write your solution here.
# Make karel add leaves to both trees.
# Use at least one repeat statement.
def main():
   move()
   `
	}

	render() {
		return <AssnIde
			{...this.props}
			world = {this.getWorld()}
			goal = {this.getGoal()}
			prompt = {this.getPrompt()}
		/>
	}

	getPrompt() {
		let complete = this.props.isSolved ? <b style={{color:'green'}}> Complete</b> : <b> Not Complete</b>

		return (
			<div className="p-4" style={{overflow:'hidden'}}>
				<h1>Springtime Karel</h1>
				<hr/>
				<div className="card bg-light mb-3">
					<div className="card-body" style={{padding:'0.75rem'}}>
						<p className="card-text"><b>Your task</b>:
						Write a program to help Karel add leaves to two trees.
						{complete}
						</p>
					</div>
				</div>

				<p>
					Karel has been tasked to add leaves to the two trees. The trees (represented by walls 9 segments high) are missing leaves (represented as beepers):
				</p>

				<KarelWorld
					width={300}
					height={300 * (13/10)}
					nRows={13}
					nCols={10}
					walls={this.getWalls()}
					makeAccessible={this.props.makeAccessible}
				/>

				<p>
					When Karel is done, the trees should both have leaves, so the final picture would look like this:
				</p>

				<KarelWorld
					width={300}
					height={300 * (13/10)}
					nRows={13}
					nCols={10}
					karelCol={9}
					stones={this.getStones()}
					walls={this.getWalls()}
					makeAccessible={this.props.makeAccessible}
				/>

				<p>
					Karel may count on the following facts about the world, listed below:

					<ul>
						<li>Karel starts at the bottom left corner, facing east.</li>
						<li>The trees are exactly four squares apart, on 2nd, and 6th columns.</li>
						<li>Karel can assume that trees are always ten corners high.</li>
					</ul>
				</p>

				<p>It is worth getting a practice in decomposition. For example, it would make sense to have a add_leaves function.</p>

			</div>
		)
	}

	getGoal() {
		return {
			nRows :13,
			nCols :10,
			karelCol:9,
			walls: this.getWalls(),
			stones : this.getStones()
		}
	}

	getWorld() {
		return {
			nRows :13,
			nCols :10,
			walls : this.getWalls()
		}
	}

	getSquare(rStart, cStart) {
		return [
			{'r': rStart, 'c': cStart, 'n': 1},
			{'r': rStart+1, 'c': cStart, 'n': 1},
			{'r': rStart+1, 'c': cStart+1, 'n': 1},
			{'r': rStart, 'c': cStart+1, 'n': 1},
		]
	}

	getStones() {
		var stones = []
		stones = stones.concat(this.getSquare(2, 2))
		stones = stones.concat(this.getSquare(2, 6))
		return stones
	}

	getWalls() {
		var walls = []
		for(var i = 0; i < 9; i++) {
			walls.push({'r': 12 - i, 'c': 2, 'd': 'East'})
			walls.push({'r': 12 - i, 'c': 6, 'd': 'East'})
		}
		return walls
	}
}