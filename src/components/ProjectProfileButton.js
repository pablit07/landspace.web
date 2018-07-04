import React from 'react';
import PropTypes from 'prop-types'


const ProjectProfileButton = ({type, isHidden, children, onClick}) => {

	if (type == 'submit') {
		return (<input id="submit" className={"ink-button"+(isHidden?" hide-all":"")} type="submit" value="Submit" onClick={e => {e.preventDefault(); onClick()}}/>);
	}

	return (<button type="button" className={"action next ink-button"+(isHidden?" hide-all":"")} onClick={e => {e.preventDefault(); onClick()}}>
		{children}
	</button>);
}

ProjectProfileButton.propTypes = {
	type: PropTypes.string,
	isHidden: PropTypes.bool,
	children: PropTypes.node,
	onClick: PropTypes.func
}

export default ProjectProfileButton