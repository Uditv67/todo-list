import Todo from "./todo.js";
import Project from "./project.js";

const KEY = "projects";

export function saveProjects(projects) {
    localStorage.setItem(KEY, JSON.stringify(projects));
}

export function loadProjects() {
    try {
        const saved = localStorage.getItem(KEY);
        if (!saved) return null;

        const data = JSON.parse(saved);
        return data.map((p) => {
            const project = new Project(p.name);
            for (let t of p.listoftodos) {
                project.addtodo(
                    new Todo(
                        t.title,
                        t.description,
                        t.dueDate,
                        t.priority,
                        t.notes,
                        t.checklist,
                        t.completed
                    )
                );
            }
            return project;
        });
    } catch (error) {
        return null;
    }
}