import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';

import Dashboard from '../pages/Dashboard';
import CreateTeam from '../pages/CreateTeam';
import EditTeam from '../pages/EditTeam';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/create_team" component={CreateTeam} />
    <Route path="/edit_team" component={EditTeam} />
    <Route path="/" component={Dashboard} />
  </Switch>
);

export default Routes;
