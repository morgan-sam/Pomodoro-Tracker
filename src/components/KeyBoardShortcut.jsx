import React, { useState } from 'react';
import { randInt } from 'utility/random';

const KeyboardShortcut = () => {
	const [ keys, setKeys ] = useState([ null, null, null ]);
	const [ combo, setCombo ] = useState(false);

	if (keys[0] === 'ctrl' && keys[1] === 'alt' && keys[2] === 'enter') {
		setCombo(true);
		for (let i = 1; i < 5; i++) {
			document.documentElement.style.setProperty(`--base-color${i}`, randInt(0, 359));
		}
		setKeys([ null, null, null ]);
	}

	return (
		<div className={`keyboard-container ${combo ? 'keyboard-swirl' : ''}`}>
			<div className={`keyboard-key`} onClick={() => setKeys((val) => [ ...val.slice(1), 'ctrl' ])}>
				<code>Ctrl</code>
			</div>
			<div className="keyboard-add-sign">+</div>
			<div className={`keyboard-key`} onClick={() => setKeys((val) => [ ...val.slice(1), 'alt' ])}>
				<code>Alt</code>
			</div>
			<div className="keyboard-add-sign">+</div>
			<div className={`keyboard-key`} onClick={() => setKeys((val) => [ ...val.slice(1), 'enter' ])}>
				<code>Enter</code>
			</div>
		</div>
	);
};

export default KeyboardShortcut;
