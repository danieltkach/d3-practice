export const DropDown = ({ options, id, selectedValue, onSelectedValueChange }) => {
	// if (!options) return <></>;

	return (
		<select id={id} onChange={event=> onSelectedValueChange(event.target.value)}>
			{
				options.map(({ value, label }) => 
					<option value={value} selected={value===selectedValue} key={value}>{label}</option>
				)
			}
		</select>
	)
}