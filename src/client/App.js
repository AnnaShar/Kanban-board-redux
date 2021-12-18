import React from 'react';
import {Switch, Route} from 'react-router-dom';
import {Provider} from 'react-redux';
import {ErrorPage} from './error/ErrorPage.js';
import {BoardContainer} from './board/BoardContainer.js';
import {store} from './redux-store/store.js';

const App = () => {
    return (
        <Switch>
            <Provider store={store}>
                <Route exact path='/' component={BoardContainer}/>
            </Provider>

            <Route path='/error' component={ErrorPage}/>
        </Switch>
    );
}

export default App;