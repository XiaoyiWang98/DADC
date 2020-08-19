import React, {Component} from 'react';


class NgoHome extends Component {

    render() {
        const {firstName, lastName, donationCount} = this.props;
        return (
            <div className="home-tab">
                <h1>Hi, {firstName} {lastName}!
                    <br/>There are {donationCount} donations around you!</h1>
                {/*redirect destination of this button needs to be filled later*/}
                <button className="button-home-tab"><a href="#">Click here to view -></a></button>
            </div>
        );
    }

}

export default NgoHome;