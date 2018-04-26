import React from 'react'

const Link = ({ active, text, onClick }) => (
	<button onClick={onClick} disabled={active}>
		{text}
	</button>
)

export default Link
