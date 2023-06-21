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
    
    const displayTodo = () => {
        const todos = todoStore.getTodos(todoStore.getCurrentFilter());
        renderTodos(ElementIDs.TodoList, todos);

    };

    //Cuando la funcion app se llama
    (()=>{
        const app = document.createElement('div');
        app.innerHTML = html;
        document.querySelector(elementId).append( app );
        displayTodo();

    })();

    // Referencias HTML
    const newDescriptionInput = document.querySelector(ElementIDs.newTodoInput);
    const todoListUl = document.querySelector(ElementIDs.TodoList);

    // Listeners
    newDescriptionInput.addEventListener('keyup', ( event ) => {

        if( event.keyCode !== 13 ) return;
        if( event.target.value.trim().length === 0);

        todoStore.addTodo( event.target.value );
        displayTodo();

        event.target.value = '';
    });


    todoListUl.addEventListener('click', ( event ) => {
        const element = event.target.closest('[data-id]');
        todoStore.toogleTodo(element.getAttribute('data-id'));
        displayTodo();
        
        
        
    });


};