import {Component} from 'react'
import './index.css'

class DigitalTimer extends Component {
  state = {
    isTimerRunning: false,
    initialTime: 25,
    initialTimeInSeconds: 25 * 60,
    buttonsEnable: true,
  }

  onStart = () => {
    const {isTimerRunning} = this.state
    if (isTimerRunning === false) {
      this.timerId = setInterval(this.decreaseOneSecond, 1000)
    } else {
      clearInterval(this.timerId)
      this.setState({
        isTimerRunning: false,
        buttonsEnable: false,
      })
    }
  }

  decreaseOneSecond = () => {
    const {initialTimeInSeconds} = this.state
    if (initialTimeInSeconds === 0) {
      this.setState(prevState => ({
        isTimerRunning: false,
        buttonsEnable: true,
        initialTime: prevState.initialTime,
        initialTimeInSeconds: prevState.initialTime * 60,
      }))
      clearInterval(this.timerId)
    } else {
      this.setState(prevState => ({
        isTimerRunning: true,
        buttonsEnable: false,
        initialTimeInSeconds: prevState.initialTimeInSeconds - 1,
      }))
    }
  }

  increment = () => {
    this.setState(prevState => ({
      initialTime: prevState.initialTime + 1,
      initialTimeInSeconds: prevState.initialTimeInSeconds + 60,
    }))
  }

  decrement = () => {
    this.setState(prevState => ({
      initialTime: prevState.initialTime - 1,
      initialTimeInSeconds: prevState.initialTimeInSeconds - 60,
    }))
  }

  onReset = () => {
    clearInterval(this.timerId)
    this.setState(prevState => ({
      isTimerRunning: false,
      initialTime: prevState.initialTime,
      initialTimeInSeconds: parseInt(prevState.initialTime) * 60,
      buttonsEnable: true,
    }))
  }

  render() {
    const {
      isTimerRunning,
      initialTime,
      initialTimeInSeconds,
      buttonsEnable,
    } = this.state
    const minutes = Math.floor(initialTimeInSeconds / 60)
    const seconds = Math.floor(initialTimeInSeconds % 60)

    const finalMinutes = minutes <= 9 ? `0${minutes}` : minutes
    const finalSeconds = seconds <= 9 ? `0${seconds}` : seconds

    const timerText = isTimerRunning ? 'Running' : 'Paused'

    const incre = buttonsEnable ? this.increment : ''
    const decre = buttonsEnable ? this.decrement : ''

    const startOrPauseImageUrl = isTimerRunning
      ? 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'

    const startOrPauseAltText = isTimerRunning ? 'pause icon' : 'play icon'

    return (
      <div className="app-container">
        <div className="container">
          <h1 className="main-head">Digital Timer</h1>
          <div className="medium">
            <div className="timer-display">
              <div className="round">
                <h1 className="timer-head">{`${finalMinutes}:${finalSeconds}`}</h1>
                <p className="timer-para">{timerText}</p>
              </div>
            </div>
            <div className="options-container">
              <div className="buttons-container">
                <div className="start-or-pause-button">
                  <img
                    className="start-or-pause-image"
                    src={startOrPauseImageUrl}
                    alt={startOrPauseAltText}
                  />
                  <button
                    className="button-para"
                    type="button"
                    onClick={this.onStart}
                  >
                    {isTimerRunning ? 'Pause' : 'Start'}
                  </button>
                </div>
                <button
                  type="button"
                  className="start-or-pause-button"
                  onClick={this.onReset}
                >
                  <img
                    className="start-or-pause-image"
                    src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
                    alt="reset icon"
                  />
                  <p className="button-para">Reset</p>
                </button>
              </div>
              <p className="limit-para">Set Timer Limit</p>
              <div className="timer-settings">
                <button className="increase" type="button" onClick={decre}>
                  -
                </button>
                <p className="display-time">{initialTime}</p>
                <button className="increase" type="button" onClick={incre}>
                  +
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default DigitalTimer
