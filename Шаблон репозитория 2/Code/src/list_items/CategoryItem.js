import React from 'react';
import users from '../icons/users.svg'
import x from '../icons/x.svg'
class CategoryItem extends React.Component {
    constructor(props){
        super(props)
        this.remove = this.remove.bind(this);
    }
    remove(){
        this.props.removeCategory(this.props.category._id)
    }
    render() {
        return (
            <div className="category_cont category_gray">
                <img style={this.props.category.type == 1 ? {} : {display : 'none'}} src={users}/>
                <p style={this.props.category.type == 1 ? {} : {marginLeft : '0px'}} className="category_title">{this.props.category.tag_name}</p>
                <img onClick={this.remove} className="hover" src={x}/>
            </div>
        );
    }
}
export default CategoryItem;