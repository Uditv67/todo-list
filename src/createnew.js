import Project from "./project.js";
import Todo from "./todo.js";
import { saveProjects, loadProjects } from "./storage.js";

export const list = [];

const saved = loadProjects();
if (saved && saved.length > 0) {
    list.push(...saved);
} else {
    list.push(new Project("Default"));
}

export function createProject(name)  {
    let addproj = new Project(name);
    list.push(addproj);
     saveProjects(list);
    return addproj;
}

export function createTodo(targetProject, title, description, dueDate, priority, notes, checklist, completed) {
    const newTodo = new Todo(title, description, dueDate, priority, notes, checklist, completed);
    targetProject.addtodo(newTodo);
     saveProjects(list);
}

export function updateTodo(todo, title, description, dueDate, priority, notes, completed) {
    todo.title = title;
    todo.description = description;
    todo.dueDate = dueDate;
    todo.priority = priority;
    todo.notes = notes;
    todo.completed = completed;
     saveProjects(list);
}

export function deleteTodo(project, todo) {
    const index = project.listoftodos.indexOf(todo);
    if (index !== -1) {
        project.listoftodos.splice(index, 1);
    }
     saveProjects(list);
}