import { fireEvent } from '@testing-library/react';

export const click = (htmlElement: Element | Node | Document | Window) => {
	fireEvent(
		htmlElement,
		new MouseEvent('click', {
			bubbles: true,
			cancelable: true
		})
	);
};
