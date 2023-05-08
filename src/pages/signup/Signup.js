import React, { useState } from "react";
import { useSignup } from "../../hooks/useSignup";
import "./Signup.css";

export default function Signup() {
	const [displayName, setDisplayName] = useState("");
	const [password, setPassword] = useState("");
	const [email, setEmail] = useState("");
	const [thumbnail, setThumbnail] = useState(null);
	const [thumbnailError, setThumbnailError] = useState(null);

  const {signup,  isPending, error} = useSignup()

  

  const handleSubmit = (e) => {
    e.preventDefault()
    signup(email, password, displayName, thumbnail);
  }

	const handleFileChange = (e) => {
		setThumbnail(null);
		let selected = e.target.files[0]
		console.log(selected);

		if (!selected) {
			setThumbnailError("Please select a file");
			return;
		}

		if (!selected.type.includes("image")) {
			setThumbnailError("Selected file must be an image");
			return;
		}

		if (!selected.size > 100000) {
			setThumbnailError("Each File size must be less than 100kb");
			return;
		}

		setThumbnailError(null);
    setThumbnail(selected)
    console.log('Thumbnail updated');
	};

	return (
		<form className="auth-form" onSubmit={handleSubmit}>
			<h2>Sign up</h2>

			<label>
				<span>Username</span>
				<input
					type="text"
					value={displayName}
					onChange={(e) => setDisplayName(e.target.value)}
					required
				/>
			</label>
			<label>
				<span>email:</span>
				<input
					type="email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					required
				/>
			</label>
			<label>
				<span>Password</span>
				<input
					type="password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					required
				/>
			</label>
			<label>
				<span>Profile Thumbnail:</span>
				<input
					type="file"
					onChange={handleFileChange}
					required
				/>
        {thumbnailError && <div className="error">{thumbnailError}</div>}
			</label>
      {isPending && <button className="btn" disabled>Loading</button>}
			{!isPending && <button className="btn">Sign up</button>}
      {error && <div className="error">{error}</div>}
		</form>
	);
}
