import React from 'react';
class MenuItem extends React.Component {
    constructor(props){
        super(props)
        this.isActive = document.location.pathname == this.props.page
        this.openPage = this.openPage.bind(this);
    }
    openPage(){
        document.location.href = this.props.page
    }
    render() {
        return (
            <div onClick={this.openPage} className={this.isActive ? "menu_item menu_item_picked" : "menu_item"}>
                <img className="menu_icon" src={this.isActive ? this.props.iconActive : this.props.icon}/>
                <p className={this.isActive ? "menu_title_active" : "menu_title"}>{this.props.title}</p>
            </div>
        );
    }
}
export default MenuItem;