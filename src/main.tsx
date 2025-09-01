import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router';
import { Provider } from 'react-redux';
import { Layout } from './components/Layout';
import { PrivateRoute } from './components/PrivateRoute';
import { getCourses } from './store/courses/thunk';
import { getAuthors } from './store/authors/thunk';
import { store } from './store';
import Registration from './components/Registration/Registration';
import Login from './components/Login/Login';
import Courses from './components/Courses/Courses';
import CourseInfo from './components/CourseInfo/CourseInfo';
import CourseForm from './components/CourseForm/CourseForm';
import App from './App';

store.dispatch(getAuthors());
store.dispatch(getCourses());

createRoot(document.getElementById('root')!).render(
	<Provider store={store}>
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Layout />}>
					<Route index element={<Navigate to="/login" />} />
					<Route path="login" element={<Login />} />
					<Route path="registration" element={<Registration />} />
					<Route path="courses" element={<App />}>
						<Route path=":courseId" element={<CourseInfo />} />
						<Route
							path="add"
							element={
								<PrivateRoute>
									<CourseForm />
								</PrivateRoute>
							}
						/>
						<Route
							path="update/:courseId"
							element={
								<PrivateRoute>
									<CourseForm />
								</PrivateRoute>
							}
						/>
						<Route index element={<Courses />} />
					</Route>
					<Route path="*" element={<Navigate to="/login" />} />
				</Route>
			</Routes>
		</BrowserRouter>
	</Provider>
);
