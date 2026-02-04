import { useState } from 'react'

const Button = ({text, onClick}) => {

	return (
		<button onClick={() => onClick()}>{text}</button>
	)
}

const StatisticsLine = ({text, value}) => {

	return (
		<tr>
			<td>{text}</td>
			<td><b>{value}</b></td>
		</tr>
	)
}

const Feedback = ({ good, setGood, neutral, setNeutral, bad, setBad}) => {
	
	return (
		<>
			<h1>give feedback</h1>
			<Button text='good' onClick={() => setGood(good + 1)}>good</Button>
			<Button text='neutral' onClick={() => setNeutral(neutral + 1)}>good</Button>
			<Button text='bad' onClick={() => setBad(bad + 1)}>good</Button>
		</>
	)
}

const Statistics = ({good, neutral, bad}) => {

	if (!good && !neutral && !bad)
		return (
			<>
				<h1>statistics</h1>
				<p>No feedback given</p>
			</>
		)

	const average = (good - bad) / (good + neutral + bad);
	const positivePercentage = (good / (good + neutral + bad)) * 100;
	const total = good + neutral + bad;
	
	return (
		<>
			<h1>statistics</h1>
			<table>
				<tbody>
					<StatisticsLine text='good' value={good}></StatisticsLine>
					<StatisticsLine text='neutral' value={neutral}></StatisticsLine>
					<StatisticsLine text='bad' value={bad}></StatisticsLine>
				</tbody>
				<tfoot>
					<StatisticsLine text='total' value={total}></StatisticsLine>
					<StatisticsLine text='average' value={average}></StatisticsLine>
					<StatisticsLine text='positive' value={positivePercentage + '%'}></StatisticsLine>
				</tfoot>
			</table>
		</>
	)
}

const App = () => {
	const [good, setGood] = useState(0)
	const [neutral, setNeutral] = useState(0)
	const [bad, setBad] = useState(0)

	return (
		<div>
			<Feedback 
				good={good} setGood={setGood}
				neutral={neutral} setNeutral={setNeutral}
				bad={bad} setBad={setBad}/>
			<Statistics 
				good={good} 
				neutral={neutral} 
				bad={bad}/>
		</div>
	)
}

export default App