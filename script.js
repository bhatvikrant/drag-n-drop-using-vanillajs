const draggables = document.querySelectorAll(".draggable");
const containers = document.querySelectorAll(".container");

draggables.forEach(draggable => {
	draggable.addEventListener("dragstart", () => {
		// console.log("drag start!");

		draggable.classList.add("dragging"); // Adding the class of dragging to the element that is currently being dragged
	});

	draggable.addEventListener("dragend", () => {
		// console.log("drag end!");

		draggable.classList.remove("dragging"); // removing the class of dragging from the element that is currently being dragged
	});
});

containers.forEach(container => {
	container.addEventListener("dragover", e => {
		// console.log("dragover");

		e.preventDefault();
		const afterElement = getDragAfterElement(container, e.clientY);
		// console.log("afterElement:", afterElement);
		const draggable = document.querySelector(".dragging");

		if (afterElement == null) {
			container.appendChild(draggable);
		} else {
			container.insertBefore(draggable, afterElement);
		}
	});
});

function getDragAfterElement(container, y) {
	// Here y is the y-coordinate of the mouse

	const draggableElements = [
		...container.querySelectorAll(".draggable:not(.dragging)"),
	]; // querying an array of all the elements inside the container except the currently dragging element

	return draggableElements.reduce(
		(closest, child) => {
			const box = child.getBoundingClientRect();
			// console.log('box:', box)

			const offset = y - box.top - box.height / 2;
			// console.log("offset:", offset);

			if (offset < 0 && offset > closest.offset) {
				return {
					offset,
					element: child,
				};
			} else {
				return closest;
			}
		},
		{ offset: Number.NEGATIVE_INFINITY },
	).element;
}
