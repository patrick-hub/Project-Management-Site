import "./Navbar.css";
import Temple from "../assets/temple.svg";
import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";

import React from "react";

export default function Navbar() {
	const { logout, isPending } = useLogout();

	const { user, authIsReady } = useAuthContext();
	return (
		<div className="navbar">
			{authIsReady && (
				<ul>
					<li className="logo">
						<img src={Temple} alt="logo" />
						<span>PMS</span>
					</li>
					{!user && (
						<>
							<li>
								<Link to="/login">Login</Link>
							</li>
							<li>
								<Link to="/signup">Signup</Link>
							</li>
						</>
					)}

					{user && (
						<>
							<li>
								{isPending && (
									<button className="btn" disabled>
										Logging out...
									</button>
								)}

								{!isPending && (
									<button className="btn" onClick={logout}>
										logout
									</button>
								)}
							</li>
						</>
					)}
				</ul>
			)}
		</div>
	);
}
