import React, { Component } from 'react';
import mobiscroll from '@mobiscroll/react';

export default class SettingsPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            enabled: true,
            language: 'en',
            birthday: new Date(1987, 2, 25)
        };
        
        this.enable = this.enable.bind(this);
    }

    enable(event) {
        this.setState({
            enabled: event.target.checked
        });
    }

    render() {
        return (
            <mobiscroll.Form>
                <div className="app-tab">
                    <div className="app-header">
                        <h3>Settings</h3>
                    </div>
                    <div className="mbsc-form-group">
                        <div className="mbsc-form-group-title">Sound</div>
                        <mobiscroll.Slider value="100" icon="phone">Ring</mobiscroll.Slider>
                        <mobiscroll.Slider value="60" icon="music">Media</mobiscroll.Slider>
                        <mobiscroll.Slider value="80" icon="alarm2">Alarm</mobiscroll.Slider>
                    </div>
                    <div className="mbsc-form-group">
                        <div className="mbsc-form-group-title">Notifications</div>
                        <mobiscroll.Switch onChange={this.enable} value={this.state.enabled}>
                            Enable notifications
                            <span className="mbsc-desc">Allow notifications on this device</span>
                        </mobiscroll.Switch>
                        <mobiscroll.Switch className="settings-notify" defaultChecked disabled={!this.state.enabled}>
                            Message
                            <span className="mbsc-desc"> Get notifications when someone sends you a message</span>
                        </mobiscroll.Switch>
                        <mobiscroll.Switch className="settings-notify" defaultChecked disabled={!this.state.enabled}>
                            Birthdays
                            <span className="mbsc-desc"> Get notifications about your friends ' birthdays</span>
                        </mobiscroll.Switch>
                        <mobiscroll.Switch className="settings-notify" defaultChecked disabled={!this.state.enabled}>
                            Tags
                            <span className="mbsc-desc"> Get notifications when you 're tagged</span>
                        </mobiscroll.Switch>
                    </div>
                    <div className="mbsc-form-group-title"> Security</div>
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
                                type="password"
                            />
                    </label>
                </div>
            </mobiscroll.Form>
        );
    }
}