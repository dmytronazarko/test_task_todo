import React from 'react'
import PropTypes from 'prop-types'

const Link = ({ className, onClick, active, text }) => (
	<button className={className} onClick={onClick} disabled={!active}>
		{text}
	</button>
)

Link.propTypes = {
	className: PropTypes.string,
	onClick: PropTypes.func.isRequired,
	active: PropTypes.bool.isRequired,
	text: PropTypes.string.isRequired
}

export default Link

