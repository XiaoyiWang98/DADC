import React, {Component} from 'react';
import { Checkbox, Button } from 'antd';

class MapItem extends Component {
    constructor(props){
        super(props)
        this.state = {
            checked: false,
            disabled: false,
        };
        const a = this.props.address
        this.addressString = [a.city, a.state, a.zip].join(', ')

    }

    componentDidMount() {
        if(typeof this.props.outMarkFunction !== 'function'){
            // this.props.markFunction(this.props.itemId, true)
            this.setState({checked: true, disabled:true})
        }
    }

    onChange = e => {
        // console.log('checked = ', e.target.checked);
        console.log(this.props.outMarkFunction)
        this.setState({
            checked: e.target.checked,
        });
        this.props.markFunction(this.props.itemId, e.target.checked)
        this.props.outMarkFunction(this.props.itemId, e.target.checked)

    };

    render(){
        return(
            <div className="mapItem">
                <div className="mapItemImage"></div>
                <div className='mapItemDetail'>
                    <div className="mapItemName">{this.props.name}</div>
                    <div className="mapItemAddress">
                        {this.props.address.address}
                        <br/>
                        {this.addressString}
                    </div>
                </div>
                <div className='mapItemCheckbox'>
                    <Checkbox
                        checked={this.state.checked}
                        disabled={this.state.disabled}
                        onChange={this.onChange}
                    />
                </div>
            </div>
        )
    }

}
export default MapItem