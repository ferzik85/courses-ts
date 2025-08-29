import React from 'react';
import styles from './Logo.module.css';
import logo from '../../../assets/epam-logo.svg';

function Logo() {
	return <img className={styles.logo} src={logo} alt='epam logo' />;
}

export default Logo;
