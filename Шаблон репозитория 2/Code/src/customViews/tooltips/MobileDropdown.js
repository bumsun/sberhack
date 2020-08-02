import React from 'react';
import './tooltips.css'
import check_blue from '../../icons/check_blue.svg'
class MobileDropdown extends React.Component {
    constructor(props){
        super(props)
       
    }
   
    onCloseFilters = () => {
        console.log("onClose")
        if (this.props.onCloseFilters){
            this.props.onCloseFilters()
        }
        
    }
    
    render(){
      
            return (
            
                    <div style={this.props.style} className="filter_dropdown">
                        <div onClick={this.onCloseFilters} className="tooltip_bg"></div>
                        <div style={{color : "#113946"}} className="tag">
                            На данный момент мы грузим последние отзывы только с Google Play
                        </div>
                        
                    </div>
             
            ); 
        
        
    }
}
export default MobileDropdown;
