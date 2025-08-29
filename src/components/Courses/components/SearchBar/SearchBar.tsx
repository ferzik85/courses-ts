import React, { useState, useCallback } from 'react';
import Button from '../../../../common/Button/Button';
import Input from '../../../../common/Input/Input';
import styles from './SearchBar.module.css';

function SearchBar({ onSearchClick }: any) {
	const [value, setValue] = useState('');

	const handleChange = useCallback(
		(val: any) => {
			setValue(val);
			if (!val) onSearchClick(null);
		},
		[setValue]
	);
	return (
		<div className={styles.searchBar}>
			<Input value={value} onChange={handleChange} className={styles.searchInput} />
			<Button label='SEARCH' onClick={() => onSearchClick(value)} />
		</div>
	);
}

export default SearchBar;
