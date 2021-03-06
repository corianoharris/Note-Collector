import React, { Fragment, useState } from 'react';
import moment from 'moment';
import DOMPurify from 'dompurify';
import '../App.css';
import '../index.css';

const EditNote = ({ note }) => {
	const [title, setTitle] = useState(note.title);
	const [content, setContent] = useState(note.content);

	// console.log(note);

	//edit description function
	const updateNote = async (e, id, fields) => {
		e.preventDefault();
		try {
			const body = {
				id: note.id,
				title,
				content,
			};

			console.log(body);
			const response = await fetch(`/api/notes/${note.id}`, {
				method: 'PUT',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(body),
			});

			console.log(response);
			window.location = '/notes'; // make a api call
		} catch (err) {
			console.error(err.message);
		}
	};

	// const submitEditNote = async (e) => {
	// 	e.preventDefault();
	// 	try {
	// 		const body = {
	// 			title,
	// 			content,
	// 		};
	// 		const response = await fetch('/api/notes', {
	// 			method: 'POST',
	// 			headers: { 'Content-Type': 'application/json' },
	// 			body: JSON.stringify(body),
	// 		});
	// 		window.location = '/notes'; // make a api call to db
	// 	} catch (err) {
	// 		console.error(err.message);
	// 	}
	// };

	return (
		<Fragment>
			<button
				type="button"
				className="btn btn-outline-warning text-uppercase ml-1 mr-1"
				data-toggle="modal"
				data-target={`#edit${note.id}`}>
				Edit
			</button>
			<div className="modal" id={`edit${note.id}`}>
				<div className="modal-dialog">
					<div className="modal-content">
						<div className="modal-header edit-note text-white">
							<h4 className="modal-title h3 text-white">Edit Note</h4>
							<button
								type="button"
								className="close text-uppercase text-white"
								data-dismiss="modal">
								&times;
							</button>
						</div>

						<div className="modal-body  text-white view-textarea">
							<div>
								<label
									className="text-left h3  edit-title"
									htmlFor="title">
									Title:
								</label>
								<input
									type="text"
									className="form-control text"
									id={`#title${note.id}`}
									name="title"
									value={DOMPurify.sanitize(title)}
									onChange={(e) => setTitle(e.target.value)}
								/>
							</div>
						</div>
						<div className="modal-body text-white view-textarea">
							<div>
								<label
									className="text-left h3 edit-title"
									htmlFor="note">
									Note:
								</label>
								<textarea
									type="text"
									className="form-control edit text"
									id={`#content${note.id}`}
									name="note"
									value={DOMPurify.sanitize(content)}
									onChange={(e) =>
										setContent(e.target.value)
									}></textarea>
							</div>
						</div>
						<div className="modal-footer text">
							<p className="content-row w-auto">
								Modified:{' '}
								{moment(note.modified_at).format('MM-DD-YYYY')}
							</p>
							<button
								type="button"
								className="btn btn-outline-warning text-uppercase"
								data-dismiss="modal"
								onClick={(e) => updateNote(e)}>
								Edit
							</button>
							<button
								type="button"
								className="btn btn-outline-danger text-uppercase"
								data-dismiss="modal">
								Close
							</button>
						</div>
					</div>
				</div>
			</div>
		</Fragment>
	);
};

export default EditNote;
