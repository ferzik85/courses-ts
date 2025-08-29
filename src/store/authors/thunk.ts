import { getAuthorsApiAsync } from '../../api/Authors/GetAuthors';
import { addAuthorApiAsync } from '../../api/Authors/AddAuthor';
import { deleteAuthorApiAsync } from '../../api/Authors/DeleteAuthor';
import { saveAuthorsAction, addAuthorAction, deleteAuthorAction } from './actions';
import { userTokenIsSet, getUserToken } from '../../localStorage/StorageAccess';

export const getAuthors = () =>
	async function saveAuthorsFromDbToStore(dispatch: any) {
		const result = await getAuthorsApiAsync();
		if (result.ok) dispatch(saveAuthorsAction(result.authors));
	};

export const addAuthor = (name: string) =>
	async function addAuthorToDbAndStore(dispatch: any) {
		if (userTokenIsSet()) {
			const token = getUserToken();
			const result = await addAuthorApiAsync(token, name);
			if (result.ok && result.author) dispatch(addAuthorAction(result.author));
		}
	};

export const deleteAuthor = (id: string) =>
	async function deleteAuthorFromDbAndStore(dispatch: any) {
		if (userTokenIsSet()) {
			const token = getUserToken();
			const ok = await deleteAuthorApiAsync(token, id);
			if (ok) dispatch(deleteAuthorAction(id));
		}
	};
