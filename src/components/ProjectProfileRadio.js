import React from 'react';
import PropTypes from 'prop-types'


const ProjectProfileRadio = ({label, id, index, onChange}) => {

	return (
		<label for={`id_${id}_${index}`}>
			<input id={`id_${id}_${index}`} name={id} type="radio" value={label} onChange={onChange}/> {label}
		</label>
	);
}

ProjectProfileRadio.propTypes = {
	label: PropTypes.string, 
	id: PropTypes.string,
	index: PropTypes.number,
	onChange: PropTypes.func
}

export default ProjectProfileRadio;