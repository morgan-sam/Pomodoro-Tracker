import React, { useEffect, useState, useRef } from 'react';
import { capitalizeFirstLetter } from 'utility/parseText';
import {
	dropdownParentStyle,
	dropdownElementStyle,
	dropdownHeaderStyle,
	dropdownBoxStyle,
	dropdownClosedStyle,
	dropdownOpenStyle,
	selectedOptionStyle,
	finalOptionStyle,
	optionStyle,
	DROPDOWN_HEIGHT_REMS
} from 'styles/dropdown';

const Dropdown = (props) => {
	const [ listOpen, setListOpen ] = useState(false);
	const dropdownRef = useRef(null);

	const getCurrentOptionStyle = (el, options) => {
		if (el === props.default) return { ...optionStyle, ...selectedOptionStyle };
		if (el === options[options.length - 1]) return { ...optionStyle, ...finalOptionStyle };
		else return optionStyle;
	};

	const optionDivs = props.options
		? props.options.map(function(el, i) {
				const currentOptionStyle = getCurrentOptionStyle(el, props.options);
				const display = typeof el === 'string' ? capitalizeFirstLetter(el) : el;
				return (
					<div
						key={i}
						className={`${props.className} dropdownOption`}
						style={{ ...dropdownBoxStyle, ...currentOptionStyle }}
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
			DROPDOWN_HEIGHT_REMS * (currentIndex + 1) * parseFloat(getComputedStyle(dropdownRef.current).fontSize);
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
		<div className={`${props.className}`} style={{ ...dropdownParentStyle, ...props.style }}>
			<div className={`${props.className} dropdownElement`} style={dropdownElementStyle}>
				<div
					className={`${props.className} dropdownOptionContainer`}
					style={listOpen ? dropdownOpenStyle : dropdownClosedStyle}
					ref={dropdownRef}
				>
					<div
						className={`${props.className} dropdownHeader`}
						style={{ ...dropdownBoxStyle, ...dropdownHeaderStyle }}
						onMouseDown={(e) => {
							if (e.buttons === 1) {
								setListOpen(!listOpen);
							}
						}}
						onContextMenu={(e) => e.preventDefault()}
					>
						{capitalizeFirstLetter(props.default)}
					</div>
					{listOpen ? optionDivs : null}
				</div>
				<div
					className={`${props.className} dropdownEndNode`}
					style={{
						...dropdownBoxStyle,
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
