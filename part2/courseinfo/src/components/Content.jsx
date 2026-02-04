import Part from './Part'

const Content = (props) => {
	// console.log(props)
	// console.log(props.parts[0])
	return (
		<div>
			{props.parts.map((part) => 
				<Part key={part.id} part={part}/>
			)}
		</div>
 	)
}

export default Content