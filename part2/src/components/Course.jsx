import Header from "./Header"
import Content from "./Content"

const Course = ({course}) => {
  return (
    <div>
      <Header level={2} text={course.name} />
      <Content array={course.parts} />
    </div>
  )
}

export default Course