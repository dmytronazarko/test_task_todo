import React from 'react'
import Link from './Link'
import PropTypes from 'prop-types'

const Footer = ({ toggleLink, clearCompleted, visible }) => (
	<div className="footer">
		<span>Show:</span>
		<Link onClick={() => toggleLink("SHOW_ALL")}
			className="link"
			text="All"
			active={visible === "SHOW_ALL"}
		/>
		<Link onClick={() => toggleLink("SHOW_ACTIVE")}
			className="link"
			text="Active"
			active={visible === "SHOW_ACTIVE"}
		/>
		<Link onClick={() => toggleLink("SHOW_COMPLETED")}
			className="link"
			text="Completed"
			active={visible === "SHOW_COMPLETED"}
		/>
		<Link onClick={() => clearCompleted()}
			className="link link--clear"
			text="Clear completed"
			active={visible === "SHOW_ACTIVE"}
		/>
	</div>
)

Footer.propTypes = {
	toggleLink: PropTypes.func.isRequired,
	clearCompleted: PropTypes.func.isRequired,
	visible: PropTypes.string.isRequired
}

export default Footer
