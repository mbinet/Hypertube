import React, { Component } from 'react';

/*
 * Note: This is kept as a container-level component,
 *  i.e. We should keep this as the container that does the data-fetching
 *  and dispatching of actions if you decide to have any sub-components.
 */
//const Dashboard = () => <div>Welcome to the Dasboard. Stay tuned... {this.props.userId}</div>;
class Dashboard extends Component {
    render() {
        return (<div>Welcome to the Dasboard. Stay tuned... {this.props.userId}</div>)
    }
}
export default Dashboard;
