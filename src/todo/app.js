import html from './app.html?raw';
import { renderTodos } from './use-cases';
import todoStore from '../store/todo.store';


const ElementIDs = {
    TodoList: '.todo-list',
    newTodoInput: '#new-todo-input',
};


/**
 * 
 * @param {String} elementId 
 */ 
export const App = (elementId) => {
    
    const displayTodos = () => {
        const todos = todoStore.getTodos(todoStore.getCurrentFilter());
        renderTodos(ElementIDs.TodoList, todos);

    };

    //Cuando la funcion app se llama
    (()=>{
        const app = document.createElement('div');
        app.innerHTML = html;
        document.querySelector(elementId).append( app );
        displayTodos();

    })();

    // Referencias HTML
    const newDescriptionInput = document.querySelector(ElementIDs.newTodoInput);
    const todoListUl = document.querySelector(ElementIDs.TodoList);

    // Listeners
    newDescriptionInput.addEventListener('keyup', ( event ) => {

        if( event.keyCode !== 13 ) return;
        if( event.target.value.trim().length === 0) return;
        todoStore.addTodo( event.target.value );
        displayTodos();

        event.target.value = '';
    });


    todoListUl.addEventListener('click', ( event ) => {
        const element = event.target.closest('[data-id]');
        todoStore.toogleTodo(element.getAttribute('data-id'));
        displayTodos();
        
        
        
    });



};