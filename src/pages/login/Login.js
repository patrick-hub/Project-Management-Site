
import React, { useState } from "react";
import { useLogin } from "../../hooks/useLogin";
import './Login.css'


export default function Login() {
	const [email, setEmail] = useState("");
  const [password, setPassword] = useState('')
  

  const {login, isPending, error} = useLogin()

  const handleSubmit = (e) => {
    e.preventDefault()
    login(email, password);
  }
	return (
		<form className="auth-form" onSubmit={handleSubmit}>
			<h2>Login</h2>

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

			{isPending && (
				<button className="btn" disabled>
					Loading
				</button>
			)}
			{!isPending && <button className="btn">Login</button>}
			{error && <div className="error">{error}</div>}
		</form>
	);
}
