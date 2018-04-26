import React from 'react'
import Link from './Link'

const Footer = ({ toggleLink, visible}) => (
	<div class="footer">
		<span>Show:</span>
		<Link onClick={() => toggleLink("SHOW_ALL")} text="All" active={visible === "SHOW_ALL"}/>
		<Link onClick={() => toggleLink("SHOW_ACTIVE")} text="Active" active={visible === "SHOW_ACTIVE"}/>
		<Link onClick={() => toggleLink("SHOW_COMPLETED")} text="Completed" active={visible === "SHOW_COMPLETED"}/>
	</div>
)

export default Footer
