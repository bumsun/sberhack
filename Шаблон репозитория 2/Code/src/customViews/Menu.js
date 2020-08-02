import React from 'react';
import logo from '../icons/logo.svg'
import message from '../icons/message.svg'
import trending_up from '../icons/trending_up.svg'
import settings from '../icons/settings.svg'
import bookmark from '../icons/bookmark.svg'
import message_green from '../icons/message_green.svg'
import trending_up_green from '../icons/trending_up_green.svg'
import settings_green from '../icons/settings_green.svg'
import bookmark_green from '../icons/bookmark_green.svg'
import MenuItem from '../list_items/MenuItem';
class Menu extends React.Component {
    constructor(props){
        super(props)
       
    }
    openTest = () => {
        document.location.href = '/test'
    }
    render() {
        return (
            <div className="aside__wrapper">
                <img className="logo" src={logo}/>
                <MenuItem page={"/reviews"} iconActive={message_green} icon={message} title="Отзывы"/>
                <MenuItem page={"/bookmark"} iconActive={bookmark_green} icon={bookmark} title="Избранное"/>
                <MenuItem page={"/analytics"} iconActive={trending_up_green} icon={trending_up} title="Аналитика"/>
                <MenuItem page={"/settings"} iconActive={settings_green} icon={settings} title="Настройки"/>
                <div onClick={this.openTest} className="text_btn hover">Протестировать</div>
            </div>
        );
    }
}
export default Menu;