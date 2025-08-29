import React, { useState } from 'react';
import { Link, useNavigate } from "react-router";
import Button from '../../common/Button/Button';
import LabeledInput from '../../common/LabeledInput/LabeledInput';
import { validateInput, validateEmail, validatePassword } from '../../utils/ValidateInput';
import { registerUserAsync } from '../../api/User/RegisterUser';

import styles from './Registration.module.css';

function Registration() {
	const navigate = useNavigate();
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [nameIsInvalid, setNameIsInvalid] = useState(false);
	const [emailIsInvalid, setEmailIsInvalid] = useState(false);
	const [passwordIsInvalid, setPasswordIsInvalid] = useState(false);

	const handleNameChange = (value: string) => {
		setName(value);
		setNameIsInvalid(false);
	};

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
		const invalidName = !validateInput(name);
		const invalidEmail = !validateEmail(email);
		const invalidPassword = !validatePassword(password);
		setNameIsInvalid(invalidName);
		setEmailIsInvalid(invalidEmail);
		setPasswordIsInvalid(invalidPassword);

		if (invalidName || invalidEmail || invalidPassword) return;

		const userIsRegistered = await registerUserAsync(name, email, password);
		if (userIsRegistered) {
			navigate('/login');
		}
	}

	return (
		<div className={styles.reg}>
			<b className={styles.regHeader}>Registration</b>
			<div className={styles.regBody}>
				<form onSubmit={handleSubmit} className={styles.regForm}>
					<LabeledInput name='Name' value={name} isInvalid={nameIsInvalid} onChange={handleNameChange} inputClassName={styles.regInput} />
					<LabeledInput name='Email' value={email} isInvalid={emailIsInvalid} onChange={handleEmailChange} inputClassName={styles.regInput} />
					<LabeledInput name='Password' value={password} isInvalid={passwordIsInvalid} onChange={handlePasswordChange} inputClassName={styles.regInput} />
					<Button label='REGISTER' type='submit' className={styles.regButton} />
				</form>
				<div className={styles.regHelp}>
					If you have an account you may{' '}
					<Link to='/login'>
						<b>Login</b>
					</Link>
				</div>
			</div>
		</div>
	);
}

export default Registration;
