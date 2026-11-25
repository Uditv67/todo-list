import {list, createProject, createTodo , updateTodo, deleteTodo} from "./createnew.js";
import { format, parseISO } from "date-fns";

let selected = list[0];
let expandedTodo = null;

function formatDate(dateString) {
    if (!dateString) return "No date";
    return format(parseISO(dateString), "MMM d, yyyy");
}

export function renderProjects() {
    const container = document.querySelector("#projects");
    container.textContent = "";
    for(let project of list) {
        const element = document.createElement("div");
        element.textContent = project.name;
        element.addEventListener("click", () => {
            selected = project;
            expandedTodo = null;
            renderTodos();
        });
        container.append(element);
    }
}

function expandTodos(todo) {
    const details = document.createElement("div");
    details.classList.add("details");

    const title = document.createElement("input");
    title.value = todo.title;

    const dueDate = document.createElement("input");
    dueDate.type = "date";
    dueDate.value = todo.dueDate;

    const description = document.createElement("textarea");
    description.value = todo.description;

    const priority = document.createElement("select");
    for (let level of ["low", "medium", "high"]) {
        const option = document.createElement("option");
        option.value = level;
        option.textContent = level;
        priority.append(option);
    }
    priority.value = todo.priority;

    const notes = document.createElement("textarea");
    notes.value = todo.notes;

    const completed = document.createElement("input");
    completed.type = "checkbox";
    completed.checked = todo.completed;
    const completedLabel = document.createElement("label");
    completedLabel.append(completed, " Completed");

    const save = document.createElement("button");
    save.type = "button";
    save.textContent = "Save";
    save.addEventListener("click", () => {
        updateTodo(
            todo,
            title.value,
            description.value,
            dueDate.value,
            priority.value,
            notes.value,
            completed.checked
        );
        renderTodos();
    });

    details.append(title, dueDate, description, priority, notes, completedLabel, save);
    return details;
}



export function renderTodos() {
    const container = document.querySelector("#todos");
    container.textContent = "";
    for(let todo of selected.listoftodos){
        const element = document.createElement("div");
        element.classList.add(`priority-${todo.priority}`);
        const header = document.createElement("div");
        header.textContent = `${todo.title} - ${formatDate(todo.dueDate)}`;
        if(todo.completed) {
            header.classList.add("completed");
        }
        header.addEventListener("click", () => {
            expandedTodo = expandedTodo === todo ? null : todo;
            renderTodos();
        });
        element.append(header);
        
        const remove = document.createElement("button");
        remove.type = "button";
        remove.textContent = "Delete";
        remove.addEventListener("click", () => {
            deleteTodo(selected, todo);
            if (expandedTodo === todo) {
                expandedTodo = null;
            }
            renderTodos();
        });
        element.append(remove);

        if (expandedTodo === todo) {
            element.append(expandTodos(todo));
            
        }
        container.append(element);
    }
}

export function renderProjectForm() {
    const container = document.querySelector("#project-form");
    container.textContent = "";

    const input = document.createElement("input");
    input.placeholder = "New project name";

    const add = document.createElement("button");
    add.type = "button";
    add.textContent = "Add project";
    add.addEventListener("click", () => {
        const name = input.value.trim();
        if (name === "") return;
        createProject(name);
        input.value = "";
        renderProjects();
        renderTodoForm();
    });

    container.append(input, add);
}

export function renderTodoForm() {
    const container = document.querySelector("#todo-form");
    container.textContent = "";

    const title = document.createElement("input");
    title.placeholder = "Title";

    const dueDate = document.createElement("input");
    dueDate.type = "date";

    const description = document.createElement("input");
    description.placeholder = "Description";

    const priority = document.createElement("select");
    for (let level of ["low", "medium", "high"]) {
        const option = document.createElement("option");
        option.value = level;
        option.textContent = level;
        priority.append(option);
    }

    const projectSelect = document.createElement("select");
    list.forEach((project, index) => {
        const option = document.createElement("option");
        option.value = index;
        option.textContent = project.name;
        projectSelect.append(option);
    });
    projectSelect.value = list.indexOf(selected);

    const add = document.createElement("button");
    add.type = "button";
    add.textContent = "Add todo";
    add.addEventListener("click", () => {
        if (title.value.trim() === "") return;
        const target = list[projectSelect.value];
        createTodo(target, title.value.trim(), description.value, dueDate.value, priority.value, "", []);
        selected = target;
        expandedTodo = null;
        title.value = "";
        description.value = "";
        dueDate.value = "";
        renderTodos();
    });

    container.append(title, dueDate, description, priority, projectSelect, add);
}
