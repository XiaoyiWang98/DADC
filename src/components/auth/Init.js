import React, {Component} from 'react';

class Init extends Component {
    render() {
        return (
            <div>
                <a onClick={this.props.afterInit}>
                    Login </a>
            </div>
        );
    }
}

export default Init;