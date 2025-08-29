import { Outlet } from 'react-router';
import styles from './App.module.css';

function App() {
	return (
		<div className={styles.app}>
			<Outlet />
		</div>
	);
}

export default App;
