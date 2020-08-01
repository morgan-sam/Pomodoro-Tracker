import React from 'react';
import { capitalizeFirstLetter } from 'utility/parseText';

const Form = (props) => {
	const { style, cancelText, submitText, onSubmit, onCancel, inputs } = props;

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
					<button className={'form-btn'} type="submit">
						{cancelText ? cancelText : 'Cancel'}
					</button>
				)}
				<button className={'form-btn'} type="submit">
					{submitText ? submitText : 'Submit'}
				</button>
			</div>
		</form>
	);
};

export default Form;
