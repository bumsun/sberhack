import React from 'react';

class Loader extends React.Component {
    constructor(props){
        super(props)

    }
    
    render(){
            return (
                <div className="lds-ring loader-earn-container">
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                            <p className="loader_text">{this.props.text}</p>
                </div>
            );         
    }
}
export default Loader;
