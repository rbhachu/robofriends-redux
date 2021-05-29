import { 
    CHANGE_SEARCH_FIELD,
    REQUEST_ROBOTS_PENDING,
    REQUEST_ROBOTS_SUCCESS,
    REQUEST_ROBOTS_FAILED
} from './constants.js';

export const setSearchfield = (text) => { // get text from search input field
    //console.log(text); // check text input field output
    return {
        type: CHANGE_SEARCH_FIELD, // return object action
        payload: text // send text data to reducer
    }
}

// get api list
export const requestRobots = () => (dispatch) => { // initate getting api list
    dispatch({ type: REQUEST_ROBOTS_PENDING }) // set status as pending
    fetch('https://jsonplaceholder.typicode.com/users') // get api list
        .then(response => response.json()) // convert list into useable formart aka json
        .then(data => dispatch({ type: REQUEST_ROBOTS_SUCCESS, payload: data })) // then either show success OR
        .catch(error => dispatch({ type: REQUEST_ROBOTS_FAILED, payload: error })) // failure for recieving api list
}