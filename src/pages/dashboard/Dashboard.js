import React from "react";
import ProjectList from "../../components/ProjectList";
import { useCollection } from "../../hooks/useCollection";
import ProjectFilter from "./ProjectFilter";
import { useState } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";

export default function Dashboard() {
	const { documents, error } = useCollection("projects");
	const [currentFilter, setCurrentFilter] = useState("all");
	const { user } = useAuthContext();

	const changeFilter = (newFilter) => {
		setCurrentFilter(newFilter);
	};

	const filteredProjects = documents ? documents.filter((document) => {
		switch (currentFilter) {
			case "all":
				return true;
			case "mine":
				let assignedToMe = false;
				document.assignedUsersList.forEach((u) => {
					if (user.uid === u.id) {
						assignedToMe = true;
					}
				});
				return assignedToMe;

			case "development":
			case "design":
			case "sales":
			case "marketing":
        console.log(document.category, currentFilter);
        return document.category === currentFilter
        default:
          return true
		}
	}) : null

	return (
		<div>
			<h2 className="page-title">Dashboard</h2>
			{error && <p className="error">{error}</p>}
			{documents && (
				<ProjectFilter
					currentFilter={currentFilter}
					changeFilter={changeFilter}
				/>
			)}
			{filteredProjects && <ProjectList projects={filteredProjects} />}
		</div>
	);
}
