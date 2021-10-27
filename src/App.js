import React from "react";
import styled from "styled-components";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink,
} from "react-router-dom";
import PostReviews from "./components/PostReviews";
import TeamDashboard from "./components/TeamDashboard";

const MainContainer = styled.div`
  font-family: Helvetica, sans-serif;
  font-size: 16px;
`;

const NavContainer = styled.ul`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  width: auto;
  background-color: royalblue;
  padding: 1rem;
  font-size: 20px;
  font-weight: 700;
`;

const NavigationLink = styled(NavLink)`
  text-decoration: none;
  color: #dddddd;
`;

const NavItem = styled.li`
  list-style: none;
  width: max-content;
`;

const App = () => {
  return (
    <Router>
      <MainContainer>
        <NavContainer>
          <NavItem>
            <NavigationLink to="/player">PLAYER DASHBOARD</NavigationLink>
          </NavItem>
          <NavItem>
            <NavigationLink to="/opsTeam">OPS TEAM DASHBOARD</NavigationLink>
          </NavItem>
        </NavContainer>
        <Switch>
          <Route path="/opsTeam">
            <TeamDashboard />
          </Route>
          <Route path="/player">
            <PostReviews />
          </Route>
        </Switch>
      </MainContainer>
    </Router>
  );
};

export default App;
