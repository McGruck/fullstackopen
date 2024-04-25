const Persons = ({persons, filter, handleDelete}) => {
  return (
    <div>
      {persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase())).map(person =>
        <div key={person.id}>
          {person.name}: {person.number}&nbsp;
          <button onClick={handleDelete} value={person.id}>delete</button>
        </div>
      )}
    </div>
  )
}

export default Persons