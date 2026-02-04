import { useState } from 'react'

const Button = ({text, onClick}) => {
	return	<button onClick={onClick}>{text}</button>
}

const Anecdote = ({anecdote, votes}) => {

	return (
		<>
			<p>{anecdote}<br/>
			<i>has {votes} votes</i></p>
		</>
	)
}

const TopAnecdote = ({ anecdotes, voteCount, topAnecdote }) => {
	if (topAnecdote === -1)
		return (
			<>
				<h1>Top Anecdote</h1>
				<p><i>no votes yet</i></p>
			</>
		)

	return (
		<>
			<h1>Top Anecdote</h1>
			<Anecdote anecdote={anecdotes[topAnecdote]} votes={voteCount[topAnecdote]}/>
		</>
	)
	
}

const AnecdoteOfTheDay = ({ anecdotes, selected, setSelected, voteCount, setVoteCount, topAnecdote, setTopAnecdote }) => {
	
	const getRandomAnecdoteIndex = () => {
		return Math.floor(Math.random() * anecdotes.length)
	}
	
	const increaseVote = ( index ) => {
		const newVotes = [...voteCount]
		newVotes[index] += 1
		setVoteCount(newVotes)
		updateTopAnecdote(index, newVotes[index])
	}

	const updateTopAnecdote = (index, votes) => {
		if (topAnecdote === -1 || votes > voteCount[topAnecdote])
			setTopAnecdote(index)
	}

	return (
		<>
			<h1>Anecdote of the day</h1>
			<Anecdote anecdote={anecdotes[selected]} votes={voteCount[selected]}/>
			<Button text='vote' onClick={() => increaseVote(selected)}/>
			<Button text='next anecdote' onClick={() => setSelected(getRandomAnecdoteIndex())}/>
		</>
	)

}

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
	const [voteCount, setVoteCount] = useState(new Array(anecdotes.length).fill(0))
	const [topAnecdote, setTopAnecdote] = useState(-1)

	return (
		<div>
			<AnecdoteOfTheDay 
				anecdotes={anecdotes} 
				selected={selected}  
				setSelected={setSelected}
				voteCount={voteCount}
				setVoteCount={setVoteCount}
				topAnecdote={topAnecdote}
				setTopAnecdote={setTopAnecdote}/>
			<TopAnecdote 
				anecdotes={anecdotes} 
				voteCount={voteCount} 
				topAnecdote={topAnecdote} />
		</div>
	)
}

export default App