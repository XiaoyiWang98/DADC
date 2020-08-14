import React, { useState, Component } from 'react';
import { Affix, Button } from 'antd';
import { List, Avatar, Card } from 'antd';

import MapItem from "./MapItem";

class MapItemList extends Component{
    constructor(props){
        super(props)
        this.state = {
            container: null
        };
    }

    render(){
        // const [container, setContainer] = useState(null);
        console.log(this.props.items)

        return (
            <div className="scrollable-container" ref={this.setState()}>
                <div className="background">
                    {/*<Affix target={() => this.state.container}>*/}
                    {/*    <Button type="primary">Fixed at the top of container</Button>*/}
                    {/*</Affix>*/}
                    <List
                        itemLayout="horizontal"
                        dataSource={this.props.items}
                        renderItem={item => (
                            <MapItem name ={item.name} address={item.address} />
                        )
                        }
                        />

                </div>
            </div>

        );
    }

}

export default MapItemList


