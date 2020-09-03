import React, {Component} from 'react';
import {API_ROOT, AUTH_HEADER} from '../../constants';
import {Link} from "react-router-dom";
import {Spin} from "antd";

class DonorHome extends Component {
    state = {
        lastName: this.props.info.lastName,
        firstName: this.props.info.firstName,
        isLoadingItems: false,
        token:this.props.info.token,
        error: '',
        donorItems: []
    }

    componentDidMount() {
        this.setState({ isLoadingItems: true, error: '' });
 
        fetch(`${API_ROOT}/donor/my_item`, {
            method: 'GET',
            headers: {
                Authorization: `${AUTH_HEADER} ${this.state.token}`
            }
        })
            .then((response) => {
                if (response.status === 200) {
                    return response.json();
                }
                throw new Error('Failed to load donorItems');
            })
            .then((data) => {
                console.log(data);
                // handle the case when data is {"result": "FAILED"}
                if (data.length === undefined) {
                    throw new Error('Failed to load donorItems');
                } else {
                    this.setState({donorItems: data ? data : [], isLoadingItems: false});
                    this.props.collectMyItem(data);
                }
            })
            .catch((e) => {
                console.error(e);
                this.setState({isLoadingItems: false, error: e.message});
            })

    }


    render() {
        const donorItems = this.state.donorItems;
        const loading = this.state.isLoadingItems;
        const pendingItems = donorItems.filter(item => item.status === 1);
        const pendingItemCount = pendingItems.length;
     
        return (
            <div className="main-content content-home">
            {loading
                ?
            <Spin className="spin" tip="Loading..."/>
            :
            <div>
            {pendingItemCount===0?
            <div>
            <div className="home-name">Welcome, {this.state.firstName}!</div>
               <div className="home-status no-donation"> 
               <div className="home-status-content">You don't have any items </div>
               <div className="home-status-content">have been scheduled.</div>
               </div>
               
            <Link className="link jumper" to="/donors/donate">Make a new donations today!</Link>
        </div>
        :
        <div>
            <div className="home-name">Welcome, {this.state.firstName}!</div>
            <div className="home-status">
            <div className="home-status-content">You have<div className="home-number">{pendingItemCount}</div></div>
            {pendingItemCount===1?
            <div className="home-status-content">item has been scheduled!</div>
            :
            <div className="home-status-content">items have been scheduled!</div>
    }
            </div>
            <Link className="link jumper" to="/donors/completed_pickup">Check them out!</Link>
            </div>
        }
        </div>
    }
    </div>
            
            
            
        )
    }
}

export default DonorHome;