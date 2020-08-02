import React from 'react';
import {DebounceInput} from 'react-debounce-input';
import avatar from '../icons/avatar.png'
import search from '../icons/search.svg'
import arrow_dropdown from '../icons/arrow_dropdown.svg'

class Toolbar extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            searchText : ""
        }
        this.searchTextChanged = this.searchTextChanged.bind(this)
    }
    searchTextChanged(event){
        if (event){
            var text = event.target.value
            this.setState({searchText: text})
            if (text != undefined && text != " "){
                this.props.searchTextChanged(text)
            }
            
        }
    }
    render() {
        return (
            <div className="search_container">
            <div className="search">
                <img src={search}/>
                <DebounceInput className="search_input" autoComplete="off" debounceTimeout={500}
                onChange={this.searchTextChanged} className="input_text_search" placeholder="Поиск по отзывам" value={this.state.searchText}/>
            </div>
            <div className="account hover">
                <div className="flex">
                    <img className="avatar" src={avatar}/>
                    <div>
                        <p className="acc_name">Владимир</p>
                        <p className="light_gray">Администратор</p>
                    </div>
                </div>
                <img src={arrow_dropdown}/>
            </div>
        </div>
        );
    }
}
export default Toolbar;