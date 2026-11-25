export default class Project {
    constructor(name) {
        this.name = name;
        this.listoftodos = [];
    }
    addtodo(addnew) {
        this.listoftodos.push(addnew);
    }
}