const Part = (props) => {
	// console.log(props)
	return (
		<p key={props.id}>
			{props.part.name} {props.part.exercises}
		</p>
)
}
export default Part