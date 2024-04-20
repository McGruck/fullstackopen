import Part from "./Part"

const Content = ({array}) => {
  const totalExercises = array.reduce((sum, item) => sum + item.exercises, 0)

  return (
    <div>
      {array.map(item => 
        <Part key={item.id} name={item.name} exercises={item.exercises} />
      )}
      <p><b>total of {totalExercises} exercises</b></p>
    </div>
  )
}

export default Content