import Header from './Header';
import Content from './Content';

const Total = (props) => {
	const total = props.exercises.reduce((accumulator, currentValue) => accumulator + currentValue);

	return (
		<p><b>Number of exercises {total}</b></p>
	)

}

const Course = (props) => {
	return (
		<div>
			<Header name={props.course.name} />
			<Content parts={props.course.parts} />
			<Total exercises={props.course.parts.map(parts => parts.exercises)}/>
		</div>
  )
}

export default Course;