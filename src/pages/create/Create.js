import React, { useEffect, useState } from "react";
  import './Create.css'
  import Select from 'react-select'
  import {useCollection} from '../../hooks/useCollection'

  const categories = [
    {value: 'development', label: 'Development'},
    {value: 'design', label: 'Design'},
    {value: 'sales', label: 'Design'},
    {value: 'marketing', label: 'Marketing'}
  ]

export default function Create() {

	const {documents} = useCollection('users')
	const [users, setUsers] = useState([])
 
	const [name, setName] = useState("");
	const [details, setDetails] = useState("");
	const [dueDate, setDueDate] = useState("");
	const [category, setCategory] = useState("");
	const [assignedUsers, setAssignedUsers] = useState([]);
	const [formError, setFormError] = useState(null)

	useEffect(() => {
		if (documents) {
			const options = documents.map(user => {
				return {value: user, label: user.displayName}
			})
			setUsers(options)
		}
	}, [documents])

  const handleSubmit = (e) => {
    e.preventDefault()
	setFormError(null)
	if (!category) {
		setFormError('Please select a project category')
		return
	}

	if (assignedUsers.length < 1) {
		setFormError('Please assign to at least a user')
		return
	}

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
          <Select 
          onChange={(option) => setCategory(option)}
          options={categories}
          />
        </label>
        <label>
          <span>Assigned to</span>
          <Select 
		  onChange = {(option) => setAssignedUsers(option)}
		  isMulti
		  options={users}/>
		 
        </label>
        <button className="btn">Add Project</button>
		{formError && <p className="error">{formError}</p>}
			</form>
		</div>
	);
}
