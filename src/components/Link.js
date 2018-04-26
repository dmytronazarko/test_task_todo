import React from 'react'

const Link = ({ active, text, onClick }) => (
	<button className="link" onClick={onClick} disabled={active}>
		{text}
	</button>
)

export default Link
