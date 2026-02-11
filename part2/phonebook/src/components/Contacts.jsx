const Contacts = (props) => {
		
	const filteredPersons = props.filter 
		? props.persons.filter((person) => person.name.toLowerCase().includes(props.filter.toLowerCase())) 
		: props.persons

	return (
		<>
			<h2>Numbers</h2>
			<table>
				<thead>
						<tr>
							<td><b>Name</b></td>
							<td><b>Phone</b></td>
						</tr>
				</thead>
				<tbody>
					{
						(filteredPersons.length > 0)
						? filteredPersons.map(person => 
							<tr key={person.id}>
								<td>{person.name}</td>
								<td>{person.number}</td>
							</tr>
							)
						: <tr><td><i>No contacts to show</i></td></tr>
					}
				</tbody>
				<tfoot />
			</table>
		</>
	)
}

export default Contacts