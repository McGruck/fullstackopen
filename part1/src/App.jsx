import { useState } from 'react'

const Button = ({onClick, text}) => {
  return (
    <button onClick={onClick}>{text}</button>
  )
}

const StatisticsLine = ({label, value}) => {
  return (
    <tr>
      <td>{label}</td>
      <td>{value}</td>
    </tr>
  )
}

const Statistics = ({good, neutral, bad, all, average, positive}) => {
  if (all === 0) {
    return (
      <div>No feedback given</div>
    )
  }
  return (
    <div>
      <table>
        <tbody>
          <StatisticsLine label={"good"} value={good} />
          <StatisticsLine label={"neutral"} value={neutral} />
          <StatisticsLine label={"bad"} value={bad} />
          <StatisticsLine label={"all"} value={all} />
          <StatisticsLine label={"average"} value={average} />
          <StatisticsLine label={"positive"} value={positive + "%"} />
        </tbody>
      </table>
    </div>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)
  const [sum, setSum] = useState(0)
  const [average, setAverage] = useState(0)
  const [positive, setPositive] = useState(0)

  const handleGoodFeedback = () => {
    const updatedGood = good + 1
    setGood(updatedGood)
    feedbackCalcs(1, updatedGood)
  }

  const handleNeutralFeedback = () => {
    setNeutral(neutral + 1)
    feedbackCalcs(0)
  }

  const handleBadFeedback = () => {
    setBad(bad + 1)
    feedbackCalcs(-1)
  }

  const feedbackCalcs = (value, updatedGood) => {
    const updatedAll = all + 1
    const updatedSum = sum + value
    let goodCount
    if (updatedGood) {
      goodCount = updatedGood
    } else {
      goodCount = good
    }
    setAll(updatedAll)
    setSum(updatedSum)
    setAverage(updatedSum / updatedAll)
    setPositive(100 * (goodCount / updatedAll))
  }

  return (
    <div>
      <h1>give feedback</h1>
      <div>
        <Button onClick={handleGoodFeedback} text={"good"} />
        <Button onClick={handleNeutralFeedback} text={"neutral"} />
        <Button onClick={handleBadFeedback} text={"bad"} />
      </div>
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} all={all} positive={positive} average={average}/>
    </div>
  )
}

export default App