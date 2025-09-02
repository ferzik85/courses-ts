import '@testing-library/jest-dom/vitest';
import { describe, test, expect, vi } from 'vitest';
import { screen } from '@testing-library/react';
import { testRender } from '../../../tests';
import { userTokenIsSet } from '../../../localStorage/StorageAccess';
import  Header from '../Header';

vi.mock('../../../localStorage/StorageAccess', () => ({
  userTokenIsSet: vi.fn(),
}));

describe('Header tests', () => {
	test("Header should have logo and user's name", () => {
		vi.mocked(userTokenIsSet).mockReturnValue(true);
		
		const expectedUser = { name: 'user-name' };
		testRender(<Header />, { user: expectedUser });

		expect(screen.getByAltText('epam logo')).toBeInTheDocument();
		expect(screen.getByText(expectedUser.name)).toBeInTheDocument();
	});
});
