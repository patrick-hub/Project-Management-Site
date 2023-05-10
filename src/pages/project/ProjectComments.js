import { useState } from "react";
import './Project.css'
import Avatar from "../../components/Avatar";
import { timestamp } from "../../firebase/config";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useFirestore } from "../../hooks/useFirestore";

export default function ProjectComments({ project }) {
	const { updateDocument, response } = useFirestore("projects");
	const [newComment, setNewComment] = useState("");
	const { user } = useAuthContext();

	const handleSubmit = async (e) => {
		e.preventDefault();

		const commentToAdd = {
			displayName: user.displayName,
			photoURL: user.photoURL,
			content: newComment,
			createdAt: timestamp.fromDate(new Date()),
			id: Math.random(),
		};
		await updateDocument(project.id, {
			comments: [...project.comments, commentToAdd],
		});

        if (!response.error) {
            setNewComment('')
        }
	};

	return (
		<div className="project-comments">
			<h4>Project Comments</h4>
        <ul>
            {project.comments.length > 0 && project.comments.map(comment => (
                <li key={comment.id}>
                    <div className="comment-author">
                        <Avatar src={comment.photoURL}/>
                        {comment.displayName}
                    </div>
                    <div className="comment-date">
                        <p>date here</p>
                    </div>
                    <div className="comment-content">
                       {comment.content}
                    </div>
                </li>
            ))}
        </ul>
			<form className="add-comments" onSubmit={handleSubmit}>
				<label>
					<span>Add new comment</span>
					<textarea
						onChange={(e) => setNewComment(e.target.value)}
						value={newComment}
						required></textarea>
				</label>
				<button className="btn">Add comment</button>
			</form>
		</div>
	);
}
