const Contacts = (props) => {

	// if (props.filter) {
	const filteredPersons = props.persons.filter((person) => person.name.includes(props.filter))
	// props.filter ?? const = filteredPersons.filter(); :
	// }



	return (
		<>
			<h2>Numbers</h2>
			<p>filtering for {props.filter}</p>
			<table>
				<thead>
						<tr>
							<td><b>Name</b></td>
							<td><b>Phone</b></td>
						</tr>
				</thead>
				<tbody>
					{filteredPersons.map(person => 
						<tr key={person.id}>
							<td>{person.name}</td>
							<td>{person.phone}</td>
						</tr>
					)}
				</tbody>
				<tfoot />
			</table>
		</>
	)
}

export default Contacts