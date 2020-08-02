import React from 'react';
import analitika from './icons/analitika.png'
class Analitycs extends React.Component {
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
export default Analitycs;