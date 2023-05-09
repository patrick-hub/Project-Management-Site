import { useState, useEffect } from "react";
import { projectFireStore } from "../firebase/config";

export const useDocument = (collection, id) => {
	const [document, setDocument] = useState(null);
	const [error, setError] = useState(null);

	// realtime data for document
	useEffect(() => {
		const ref = projectFireStore.collection(collection).doc(id);

		// to get realtime update on the document
		const unsubscribe = ref.onSnapshot(
			(snapshot) => {
				if (snapshot.data()) {
					setDocument({ ...snapshot.data(), id: snapshot.id });
					setError(null);
				} else {
                    setError('No such document exists')
                }
			},
			(err) => {
				console.log(err.message);
				setError("Failed to get Document");
			}
		);
		return () => unsubscribe();
	}, [collection, id]);

	return { document, error };
};
