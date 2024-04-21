const Filter = ({handleFilter}) => {
  return (
    <div>
      filter shown with&nbsp;
      <input
        onChange={handleFilter}
      />
    </div>
  )
}

export default Filter