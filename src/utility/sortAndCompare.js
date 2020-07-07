export const sortObjDeep = (o) =>
	Object.entries(o).sort().map((el) => {
		if (typeof el[1] === 'object') el[1] = sortObjDeep(el[1]);
		return el;
	});

export const compareObjs = (a, b) => {
	const [ sortedA, sortedB ] = [ sortObjDeep(a), sortObjDeep(b) ];
	return JSON.stringify(sortedA) === JSON.stringify(sortedB);
};
