import React, { useState } from 'react';

const KeyboardShortcut = () => {
	const [ combo, setCombo ] = useState([ null, null, null ]);

	if (combo === [ 'ctrl', 'alt', 'enter' ]) {
		// something
		setCombo([ null, null, null ]);
	}

	return (
		<div className="keyboard-container">
			<div className={`keyboard-key`} onClick={() => setCombo((val) => [ ...val.slice(1), 'ctrl' ])}>
				<code>Ctrl</code>
			</div>
			<div className="keyboard-add-sign">+</div>
			<div className={`keyboard-key`} onClick={() => setCombo((val) => [ ...val.slice(1), 'alt' ])}>
				<code>Alt</code>
			</div>
			<div className="keyboard-add-sign">+</div>
			<div className={`keyboard-key`} onClick={() => setCombo((val) => [ ...val.slice(1), 'enter' ])}>
				<code>Enter</code>
			</div>
		</div>
	);
};

export default KeyboardShortcut;
