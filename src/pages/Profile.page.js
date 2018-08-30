import React, { Component } from 'react';
import mobiscroll from '@mobiscroll/react';

export default class ProfilePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            language: 'en',
            birthday: new Date(1987, 2, 25)
        };

        this.setBirthday = this.setBirthday.bind(this);
        this.setLanguage = this.setLanguage.bind(this);
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

    render() {
        return (
            <mobiscroll.Form>
                <div className="app-tab">
                    <div className="app-header">
                        <h3>Profile</h3>
                    </div>
                    <div className="mbsc-form-group">
                        <div className="mbsc-form-group-title">Personal Data</div>
                        <mobiscroll.Input defaultValue="Angelica">First Name</mobiscroll.Input>
                        <mobiscroll.Input defaultValue="Geary">Last Name</mobiscroll.Input>
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
                        <mobiscroll.Segmented name="gender" value="male">Male</mobiscroll.Segmented>
                        <mobiscroll.Segmented name="gender" value="female" defaultChecked>Female</mobiscroll.Segmented>
                    </div>
                    <div className="mbsc-form-group">
                        <div className="mbsc-form-group-title">Account</div>
                        <mobiscroll.Input type="email" defaultValue="angelica.geary@gmail.com">Email</mobiscroll.Input>
                        <mobiscroll.Input type="password" passwordToggle={true}>Password</mobiscroll.Input>
                    </div>
                    <div className="mbsc-padding">
                        <mobiscroll.Button block={true}>Save</mobiscroll.Button>
                    </div>
                </div>
            </mobiscroll.Form>
        );
    }
}