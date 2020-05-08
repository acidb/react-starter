import React, { Component } from 'react';
import { Switch, BrowserRouter, Route, withRouter } from 'react-router-dom';
import './App.css';
import mobiscroll from '@mobiscroll/react';
import HomePage from './pages/Home.page';
import SettingsPage from './pages/Settings.page';
import ProfilePage from './pages/Profile.page';

mobiscroll.settings = {
    theme: 'ios' /* set global theme */
}

// config to use react router
mobiscroll.setupReactRouter(Route, withRouter)

class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <mobiscroll.Page className="app-page">
                    <Switch>
                        <Route path="/" exact={true} component={HomePage} />
                        <Route path="/settings" component={SettingsPage} />
                        <Route path="/profile" component={ProfilePage} />
                    </Switch>

                    <mobiscroll.BottomNav>
                        <mobiscroll.NavItem to="/" exact={true} icon="home">Home</mobiscroll.NavItem>
                        <mobiscroll.NavItem to="/settings" icon="cogs">Settings</mobiscroll.NavItem>
                        <mobiscroll.NavItem to="/profile" icon="user4">Profile</mobiscroll.NavItem>
                    </mobiscroll.BottomNav>
                </mobiscroll.Page>
            </BrowserRouter>
        );
    }
}

export default App;