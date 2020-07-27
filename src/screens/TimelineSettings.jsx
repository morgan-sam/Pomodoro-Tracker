import React from 'react';
import { useHistory } from 'react-router-dom';
import { getSystemButtonStyle } from 'styles/systemSettings';
import { useState } from 'react';
import Checkbox from 'components/Checkbox';
import { convertCamelToCapital } from 'utility/parseText';

const TimelineSettings = (props) => {
	const { options, setOptions } = props;
	const history = useHistory();
	const accountButtonStyle = getSystemButtonStyle(false);

	const [ tempOptions, setTempOptions ] = useState(options);

	const gridStyle = {
		display: 'grid',
		gridTemplateColumns: 'repeat(2, 1fr)',
		gridTemplateRows: 'repeat(5, 1fr)',
		gridColumnGap: '0px',
		gridRowGap: '0px',
		alignItems: 'center',
		justifyContent: 'center'
	};

	const getBooleanObjParams = (objToCheck) => {
		const booleanObjParams = [];
		const iteration = (obj, layer = []) => {
			Object.keys(obj).forEach((key) => {
				if (typeof obj[key] === 'object') iteration(obj[key], [ ...layer, key ]);
				else if (typeof obj[key] === 'boolean')
					booleanObjParams.push({ value: obj[key], key: [ ...layer, key ] });
			});
		};
		iteration(objToCheck);
		return booleanObjParams;
	};

	const generateInverseNestedObject = (obj, route, iter = 0) => {
		const spread = iter === 0 ? obj : obj[route.key[iter - 1]];
		if (iter !== route.key.length)
			return {
				...spread,
				[route.key[iter]]: generateInverseNestedObject(obj, route, ++iter)
			};
		else return !route.value;
	};

	const checkWithLabelArray = () => {
		return getBooleanObjParams(tempOptions).map((el, i) => {
			return [
				<div key={`title${i}`}>{convertCamelToCapital(el.key[el.key.length - 1])}:</div>,
				<Checkbox
					key={`check${i}`}
					style={{ borderRadius: '100%', margin: '1rem' }}
					default={el.value}
					options={tempOptions}
					onChange={() => setTempOptions(generateInverseNestedObject(tempOptions, el))}
				/>
			];
		});
	};

	return (
		<div className="screenContainer">
			<div className="settingsBox">
				<h2 className="header">Timeline Settings</h2>
				<div className="button-column">
					<div>Timeline:</div>
					<div style={gridStyle}>{checkWithLabelArray()}</div>
				</div>
				<div className="footer">
					<button style={accountButtonStyle} onClick={() => history.push('/settings')}>
						Return
					</button>
				</div>
			</div>
		</div>
	);
};

export default TimelineSettings;
