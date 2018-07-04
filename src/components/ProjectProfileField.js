import React from 'react';
import PropTypes from 'prop-types'
import ProjectProfileCheckbox from '../containers/ProjectProfileCheckbox';
import ProjectProfileRadio from '../containers/ProjectProfileRadio';
import ProjectProfileText from '../containers/ProjectProfileText';


const ProjectProfileField = ({choices, id, widget_type, children}) => {

	if (widget_type == "CheckboxSelectMultiple") {
		return (
			<div className='control-group'>
				{children}
				<ul id={`id_${id}`}>
					{ choices.map( (choice, i) => (<li>
						<ProjectProfileCheckbox id={id} label={choice} index={i} />
					</li>) )
					}
				</ul>
			</div>
		);
	}

	if (widget_type == "RadioSelect") {
		return (
			<div className='control-group'>
				{children}
				<ul id={`id_${id}`}>
					{ choices.map( (choice, i) => (<li>
						<ProjectProfileRadio id={id} label={choice} index={i} />
					</li>) )
					}
				</ul>
			</div>
		);
	}

	if (widget_type == "TextInput") {
		return (
			<div class="control-group">
        		{children}        
    			<ProjectProfileText id={id} />
    		</div>
		);
	}

	if (widget_type == "NumberInput") {
		return (
			<div class="control-group">
        		{children}        
    			<ProjectProfileText id={id} type="number" />
    		</div>
		);
	}
}

ProjectProfileField.propTypes = {
	choices: PropTypes.array, 
	id: PropTypes.string,
	widget_type: PropTypes.string,
	children: PropTypes.node,
}

export default ProjectProfileField;