import Part from './Part'

const Content = (props) => {
	// console.log(props)
	// console.log(props.parts[0])
	return (
		<div>
			{props.parts.map((part, index) => 
				<Part key={index} part={part}/>
			)}
		</div>
 	)
}

export default Content