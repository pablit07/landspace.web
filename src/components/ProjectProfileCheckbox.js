import React from 'react';
import PropTypes from 'prop-types'


const ProjectProfileCheckbox = ({label, id, index, onChange}) => {

	return (
		<label for={`id_${id}_${index}`}>
			<input id={`id_${id}_${index}`} name={id} type="checkbox" value={label} onChange={onChange}/> {label}
		</label>
	);
}

ProjectProfileCheckbox.propTypes = {
	label: PropTypes.string, 
	id: PropTypes.string,
	index: PropTypes.number,
	onChange: PropTypes.func
}

export default ProjectProfileCheckbox;