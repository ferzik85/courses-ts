import React, { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { addAuthor, deleteAuthor } from '../../store/authors/thunk';
import { addCourse, updateCourse } from '../../store/courses/thunk';
import Button from '../../common/Button/Button';
import LabeledInput from '../../common/LabeledInput/LabeledInput';
import { ButtonInput } from '../../common/ButtonInput';
import { DurationInput } from '../../common/DurationInput';
import { validateInput } from '../../utils/ValidateInput';
import validateDuration from '../../utils/ValidateDuration';
import AuthorItem from './components/AuthorItem/AuthorItem';
import { getAuthors } from '../../store/authors/selectors';
import { getCourse } from '../../store/courses/selectors';
import styles from './CourseForm.module.css';

function CourseForm() {
	const formId = 'courseCreateOrEditForm';
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const params = useParams();
	const courseId = params.courseId ?? null;
	const isAddForm = courseId == null;
	const authors = useSelector(getAuthors);
	const courseToEdit = useSelector((state) => getCourse(state, courseId));
	const [title, setTitle] = useState(courseToEdit?.title ?? '');
	const [description, setDescription] = useState(courseToEdit?.description ?? '');
	const [duration, setDuration] = useState(courseToEdit?.duration ?? '');
	const [titleIsInvalid, setTitleIsInvalid] = useState(false);
	const [descriptionIsInvalid, setDescriptionIsInvalid] = useState(false);
	const [durationIsInvalid, setDurationIsInvalid] = useState(false);
	const [courseAuthorIds, setCourseAuthorIds] = useState(courseToEdit?.authors ?? []);
	const getCurrentDate = () => new Date().toJSON().slice(0, 10).split('-').reverse().join('/');
	const validateInputForCourseForm = (value: string) => validateInput(value) && value.length > 1;
	const courseAuthorListIsEmpty = courseAuthorIds.length === 0;

	const handleTitleChange = (value: string) => {
		setTitle(value);
		setTitleIsInvalid(false);
	};

	const handleDescriptionChange = (value: string) => {
		setDescription(value);
		setDescriptionIsInvalid(false);
	};

	const handleDurationChange = (value: string) => {
		setDuration(value);
		setDurationIsInvalid(false);
	};

	const handleAddAuthorToCourse = (e: React.MouseEvent, authorId: string) => {
		e.preventDefault();
		const authorWithTheSameIdAlreadyExists = courseAuthorIds.find((courseAuthorId) => courseAuthorId === authorId) != null;
		if (authorWithTheSameIdAlreadyExists) return;
		const authorToAdd = authors.find((author: any) => author.id === authorId);
		if (authorToAdd) setCourseAuthorIds([...courseAuthorIds, authorToAdd.id]);
	};

	const handleRemoveAuthorFromCourse = (e: React.MouseEvent | null, authorId: string) => {
		e?.preventDefault();
		setCourseAuthorIds([...courseAuthorIds.filter((courseAuthorId) => courseAuthorId !== authorId)]);
	};

	const handleCreateAuthor = (name: string) => dispatch(addAuthor(name));

	const handleDeleteAuthor = (e: React.MouseEvent, authorId: string) => {
		e.preventDefault();
		dispatch(deleteAuthor(authorId));
		handleRemoveAuthorFromCourse(null, authorId);
	};

	function handleSubmitCourse(e: any) {
		e.preventDefault();
		const invalidTitle = !validateInputForCourseForm(title);
		const invalidDescription = !validateInputForCourseForm(description);
		const invalidDuration = !validateDuration(duration);
		setTitleIsInvalid(invalidTitle);
		setDescriptionIsInvalid(invalidDescription);
		setDurationIsInvalid(!validateDuration(duration));
		if (invalidTitle || invalidDescription || invalidDuration) {
			setTitle('');
			setDescription('');
			return;
		}
		const course = { id: '', title, description, creationDate: getCurrentDate(), duration: +duration, authors: [...courseAuthorIds] };
		if (isAddForm) {
			dispatch(addCourse(course));
		} else {
			dispatch(
				updateCourse({
					...course,
					id: courseId,
				})
			);
		}
		navigate('/courses');
	}

	return (
		<div className={styles.courseForm}>
			<h3 className={styles.courseFormHeader}>{isAddForm ? 'Create Course' : 'Edit Course'}</h3>
			<div className={styles.courseFormBody}>
				<form onSubmit={handleSubmitCourse} id={formId} className={styles.submitForm}>
					<p className={styles.courseFormMain}>Main Info</p>
					<LabeledInput name='Title' value={title} isInvalid={titleIsInvalid} onChange={handleTitleChange} inputClassName={styles.courseFormTitle} />
					<LabeledInput
						name='Description'
						value={description}
						isInvalid={descriptionIsInvalid}
						onChange={handleDescriptionChange}
						inputClassName={styles.courseFormDescription}
						isTextArea
					/>
					<p className={styles.courseFormMain}>Duration</p>
					<DurationInput
						name='Duration'	
						duration={duration}
						onChange={handleDurationChange}
						isInvalid={durationIsInvalid}
						inputClassName={styles.courseFormDuration}
					/>
					<div className={styles.createAuthorsPanel}>
						<div className={styles.addAuthorsPanel}>
							<p className={styles.courseFormMain}>Authors</p>
							<ButtonInput
								labelName='Author Name'
								buttonName='CREATE AUTHOR'
								onClick={handleCreateAuthor}
								validateInput={validateInputForCourseForm}
								inputClassName={styles.createAuthor}
							/>
							<p className={styles.courseFormMain}>Authors List</p>
							{authors.map((author: any) => (
								<AuthorItem key={author.id} id={author.id} name={author.name} onAddClick={handleAddAuthorToCourse} onDeleteClick={handleDeleteAuthor} />
							))}
						</div>
						<div className={styles.courseAuthorsPanel}>
							<p className={styles.courseAuthorsPanelTitle}>Course Authors</p>
							{courseAuthorListIsEmpty ? (
								<p className={styles.courseAuthorsPanelEmptyList}>Author list is empty</p>
							) : (
								authors
									.filter((author: any) => courseAuthorIds.includes(author.id))
									.map((author: any) => (
										<AuthorItem
											key={author.id}
											id={author.id}
											name={author.name}
											onDeleteClick={handleRemoveAuthorFromCourse}
											addIsDisabled
											authorItemClass={styles.courseListItem}
										/>
									))
							)}
						</div>
					</div>
				</form>
			</div>
			<div className={styles.courseFormFooter}>
				<Button label='CREATE COURSE' type='submit' formName={formId} className={styles.createButton} />
				<Link to='/courses'>
					<Button label='CANCEL' className={styles.cancelButton} />
				</Link>
			</div>
		</div>
	);
}

export default CourseForm;
