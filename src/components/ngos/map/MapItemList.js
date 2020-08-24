import React, { Component } from 'react';
import { List} from 'antd';

import MapItem from "./MapItem";

class MapItemList extends Component{
    constructor(props){
        super(props)
        this.state = {
            container: null
        };
    }
    mouseEnterItem = (id) => {
        // console.log('mouse enter', id)
        this.props.hoverFunction(id, true)

    }
    mouseLeaveItem = (id) => {
        // console.log('mouse leave', e)
        this.props.hoverFunction(id, false)
    }

    render(){
        // const [container, setContainer] = useState(null);
        // console.log(this.props.items)
        //const outMarkFunction = this.props.outMarkFunction ? this.props.outMarkFunction : null

        return (
            <div className="scrollable-container">
                <div className="background">
                    {/*<Affix target={() => this.state.container}>*/}
                    {/*    <Button type="primary">Fixed at the top of container</Button>*/}
                    {/*</Affix>*/}
                    <List
                        itemLayout="horizontal"
                        dataSource={this.props.items}
                        renderItem={item => (
                            <div onMouseEnter={() => this.mouseEnterItem(item.itemId)}
                                 onMouseLeave={() => this.mouseLeaveItem(item.itemId)}>
                                <MapItem
                                    key={item.itemId}
                                    itemId = {item.itemId}
                                    name ={item.name}
                                    address={item.address}
                                    markFunction={this.props.markFunction}
                                    outMarkFunction={this.props.outMarkFunction}
                                />
                            </div>
                        )
                        }
                        />

                </div>
            </div>

        );
    }

}

export default MapItemList


