import React, { useState, Component } from 'react';
import { Affix, Button } from 'antd';

class MapItemList extends Component{

    render() {
        const [container, setContainer] = useState(null);
        return(
            <div className="scrollable-container" ref={setContainer}>
                <div className="background">
                    <Affix target={() => container}>
                        <Button type="primary">Fixed at the top of container</Button>
                    </Affix>
                </div>
            </div>
            )
    }

}

export default MapItemList


