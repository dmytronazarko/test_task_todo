import React from 'react';
import Link from './Link';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

const Footer = ({ clearCompleted, active }) => (
	<div className="footer">
		<span>Show:</span>
		<NavLink className="link" to="/all">All</NavLink>
		<NavLink className="link" to="/active">Active</NavLink>
		<NavLink className="link" to="/completed">Completed</NavLink>

		<Link onClick={() => clearCompleted()}
			className="link link--clear"
			text="Clear completed"
			active={active}
		/>
	</div>
)

Footer.propTypes = {
	clearCompleted: PropTypes.func.isRequired,
	active: PropTypes.bool.isRequired
}

export default Footer

