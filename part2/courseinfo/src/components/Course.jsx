import Header from './Header';
import Content from './Content';

const Total = (props) => {
	// console.log(exercises)
	
	const total = props.exercises.reduce((accumulator, currentValue) => accumulator + currentValue);

	return (
		<p><b>Number of exercises {total}</b></p>
	)

}

const Course = (props) => {

	// const Total = (props) => <p>Number of exercises {props.total}</p>

	// const total = 
	// const Total = (props) => <p>Number of exercises {props.course.parts.map((exercises) =>  += exercises)</p>
	// const Total = (props) => <p>Number of exercises {props.course.parts.map((exercises) =>  exercises)}</p>




	return (
		<div>
			<Header name={props.course.name} />
			<Content parts={props.course.parts} />
			<Total exercises={props.course.parts.map(parts => parts.exercises)}/>
		</div>
  )
}

export default Course;