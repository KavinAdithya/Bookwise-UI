
function Lookup({title, values, onSelect}) {

 return (
    <select onChange={(event) => onSelect(event.target.value)}>

      <option value="">
        Select {title}
      </option>

      {values.map((value) => (
        <option
          key={value.id}
          value={value.id}
        >
          {value.name}
        </option>
      ))}

    </select>
  );
}

export default Lookup;