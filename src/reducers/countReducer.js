const initState = {
  count: 3,
  // todos: []
};

const countReducer = (state = initState, action) => {
  switch (action.type) {
    case "UP_COUNT":
      console.log("countReducer", "UP_COUNT");
      return {
        // ...state
        count: state.count + action.payload,
        // todo: action.payload // {name: 'task 1', isFinished: false}
      };
    case "DOWN_COUNT":
      console.log("countReducer", "DOWN_COUNT");
      return {
        // ...state
        count: state.count - action.payload,
      };
    default:
      return state;
  }
};

export default countReducer;
