import React, { Component } from 'react';
import update from 'immutability-helper';
import mobiscroll from '@mobiscroll/react';

class ListItem extends Component {
    render() {
        return <li><input type="checkbox" data-role="none" defaultChecked={this.props.item.checked} />{this.props.item.text}</li>;
    }
}

export default class HomePage extends Component {
    constructor(props) {
        super(props);
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
            }]
        };

        this.stages = this.stages.bind(this);
        this.addItem = this.addItem.bind(this);
        this.removeItem = this.removeItem.bind(this);

        this.stagesObj = {
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

    stages() {
        return this.stagesObj;
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

    render() {
        return (
            <mobiscroll.Form>
                <div className="app-tab">
                    <div className="app-header">
                        <h3>Home</h3>
                    </div>

                    <label>
                        Date
                        <mobiscroll.Calendar value={new Date()} />
                    </label>

                    <div className="mbsc-divider">Todo List</div>

                    <mobiscroll.Listview
                        className="app-todo"
                        itemType={ListItem}
                        data={this.state.items}
                        stages={this.stages()}
                    />
                </div>
            </mobiscroll.Form>
        );
    }
}