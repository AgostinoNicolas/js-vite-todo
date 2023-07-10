import html from './app.html?raw';
import { renderPending, renderTodos } from './use-cases';
import todoStore, {Filters} from '../store/todo.store';


const ElementIDs = {
    ClearCompletedButton: '.clear-completed',
    TodoList: '.todo-list',
    NewTodoInput: '#new-todo-input',
    TodoFilter: '.filtro',
    PendingCountLabel: '#pending-count',

};


/**
 * 
 * @param {String} elementId 
 */ 
export const App = (elementId) => {
    
    const displayTodos = () => {
        const todos = todoStore.getTodos(todoStore.getCurrentFilter());
        renderTodos(ElementIDs.TodoList, todos);
        updatePendingCount();

    };

    const updatePendingCount = () => {
        renderPending(ElementIDs.PendingCountLabel);
    }

    //Cuando la funcion app se llama
    (()=>{
        const app = document.createElement('div');
        app.innerHTML = html;
        document.querySelector(elementId).append( app );
        displayTodos();

    })();

    // Referencias HTML
    const newDescriptionInput = document.querySelector(ElementIDs.NewTodoInput);
    const todoListUl = document.querySelector(ElementIDs.TodoList);
    const clearCompletedButton = document.querySelector(ElementIDs.ClearCompletedButton);
    const filterLIs = document.querySelectorAll(ElementIDs.TodoFilter);
    
    

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


    todoListUl.addEventListener('click', ( event ) => {
        const isDestroyElement =  event.target.className === 'destroy';
        const element = event.target.closest('[data-id]');
        if ( !element || !isDestroyElement ) return;
        todoStore.deleteTodo(element.getAttribute('data-id'));
        displayTodos();    
    });


    clearCompletedButton.addEventListener('click', () =>{
        todoStore.deleteCompleted();
        displayTodos();
        
    });

    
    
    filterLIs.forEach( element => {
            element.addEventListener('click', (element) => {
                filterLIs.forEach( el => el.classList.remove('selected'));

                element.target.classList.add('selected');
                    
                console.log(element.target.text);

                switch (element.target.text){
                    case 'Todos':
                        todoStore.setFilter(Filters.All);
                    break;
                    case 'Pendientes':
                        todoStore.setFilter(Filters.Pending);
                    break;
                    case 'Completados':
                        todoStore.setFilter(Filters.Completed);
                    break;                    
                }

                displayTodos();
            
            });        

            
            
        });

 

};