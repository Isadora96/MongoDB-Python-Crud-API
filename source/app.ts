//decorator is a func
function autobind(target: any, methodName: any, descriptor: PropertyDescriptor) {
    //target = ProjectInput Class
    //methodName = 'submitHandler'
    //descriptor = object
    //descriptor.value = function submitHandler(event) { event.preventDefault(); console.log(this.titleEl.value); }

    const originalMethod = descriptor.value;
    const adjDescriptor: PropertyDescriptor = {
        configurable: true,
        get() {
            //boundFn = function submitHandler() { [native code] }
            //this = ProjectInput clsss
            const boundFn = originalMethod.bind(this);
            return boundFn;
        }
    };
    return adjDescriptor;
}

class ProjectInput {
    templateElement: HTMLTemplateElement;
    hostElement: HTMLDivElement;
    element: HTMLFormElement;
    titleEl: HTMLInputElement;
    descriptionEl:HTMLInputElement;
    peopleEl: HTMLInputElement;
    isvalidEl: NodeListOf<HTMLSpanElement>;

    constructor() {
        this.templateElement = document.getElementById('project-input')! as HTMLTemplateElement;
        this.hostElement = document.getElementById('app')! as HTMLDivElement;

        const importedNode = document.importNode(this.templateElement.content, true);

        this.element = importedNode.firstElementChild as HTMLFormElement;
        this.element.id = 'user-input';

        this.titleEl = this.element.querySelector('#title') as HTMLInputElement;
        this.descriptionEl = this.element.querySelector('#description') as HTMLInputElement;
        this.peopleEl = this.element.querySelector('#people') as HTMLInputElement;
        this.isvalidEl = this.element.querySelectorAll('span') as NodeListOf<HTMLSpanElement>;

        this.configure();
        this.attach();
    }

    private gatherUserInput(): [string, string, number] | void {
        const enteredTitle = this.titleEl.value;
        const enteredDescription = this.descriptionEl.value;
        const enteredPeople = this.peopleEl.value;
        const isvalid = this.isvalidEl;

        if(enteredTitle.trim().length === 0 && enteredDescription.trim().length ===  0 && enteredPeople.trim().length === 0) {
            isvalid.forEach((el) => el.innerHTML = 'Invalid input, please try again!!');
            return;
        } else {
            isvalid.forEach((el) => el.innerHTML = '');
            return [enteredTitle, enteredDescription, +enteredPeople];
        }
    }

    private clearInputs() {
        this.titleEl.value = '';
        this.descriptionEl.value = '';
        this.peopleEl.value = '';
    }

    @autobind
    private submitHandler(event :Event) {
        event.preventDefault();
        const userInput = this.gatherUserInput();
        if(Array.isArray(userInput)) {
            const [title, desc, people] = userInput;
            console.log(title, desc, people);
            localStorage.setItem('items', JSON.stringify(userInput));
            this.clearInputs();
        }
    }

    private configure() {
        this.element.addEventListener("submit", this.submitHandler);
    }

    private attach() {
        this.hostElement.insertAdjacentElement('afterbegin', this.element);

    }
}

class ProjectInput2 {
    templateElement: HTMLTemplateElement;
    hostElement: HTMLFormElement;
    element: HTMLLIElement;

    constructor() {
        this.templateElement = document.getElementById('single-project')! as HTMLTemplateElement;
        this.hostElement = document.querySelector('form')! as HTMLFormElement;

        const importedNode = document.importNode(this.templateElement.content, true);

        this.element = importedNode.firstElementChild as HTMLLIElement;
        this.attach();
    }

    private attach() {
        this.hostElement.insertAdjacentElement('afterend', this.element);

    }
}

class Project {
    title: string;
    description: string;
    people: number;
    active: boolean;

    constructor (t: string, d: string, p: number, a: boolean) {
        this.title = t;
        this.description = d;
        this.people = p;
        this.active = a;
    }
}

const prjInput = new ProjectInput();






