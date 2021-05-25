import React from 'react';
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import styled from 'styled-components/macro';
import Users from './components/Users';
import UserDetail from './components/UserDetail';
import UserContextProvider from './contexts/UserContext'

function App() {
  return (
    <UserContextProvider>
      <Container>
          <Router>
            <Switch>
              <Route
                exact
                path="/"
                render={props => <Users />}
              />
              <Route
                path="/user/:userId"
                render={props => <UserDetail />}
              />
            </Switch>
          </Router>
      </Container>
    </UserContextProvider>
  );
}

export default App;

const Container = styled.div`
  width: 100%;
  max-width: 1280px;
  display: block;
  box-sizing: border-box;
  margin-right: auto;
  margin-left: auto;
  padding: 32px 24px;

  @media only screen and (min-width: 768px) {
    padding: 100px 24px;
  }
`


