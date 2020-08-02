import React from 'react';
import './tooltips.css'
import check_blue from '../../icons/check_blue.svg'
class FilterDropdown extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            pickedCategories : this.props.categoriesPicked
        }
        this.selectCategory = this.selectCategory.bind(this);
    }
    componentDidUpdate(prevProps){
        if (prevProps != this.props){
            this.setState({pickedCategories : this.props.categoriesPicked})
        }
    }
    onFilterPicked = (filter, index) => {
        this.props.onFilterPicked(filter, index)
    }
    onCloseFilters = () => {
        console.log("onClose")
        if (this.props.onCloseFilters){
            this.props.onCloseFilters()
        }
        
    }
    selectCategory(index, item){
        var selectedTags = this.state.pickedCategories
        if (selectedTags.includes(item)){
            const index2 = selectedTags.indexOf(item);
            selectedTags.splice(index2, 1);
        } else {
            selectedTags.push(item)
        }
        this.setState({pickedCategories : selectedTags})
        this.props.onFilterPicked(selectedTags)
        console.log("index = " + index)
    }
    render(){
      
            return (
            
                    <div style={this.props.style} className="filter_dropdown">
                        <div onClick={this.onCloseFilters} className="tooltip_bg"></div>
                        {this.props.filters && this.props.filters.map((item, index) => (
                            <div onClick={() => this.selectCategory(index, item)} style={this.state.pickedCategories.includes(item) ? {background : 'rgba(227, 240, 255, 0.5)', color : "#113946"} : {color : "#113946"}} className="tag" index={index} key={index}>
                                {item.tag_name}
                                <img style={this.state.pickedCategories.includes(item) ? {display : 'block'} : {display : 'none'}} src={check_blue}/>
                            </div>
                        ))}
                        
                    </div>
             
            ); 
        
        
    }
}
export default FilterDropdown;
