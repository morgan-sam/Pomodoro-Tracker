import React, { useEffect, useState } from 'react';

const KeyboardShortcut = () => {
	return (
		<div className="keyboard-container">
			<div className={`keyboard-key`}>
				<code>Ctrl</code>
			</div>
			<div className="keyboard-add-sign">+</div>
			<div className={`keyboard-key`}>
				<code>Alt</code>
			</div>
			<div className="keyboard-add-sign">+</div>
			<div className={`keyboard-key`}>
				<code>Enter</code>
			</div>
		</div>
	);
};

export default KeyboardShortcut;
