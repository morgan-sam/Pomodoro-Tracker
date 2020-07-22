import React from 'react';
import { capitalizeFirstLetter } from 'utility/parseText';

const Form = (props) => {
	const { style, submitText, onSubmit, inputs } = props;

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

			<button className={'form-btn'} type="submit">
				{submitText}
			</button>
		</form>
	);
};

export default Form;
