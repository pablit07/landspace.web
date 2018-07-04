import React from 'react';
import PropTypes from 'prop-types'


const ProjectProfileText = ({id, type = 'text', onChange}) => {

	return (
			<input id={`id_${id}`} name={id} type={type} onChange={onChange} />
	);
}

ProjectProfileText.propTypes = {
	id: PropTypes.string,
	type: PropTypes.string,
	onChange: PropTypes.func
}

export default ProjectProfileText;