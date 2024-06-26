import { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(new Uint8Array(anecdotes.length))
  const [mostVotes, setMostVotes] = useState(0)

  const getRandomInt = (max) => {
    return Math.floor(Math.random() * max)
  }

  const handleNext = () => {
    const newSelected = getRandomInt(anecdotes.length)
    setSelected(newSelected)
  }

  const handleVote = () => {
    const newVotes = [...votes]
    newVotes[selected] += 1
    setVotes(newVotes)
    calculateMostVotes(newVotes)
  }

  const calculateMostVotes = (newVotes) => {
    if (newVotes.length === 0) {
        return -1;
    }

    var max = newVotes[0];
    var maxIndex = 0;

    for (var i = 1; i < newVotes.length; i++) {
        if (newVotes[i] > max) {
            maxIndex = i;
            max = newVotes[i];
        }
    }

    setMostVotes(maxIndex)
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]}</p>
      <p>has {votes[selected]} votes</p>
      <button onClick={handleVote}>vote</button>
      <button onClick={handleNext}>next anecdote</button>
      <h1>Anecdote with the most votes</h1>
      <p>{anecdotes[mostVotes]}</p>
      <p>has {votes[mostVotes]} votes</p>
    </div>
  )
}

export default App