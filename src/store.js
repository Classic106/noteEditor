import { createStore } from 'redux';

const InitialState = {
    selectedItem: {},
    notes: [],
}
  
const reducer = function(state = InitialState, action) {

switch (action.type) {
    
    case "SET_NOTES":
        return {...state, notes: action.payload};
    
    case "REMOVE_NOTES":
        return {...state, notes: []};

    case "SET_SELECTED_ITEM":
        return {...state, selectedItem: action.payload};
    
    case "REMOVE_SELECTED_ITEM":
        return {...state, selectedItem: {}};

    default:
        return state;
}
}
 
const store = createStore(reducer);

export default store;