import React from 'react';

import {
    Switch,
    Route
} from 'react-router-dom';

import HomeContainer from './containers/HomeContainer';

const Routes = () => (
        <Switch>
            <Route exact path='/' component={HomeContainer} />
        </Switch>
);

export default Routes;