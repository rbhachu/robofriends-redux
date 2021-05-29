import React, { Component } from 'react';
import { connect } from 'react-redux'; // import redux connect function 
import CardsList from '../components/CardsList';
import SearchBox from '../components/SearchBox';
import ErrorBoundary from '../components/ErrorBoundary'; // error checker
import { requestRobots, setSearchfield } from '../actions.js'; // import actions


// parameter state comes from index.js provider store state(rootReducers)
const mapStateToProps = (state) => { // recieves a state
    return {
        searchField: state.searchRobots.searchField, // return object coming from reducer
        robots: state.requestRobots.robots,
        isPending: state.requestRobots.isPending,
        error: state.requestRobots.error
    }
}

// dispatch the DOM changes to call an action. note mapStateToProps returns object, mapDispatchToProps returns function
// the function returns an object then uses connect to change the data from redecers.
const mapDispatchToProps = (dispatch) => { // dispatch sends action from mapStateToProps
    return {
        onSearchChange: (event) => dispatch(setSearchfield(event.target.value)), // check event for text input change from searchfield
        //onRequestRobots: () => requestRobots(dispatch)
        onRequestRobots: () => dispatch(requestRobots())        
    }
}


class App extends Component {

    componentDidMount() {
        this.props.onRequestRobots();
    }
    
    render() {
        const { robots, searchField, onSearchChange, isPending } = this.props; //get props
        const filteredRobots = robots.filter(robot => {
            return robot.name.toLowerCase().includes(searchField.toLowerCase());
        })

    return (
            <>
                { isPending ? 
                    <div className='tc'>
                        <header>
                            <h1 className='f1 fw2 light-blue'>Loading...</h1>
                        </header>
                    </div>
                :
                    <div className='tc'>
                        <header>
                            <h1 className='f1 fw2 light-blue'>RoboFriends</h1>
                        </header>
                        <section>
                            <SearchBox searchChange={onSearchChange}/>
                            <ErrorBoundary>
                                <CardsList robots={filteredRobots} /> 
                            </ErrorBoundary>
                        </section>
                    </div>
                }
            </>
        )
    }
}

// action done from mapDispatchToProps will channge state from mapStateToProps
export default connect(mapStateToProps, mapDispatchToProps)(App); // pass redux connect with App (defined as a higher order component), pass actions