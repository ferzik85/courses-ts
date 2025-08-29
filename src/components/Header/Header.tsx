import React from 'react';
import { useNavigate } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { userTokenIsSet } from '../../localStorage/StorageAccess';
import { logoutUser } from '../../store/user/thunk';
import Button from '../../common/Button/Button';
import Logo from './components/Logo';
import { getUser } from '../../store/user/selectors';
import styles from './Header.module.css';

function Header() {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const handleLogout = () => dispatch<any>(logoutUser()).then(() => navigate('/login'));
	const user = useSelector(getUser);
	return (
		<div className={styles.header}>
			<div className={styles.logo}>
				<Logo />
			</div>
			<div className={styles.title}>COURSES</div>
			{userTokenIsSet() ? (
				<div className={styles.button}>
					<span>{user}</span>
					<Button label='LOGOUT' onClick={handleLogout} />
				</div>
			) : null}
		</div>
	);
}

export default Header;
