import React, { Component } from 'react';
import update from 'immutability-helper';
import './App.css';
import mobiscroll from '@mobiscroll/react';

mobiscroll.settings = {
    theme: 'ios' /* set global theme */
}

class ListItem extends Component {
    render() {
        return <li><input type="checkbox" data-role="none" defaultChecked={this.props.item.checked}/>{this.props.item.text}</li>;
    }
}

class App extends Component {
    constructor(props, context) {
        super(props, context);

        this.newId = 5;
        this.state = {
            items: [{
                id: 1,
                text: "Do the laundry",
                checked: true
            }, {
                id: 2,
                text: "Don't forget mom's birthday!",
                checked: true
            }, {
                id: 3,
                text: "Buy new shoes"
            }, {
                id: 4,
                text: "Need ketchup for pizza"
            }],
            enabled: true,
            language: 'en',
            birthday: new Date(1987, 2, 25),
            selectedMenu: 'home'
        };

        this.enable = this.enable.bind(this);
        this.addItem = this.addItem.bind(this);
        this.removeItem = this.removeItem.bind(this);
        this.setBirthday = this.setBirthday.bind(this);
        this.setLanguage = this.setLanguage.bind(this);
        this.selectMenu = this.selectMenu.bind(this);
    }

    addItem(event) {
        var upd = update(this.state, { items: { $splice: [[event.index + 1, 0, { id: this.newId++, text: 'New Todo' }]] } });
        this.setState(upd);
    }

    removeItem(event) {
        var upd = update(this.state, { items: { $splice: [[event.index, 1]] } });
        this.setState(upd);
        return false;
    }

    stages() {
        return {
            left: [{
                key: 'stage1',
                icon: 'plus',
                color: '#31c6e7',
                text: 'Add',
                percent: 30,
                action: this.addItem
            }],
            right: [{
                key: 'stage2',
                color: '#009688',
                text: 'Remove',
                icon: 'remove',
                percent: -30,
                action: this.removeItem
            }]
        }
    }

    enable(event) {
        this.setState({
            enabled: event.target.checked
        });
    }

    setBirthday(event, inst) {
        this.setState({
            birthday: inst.getVal()
        });
    }

    setLanguage(event, inst) {
        this.setState({
            language: inst.getVal()
        });
    }

    selectMenu(newMenu) {
        this.setState({
            selectedMenu: newMenu
        });

        document.querySelector('.app-tab-active').classList.remove('app-tab-active');
        document.querySelector('.tab-' + newMenu).classList.add('app-tab-active');
    }

    render() {
        return (
            <mobiscroll.Page className="app-page">
                <mobiscroll.Form >
                    <div className="app-tab app-tab-active app-tab-home tab-home">
                        <div className="app-header">
                            <h3>Home</h3>
                        </div>

                        <label>
                            Date
                            <mobiscroll.Calendar value={new Date()}/>
                        </label>

                        <div className="mbsc-divider">Todo List</div>

                        <mobiscroll.Listview
                            className="app-todo"
                            itemType={ListItem}
                            data={this.state.items}
                            stages={this.stages()}
                        />
                    </div>

                    <div className="app-tab tab-settings">
                        <div className="app-header">
                            <h3>Settings</h3>
                        </div>
                        <div className="mbsc-form-group">
                            <div className="mbsc-form-group-title">Sound</div>
                            <label>
                                Ring
                                <input type="range" data-icon="phone" defaultValue="100" />
                            </label>
                            <label>
                                Media
                                <input type="range" data-icon="music" defaultValue="60" />
                            </label>
                            <label>
                                Alarm
                                <input type="range" data-icon="alarm2" defaultValue="80" />
                            </label>
                        </div>
                        <div className="mbsc-form-group">
                            <div className="mbsc-form-group-title">Notifications</div>
                            <label>
                                <mobiscroll.Switch onChange={this.enable} defaultChecked>
                                    Enable notifications
                                    <span className="mbsc-desc"> Allow notifications on this device</span>
                                </mobiscroll.Switch>
                            </label>
                            <label>
                                <mobiscroll.Switch className="settings-notify" defaultChecked disabled={!this.state.enabled}>
                                    Message
                                    <span className="mbsc-desc"> Get notifications when someone sends you a message</span>
                                </mobiscroll.Switch>
                            </label>
                            <label>
                                <mobiscroll.Switch className="settings-notify" defaultChecked disabled={!this.state.enabled}>
                                    Birthdays
                                    <span className="mbsc-desc"> Get notifications about your friends ' birthdays</span>
                                </mobiscroll.Switch>
                            </label>
                            <label>
                                <mobiscroll.Switch className="settings-notify" defaultChecked disabled={!this.state.enabled}>
                                    Tags
                                    <span className="mbsc-desc"> Get notifications when you 're tagged</span>
                                </mobiscroll.Switch>
                            </label>
                        </div>
                        <div className="mbsc-form-group-title"> Security
                        </div>
                        <label>
                            Set PIN
                            <mobiscroll.Numpad
                                template="dddd"
                                allowLeadingZero={true}
                                placeholder="-"
                                mask="*"
                                validate={function (event) {
                                    return {
                                        invalid: event.values.length !== 4
                                    };
                                }}
                            >
                                <input type="password" />
                            </mobiscroll.Numpad>
                        </label>
                    </div>

                    <div className="app-tab tab-profile">
                        <div className="app-header">
                            <h3>Profile</h3>
                        </div>
                        <div className="mbsc-form-group">
                            <div className="mbsc-form-group-title">Personal Data</div>
                            <label>
                                First Name
                                <input defaultValue="Angelica" />
                            </label>
                            <label>
                                Last Name
                                <input defaultValue="Geary" />
                            </label>
                            <label>
                                Language
                                <mobiscroll.Select value={this.state.language} onSet={this.setLanguage}>
                                    <option value="de">Deutsch</option>
                                    <option value="en">English</option>
                                    <option value="es">Espa&#241;ol</option>
                                    <option value="fr">Fran&#231;ais</option>
                                    <option value="it">Italiano</option>
                                </mobiscroll.Select>
                            </label>
                            <label>
                                Birthday
                                <mobiscroll.Date value={this.state.birthday} onSet={this.setBirthday} />
                            </label>

                            <label>
                                Male
                                <input type="radio" data-role="segmented" name="gender" />
                            </label>
                            <label>
                                Female
                                <input type="radio" data-role="segmented" name="gender" defaultChecked />
                            </label>
                        </div>
                        <div className="mbsc-form-group">
                            <div className="mbsc-form-group-title">Account</div>
                            <label>
                                Email
                                <input type="email" defaultValue="angelica.geary@gmail.com" />
                            </label>
                            <label>
                                Password
                                <input type="password" data-password-toggle="true" />
                            </label>
                        </div>
                        <div className="mbsc-padding">
                            <button className="mbsc-btn-block">Save</button>
                        </div>
                    </div>

                    <mobiscroll.TabNav
                        display="bottom"
                    >
                        <mobiscroll.NavItem  selected={this.state.selectedMenu === 'home'}  onClick={this.selectMenu.bind(null, 'home')} data-tab="home"  icon="home">Home</mobiscroll.NavItem>
                        <mobiscroll.NavItem selected={this.state.selectedMenu === 'settings'}   onClick={this.selectMenu.bind(null, 'settings')} data-tab="settings"  icon="cogs">Settings</mobiscroll.NavItem>
                        <mobiscroll.NavItem  selected={this.state.selectedMenu === 'profile'} onClick={this.selectMenu.bind(null, 'profile')} data-tab="profile" icon="user4">Profile</mobiscroll.NavItem>
                    </mobiscroll.TabNav>
                </mobiscroll.Form>
            </mobiscroll.Page>
        );
    }
}

export default App;

