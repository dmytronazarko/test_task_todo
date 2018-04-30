import React from 'react';
import Link from './Link';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

const Footer = ({ toggleLink, clearCompleted, show }) => (
	<div className="footer">
		<span>Show:</span>
		<NavLink className="link" exact to="/">All</NavLink>
		<NavLink className="link" to="/active">Active</NavLink>
		<NavLink className="link" to="/completed">Completed</NavLink>

		<Link onClick={() => clearCompleted()}
			className="link link--clear"
			text="Clear completed"
			active={show === "SHOW_ACTIVE"}
		/>
	</div>
)

Footer.propTypes = {
	toggleLink: PropTypes.func.isRequired,
	clearCompleted: PropTypes.func.isRequired,
	show: PropTypes.string.isRequired
}

export default Footer
