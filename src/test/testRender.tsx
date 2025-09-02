import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { rootReducer } from '../store/rootReducer';

export const testRender = (component, { user, courses, authors, initialEntries = ['/'], ...options } = {}) => {
	function Providers({ children }) {
		const store = configureStore({ reducer: rootReducer, preloadedState: { user, courses, authors } });
		return (
			<Provider store={store}>
				<MemoryRouter initialEntries={initialEntries}>{children}</MemoryRouter>
			</Provider>
		);
	}
	return render(component, { wrapper: Providers, ...options });
};
