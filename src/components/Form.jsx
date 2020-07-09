import React from 'react';
import { capitalizeFirstLetter } from 'utility/parseText';
import { formStyle, formInputStyle, formLabelStyle, formBtnStyle } from 'styles/form';

const Form = (props) => {
	const { style, submitText, onSubmit, inputs } = props;

	return (
		<form style={{ ...formStyle, ...style }} onSubmit={onSubmit}>
			{inputs ? (
				inputs.map((el, i) => (
					<label key={i} style={formInputStyle}>
						<span style={formLabelStyle}>{capitalizeFirstLetter(el)}</span>
						<input name={el} type={el} placeholder={capitalizeFirstLetter(el)} />
					</label>
				))
			) : null}

			<button style={formBtnStyle} type="submit">
				{submitText}
			</button>
		</form>
	);
};

export default Form;
