import React, { useContext } from 'react';
import { capitalizeFirstLetter } from 'utility/parseText';
import { ColorThemeContext } from 'context/theme';

const Form = (props) => {
	const colorTheme = useContext(ColorThemeContext);
	const { style, cancelText, submitText, onSubmit, onCancel, inputs } = props;
	console.log(colorTheme);

	return (
		<form className={'form'} style={{ ...style }} onSubmit={onSubmit}>
			{inputs ? (
				inputs.map((el, i) => (
					<label key={i} className={'form-input'}>
						<span className={'form-label'}>{capitalizeFirstLetter(el)}</span>
						<input
							className={'form-text-input'}
							name={el}
							type={el}
							placeholder={capitalizeFirstLetter(el)}
						/>
					</label>
				))
			) : null}
			<div style={{ display: 'flex', flexDirection: 'row' }}>
				{onCancel && (
					<button
						className={'form-btn'}
						type="button"
						onClick={onCancel}
						style={{
							border: `2px solid ${colorTheme.darker}`,
							backgroundColor: `${colorTheme.mid}`
						}}
					>
						{cancelText ? cancelText : 'Cancel'}
					</button>
				)}
				<button
					className={'form-btn'}
					type="submit"
					style={{
						border: `2px solid ${colorTheme.darker}`,
						backgroundColor: `${colorTheme.mid}`
					}}
				>
					{submitText ? submitText : 'Submit'}
				</button>
			</div>
		</form>
	);
};

export default Form;
