const PersonForm = ({addPerson, handleNewName, handleNewNumber, newName, newNumber}) => {
  return (
    <form onSubmit={addPerson}>
      <div>
        <div>
          name:&nbsp; 
          <input 
            value={newName}
            onChange={handleNewName}
          />
        </div>
        <div>
          number:&nbsp;
          <input
            value={newNumber}
            onChange={handleNewNumber}
          />
        </div>
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

export default PersonForm