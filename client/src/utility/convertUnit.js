export const remToPx = (rem) => {
	if (typeof rem === 'string' && rem.match(/([0-9]+)rem/)) {
		rem = rem.match(/([0-9]+)rem/)[1];
	}
	return rem * parseFloat(getComputedStyle(document.documentElement).fontSize);
};

export const pxToRem = (px) => {
	if (typeof px === 'string' && px.match(/([0-9]+)px/)) {
		px = px.match(/([0-9]+)px/)[1];
	}
	return px / parseFloat(getComputedStyle(document.documentElement).fontSize);
};
