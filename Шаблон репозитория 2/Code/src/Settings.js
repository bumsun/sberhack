import React from 'react';
import analitika from './icons/img_settings.png'
class Settings extends React.Component {
    constructor(props){
        super(props)
      
    }
  
    render() {
        return (
            <div className="test_container">
                <img style={{width : '100%'}} src={analitika}/>
            </div>
        );
    }
}
export default Settings;