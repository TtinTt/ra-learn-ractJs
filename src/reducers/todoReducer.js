const initialState = {
  todos: [],
};

const todoReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_TODO":
      return {
        ...state,
        todos: [...state.todos, action.payload],
      };
    case "DELETE_TODO":
      const updatedTodos = state.todos.filter(
        (todo) => todo.id !== action.payload
      );
      return {
        ...state,
        todos: updatedTodos,
      };
    case "UPDATE_TODO":
      const updatedTodoList = state.todos.map((todo) => {
        if (todo.id === action.payload.id) {
          return {
            ...todo,
            title: action.payload.title,
            completed: action.payload.completed,
          };
        } else {
          return todo;
        }
      });
      return {
        ...state,
        todos: updatedTodoList,
      };
    default:
      return state;
  }
};
export default todoReducer;
