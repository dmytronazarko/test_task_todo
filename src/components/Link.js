import React from 'react'

const Link = ({ className, onClick, active, text }) => (
	<button className={className} onClick={onClick} disabled={active}>
		{text}
	</button>
)

export default Link
