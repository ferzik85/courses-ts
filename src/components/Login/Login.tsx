import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router";
import { useDispatch } from 'react-redux';
import Button from '../../common/Button/Button';
import LabeledInput from '../../common/LabeledInput/LabeledInput';
import { validateEmail, validatePassword } from '../../utils/ValidateInput';
import { putUser as addUserToLocalStorage, userTokenIsSet, getUser } from '../../localStorage/StorageAccess';
import { loginUserAction } from '../../store/user/actions';
import { loginUserAsync } from '../../api/User/LoginUser';
import { getMeAsync } from '../../api/User/GetMe';
import styles from './Login.module.css';
import type { User } from '../../models/User';

function Login() {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [emailIsInvalid, setEmailIsInvalid] = useState(false);
	const [passwordIsInvalid, setPasswordIsInvalid] = useState(false);
	const navigateToCourses = (useRedirect: boolean) => navigate('/courses', { replace: useRedirect });
	const saveUserToStore = (user: User) => dispatch(loginUserAction(user));

	useEffect(() => {
		if (userTokenIsSet()) {
			saveUserToStore(getUser());
			navigateToCourses(true);
		}
	}, []);

	const handleEmailChange = (value: string) => {
		setEmail(value);
		setEmailIsInvalid(false);
	};

	const handlePasswordChange = (value: string) => {
		setPassword(value);
		setPasswordIsInvalid(false);
	};

	async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		const invalidEmail = !validateEmail(email);
		const invalidPassword = !validatePassword(password);
		setEmailIsInvalid(invalidEmail);
		setPasswordIsInvalid(invalidPassword);
		if (invalidEmail || invalidPassword) return;
		const userIsLoggedResponse = await loginUserAsync(email, password);
		if (userIsLoggedResponse.ok) {
			const me = await getMeAsync(userIsLoggedResponse.user!.token);
			if (me.ok) {
				const user = { ...userIsLoggedResponse.user!, role: me.role! };
				addUserToLocalStorage(user);
				saveUserToStore(getUser());
				navigateToCourses(false);
			}
		}
	}

	return (
		<div className={styles.login}>
			<b className={styles.loginHeader}>Login</b>
			<div className={styles.loginBody}>
				<form onSubmit={handleSubmit} className={styles.loginForm}>
					<LabeledInput name='Email' value={email} isInvalid={emailIsInvalid} onChange={handleEmailChange} inputClassName={styles.loginInput} />
					<LabeledInput name='Password' value={password} isInvalid={passwordIsInvalid} onChange={handlePasswordChange} inputClassName={styles.loginInput} />
					<Button label='LOGIN' type='submit' className={styles.loginButton} />
				</form>
				<div className={styles.loginHelp}>
					If you don&apos;t have an account you may{' '}
					<Link to='/registration'>
						<b>Register</b>
					</Link>
				</div>
			</div>
		</div>
	);
}

export default Login;
