import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { rootReducer } from '../store/rootReducer';

interface TestRenderOptions {
	user?: any;
	courses?: any;
	authors?: any;
	initialEntries?: any;
}

export const testRender = (
	component: React.ReactElement,
	{
		user,
		courses,
		authors,
		initialEntries = ['/'],
		...options
	}: TestRenderOptions = {}
) => {
	function Providers({ children }: React.PropsWithChildren) {
		const store = configureStore({
			reducer: rootReducer,
			preloadedState: { user, courses, authors }
		});
		return (
			<Provider store={store}>
				<MemoryRouter initialEntries={initialEntries}>{children}</MemoryRouter>
			</Provider>
		);
	}
	return render(component, { wrapper: Providers, ...options });
};
