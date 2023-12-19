import React from 'react';
import AuthProvider from './components/Auth/AuthProvider';
import Routesl from './Routes';

function App() {
  // static displayName = App.name;
  // const { token } = useAuth();

  // render() {
    return (
  <AuthProvider>
          <Routesl />
        </AuthProvider>
    );
  // }
}

export default App;