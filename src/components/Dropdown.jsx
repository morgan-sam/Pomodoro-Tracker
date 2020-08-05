import React, { useEffect, useState, useRef, useContext } from 'react';
import { capitalizeFirstLetter } from 'utility/parseText';
import { DROPDOWN_HEIGHT_REMS } from 'styles/dropdown';
import { DarkThemeContext } from 'context/theme';

const Dropdown = (props) => {
	const darkTheme = useContext(DarkThemeContext);
	const [ listOpen, setListOpen ] = useState(false);
	const dropdownRef = useRef(null);

	const getCurrentOptionClass = (el, options) => {
		if (el === props.default) return 'dropdown-selected-option';
		if (el === options[options.length - 1]) return 'final-option';
	};

	const allWordsCapitalised = (input) => {
		if (typeof input === 'string') return input.split(' ').map((word) => capitalizeFirstLetter(word)).join(' ');
		else return input;
	};

	const optionHeader = () => {
		return (
			<div
				className={`${props.className} dropdown-box dropdown-header`}
				onMouseDown={(e) => {
					if (e.buttons === 1) {
						setListOpen(!listOpen);
					}
				}}
				onContextMenu={(e) => e.preventDefault()}
			>
				{allWordsCapitalised(props.default)}
			</div>
		);
	};

	const optionDivs = props.options
		? props.options.map(function(el, i) {
				const display = typeof el === 'string' ? allWordsCapitalised(el) : el;
				return (
					<div
						key={i}
						className={`${props.className} dropdown-box dropdown-option ${getCurrentOptionClass(
							el,
							props.options
						)}`}
						onMouseDown={() => {
							props.onClick(el);
							setListOpen(false);
						}}
					>
						{display}
					</div>
				);
			})
		: null;

	useEffect(() => {
		if (listOpen) {
			document.addEventListener('mousedown', whileDropdownOpenClick);
		} else {
			document.removeEventListener('mousedown', whileDropdownOpenClick);
		}
		return () => document.removeEventListener('mousedown', whileDropdownOpenClick);
	});

	const setDropdownStartPosition = () => {
		const currentIndex = props.options.indexOf(props.default);
		dropdownRef.current.scrollTop =
			DROPDOWN_HEIGHT_REMS * currentIndex * parseFloat(getComputedStyle(dropdownRef.current).fontSize);
	};

	const whileDropdownOpenClick = (e) => {
		if (e.target.classList.contains(`${props.className}`)) {
			return;
		}
		setListOpen(false);
	};

	useEffect(
		() => {
			setDropdownStartPosition();
		},
		[ listOpen ]
	);

	return (
		<div className={`${props.className} dropdown-parent`} style={{ ...props.style }}>
			<div className={`${props.className} dropdown-element ${darkTheme ? 'dark-theme' : ''}`}>
				<div
					className={`${props.className} dropdown-option-container ${listOpen
						? 'dropdown-open'
						: 'dropdown-closed'}`}
					ref={dropdownRef}
				>
					{listOpen ? optionDivs : optionHeader()}
				</div>
				<div
					className={`${props.className} dropdown-box dropdown-end-node`}
					style={{
						display: listOpen ? 'block' : 'none'
					}}
				>
					{'▼'}
				</div>
			</div>
		</div>
	);
};

export default Dropdown;
