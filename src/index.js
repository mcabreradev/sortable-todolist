(async () => {
  const res = await fetch(
    "https://jsonplaceholder.typicode.com/todos?_limit=10"
  );
  const todos = await res.json();
  const list = document.querySelectorAll(".list");

  console.log(document.querySelectorAll(".list")[0]);

  todos.forEach((todo) => {
    let node = document.createElement("li");
    node.className = "draggable box";
    node.draggable = true;
    node.innerText = `${todo.id} - ${todo.title}`;
    list[0].appendChild(node);
  });

  const draggables = document.querySelectorAll(".draggable");
  draggables.forEach((draggable) => {
    draggable.addEventListener("dragstart", () => {
      draggable.classList.add("dragging");
    });

    draggable.addEventListener("dragend", () => {
      draggable.classList.remove("dragging");
    });
  });

  list.forEach((list_item) => {
    list_item.addEventListener("dragover", (e) => {
      e.preventDefault();
      const afterElement = getDragAfterElement(list_item, e.clientY);
      const draggable = document.querySelector(".dragging");
      if (afterElement == null) {
        list_item.appendChild(draggable);
      } else {
        list_item.insertBefore(draggable, afterElement);
      }
    });
  });

  function getDragAfterElement(list_item, y) {
    const draggableElements = [
      ...list_item.querySelectorAll(".draggable:not(.dragging)")
    ];

    return draggableElements.reduce(
      (closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = y - box.top - box.height / 2;
        if (offset < 0 && offset > closest.offset) {
          return { offset: offset, element: child };
        } else {
          return closest;
        }
      },
      { offset: Number.NEGATIVE_INFINITY }
    ).element;
  }
})();
