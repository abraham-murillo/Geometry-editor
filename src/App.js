import React, { Component } from 'react';

import Canvas from "./Canvas";
import { divideByTokens, isSpace } from "./Stuff";
import "./styles.css"
import "./button.css"

class App extends Component {
  constructor() {
    super()

    this.state = {
      objects: [],
      showGrid: false,
      restartScale: false,
      goToOrigin: false
    }
  }

  getInput(event) {
    this.setState(() => {
      const text = event.target.value

      const newObjects = text.split('\n').map((line) => {
        function isGood(c) {
          if ('0' <= c && c <= '9')
            return true;
          if ('a' <= c && c <= 'z')
            return true;
          if ('A' <= c && c <= 'Z')
            return true;
          if (isSpace(c))
            return true
          return c === '.' || c === '-' || c === '+' || c === '#'
        }

        var cleanLine = ""
        for (const c of line)
          if (isGood(c)) {
            cleanLine += c
          } else {
            cleanLine += " ";
          }

        const properties = divideByTokens(cleanLine)
        // console.log(properties)

        return properties
      })

      return {
        objects: newObjects
      }
    })
  }

  showGridButton(event) {
    this.setState((prevState) => {
      return {
        showGrid: !prevState.showGrid
      }
    })
  }

  goToOriginButton(event) {
    this.setState((prevState) => {
      return {
        goToOrigin: !prevState.goToOrigin
      }
    })
  }

  restartScaleButton() {
    this.setState({ restartScale: true })
  }

  restartScaleDone() {
    this.setState({ restartScale: false })
  }

  goToOriginDone() {
    this.setState({ goToOrigin: false })
  }

  render() {
    const text =
      "  Geometry noob\n" +
      "[opt] means optional\n\n" +
      "Point:\n" +
      "[p] x y [color] [label]\n\n" +
      "Segment:\n" +
      "[s] x1 y1 x2 y2 [color] [label]\n\n" +
      "Line:\n" +
      "l x1 y1 x2 y2 [color] [label]\n\n" +
      "Circle:\n" +
      "[c] x y r [color] [label] [fill]\n\n" +
      "Polygon:\n" +
      "[poly] x1 y1 x2 y2 ... xn yn [color] [label] [fill]\n\n" +
      "Rectangle:\n" +
      "[rect] x1 y1 x2 y2 [color] [label] [fill]\n\n" +
      "Bonus:\n" +
      "[color]\nChanges all objects below with this color\n\n" +
      "[showVertices]\nShows circles at the vertices in all geometric shapes below\n\n"

    return (
      <div className="global-div">
        <div className="multi-button">
          {/* <button onClick={this.goToOriginButton.bind(this)} >
            Go to origin
          </button> */}

          <button onClick={this.restartScaleButton.bind(this)} >
            Restart scale
          </button>

          {/* <button onClick={this.showGridButton.bind(this)}>
            {this.state.showGrid ? 'Hide' : 'Show'} grid
          </button> */}
        </div>

        <div className="image-wrapper">
          <textarea
            type="text"
            className="input"
            onChange={this.getInput.bind(this)}
            placeholder={text} />

          <Canvas
            objects={this.state.objects}
            goToOrigin={this.state.goToOrigin}
            goToOriginDone={this.goToOriginDone.bind(this)}
            showGrid={this.state.showGrid}
            restartScale={this.state.restartScale}
            restartScaleDone={this.restartScaleDone.bind(this)} />
        </div>
      </div>
    )
  }
}

export default App;
