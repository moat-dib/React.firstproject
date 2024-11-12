import { useState } from 'react';
import styles from './App.module.css';

export const App = () => {
	const [value, setValue] = useState('');
	const [error, setError] = useState(false);
	const [list, setList] = useState([]);
	let isValueValid = true;
	function newValueButtonClick() {
		const promptValue = prompt();
		console.log(promptValue);
		if (promptValue.length < 3) {
			isValueValid = false;
			setError(true);
		} else {
			isValueValid = true;
			setError(false);
			setValue(promptValue);
		}
	}
	function onAddButtonClick() {
		if (isValueValid) {
			const id = Date.now();
			const year = new Intl.DateTimeFormat('ru', { year: 'numeric' }).format(id);
			const month = new Intl.DateTimeFormat('ru', { month: 'long' }).format(id);
			const day = new Intl.DateTimeFormat('ru', { day: '2-digit' }).format(id);
			const hour = new Intl.DateTimeFormat('ru', { hour: '2-digit' }).format(id);
			const min = new Intl.DateTimeFormat('ru', { minute: '2-digit' }).format(id);
			const sec = new Intl.DateTimeFormat('ru', { second: '2-digit' }).format(id);
			const date = `  ${day}.${month}.${year}  ${hour}:${min}:${sec}`;
			let updatedList = [...list, { id, value, date }];
			setList(updatedList);
			setError(false);
			setValue('');
		}
	}
	return (
		<div className={styles.app}>
			<h1 className={styles.pageHeading}>Ввод значения</h1>
			<p className={styles.noMarginText}>
				Текущее значение <code>value</code>: "
				<output className={styles.currentValue}>{value}</output>"
			</p>
			{error && (
				<div className={styles.error}>
					Введенное значение должно содержать минимум 3 символа
				</div>
			)}
			<div className={styles.buttonsContainer}>
				<button className={styles.button} onClick={newValueButtonClick}>
					Ввести новое
				</button>
				<button
					className={styles.button}
					disabled={error}
					onClick={onAddButtonClick}
				>
					Добавить в список
				</button>
			</div>
			<div className={styles.listContainer}>
				<h2 className={styles.listHeading}>Список:</h2>
				{list.length === 0 && (
					<p className={styles.noMarginText}>Нет добавленных элементов</p>
				)}
				{list.length > 0 && (
					<ul className={styles.list}>
						{list.map(({ id, value, date }) => (
							<li key={id}>{value + date}</li>
						))}
					</ul>
				)}
			</div>
		</div>
	);
};
