import React from 'react';
import './tooltips.css'
import star_filter from '../../icons/star_filter.svg'
import check_blue from '../../icons/check_blue.svg'
class FilterRating extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            pickedIndex : this.props.ratingPicked
        }
    }
    componentDidUpdate(prevProps){
        if (prevProps != this.props){
            this.setState({pickedIndex : this.props.ratingPicked})
        }
    }
    onFilterPicked = (filter, index) => {
        if (filter != this.state.pickedIndex){
            this.setState({pickedIndex : filter})
            this.props.onFilterPicked(filter, index)
        } else {
            this.setState({pickedIndex : -1})
            this.props.onFilterPicked(-1, index)
        }
        
        
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
                        {this.props.filters && this.props.filters.map((filter, index) => (
                            <div onClick={() => this.onFilterPicked(filter, index)} style={this.state.pickedIndex == filter ? {background : 'rgba(227, 240, 255, 0.5)', color : "#113946"} : {color : "#113946"}} className="tag" index={index} key={index}>
                                <div className="flex">
                                    <p style={{color : "#113946"}} className="filter_rate_text">{filter}</p>
                                    <img src={star_filter}/>
                                </div>
                                <img style={this.state.pickedIndex == filter ? {display : 'block'} : {display : 'none'}} src={check_blue}/>
                            </div>
                            // <div onClick={() => this.onFilterPicked(filter, index)} className="filter_item" filter={filter} key={index}>
                            //     <p style={{color : "#113946"}} className="filter_rate_text">{filter}</p>
                            //     <img src={star_filter}/>
                            // </div>   
                        ))}
                        
                    </div>
             
            ); 
        
        
    }
}
export default FilterRating;
