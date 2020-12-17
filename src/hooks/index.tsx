import React from 'react';

import { AuthProvider } from './auth';
import { PlayerProvider } from './players';
import { TeamsProvider } from './teams';

/**
 * To deal with global states in this project, since it is small, I'm using ContextAPI
 * from React, and it is used as hooks to let the global states and methods easily
 * to be accessed. Here in the main file gathering all the hooks(global states)
 * available to the project.
 */

const AppProvider: React.FC = ({ children }) => (
  <AuthProvider>
    <PlayerProvider>
      <TeamsProvider>{children}</TeamsProvider>
    </PlayerProvider>
  </AuthProvider>
);

export default AppProvider;
