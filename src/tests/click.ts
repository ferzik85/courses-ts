import { fireEvent } from '@testing-library/react';

export const click = (htmlElement: Element | Node | Document | Window | null) => {
	if (!htmlElement) return;

	fireEvent(
		htmlElement,
		new MouseEvent('click', {
			bubbles: true,
			cancelable: true
		})
	);
};
