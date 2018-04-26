import React from 'react'
import Link from './Link'

const Footer = ({ toggleLink }) => (
	<div>
		<span>Show: </span>
		<Link onClick={() => toggleLink("SHOW_ALL")} text="All" />
		<Link onClick={() => toggleLink("SHOW_ACTIVE")} text="Active" />
		<Link onClick={() => toggleLink("SHOW_COMPLETED")} text="Completed" />
	</div>
)

export default Footer
