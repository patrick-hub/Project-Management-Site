import React, { useState } from "react";
  import './Create.css'

export default function Create() {
	const [name, setName] = useState("");
	const [details, setDetails] = useState("");
	const [dueDate, setDueDate] = useState("");
	const [category, setCategory] = useState("");
	const [assignedUsers, setAssignedUsers] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault()

  }

	return (
		<div className="create-form">
			<h2 className="page-title">Create a new Project</h2>

			<form onSubmit={handleSubmit}>
				<label>
					<span>Project name:</span>
					<input
						type="text"
						value={name}
						onChange={(e) => setName(e.target.value)}
						required
					/>
				</label>

				<label>
					<span>Project details:</span>
					<textarea
						type=""
						value={details}
						onChange={(e) => setDetails(e.target.value)}
						required></textarea>
				</label>

				<label>
					<span>Set due date:</span>
					<input
						type="date"
						value={dueDate}
						onChange={(e) => setDueDate(e.target.value)}
						required
					/>
				</label>
        <label>
          <span>Project Category</span>
          {/* {category select here}  */}
        </label>
        <label>
          <span>Assigned to</span>
          {/* {Assignee select here}  */}
        </label>
        <button className="btn">Add Project</button>
			</form>
		</div>
	);
}
