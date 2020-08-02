import React from 'react';
import close from '../../icons/close.svg'
import arrow_dropdown from '../../icons/arrow_dropdown.svg'
import plus from '../../icons/plus.svg'
import check_blue from '../../icons/check_blue.svg'
import man from '../../icons/man.svg'
import './tooltips.css'
import Keywords from '../Keywords';
import NewKeywords from '../NewKeywords';
import { getRequestUrl, getHttpParams } from '../../utils/Utils';
var disabledStyle = {pointerEvents : 'none', opacity : 0}
var disabledBtnStyle = {pointerEvents : 'none', opacity : 0.5}
class AddTag extends React.Component {
    constructor(props){
        super(props)
        var teams = []
        var categories = []
        this.props.categories.forEach(element => {
            if (element.type == 1){
                teams.push(element)
            } else {
                categories.push(element)
            }
        });
        this.state = {
            isCategory : true,
            isShowTags : false,
            categories : categories,
            teams : teams,
            current : categories,
            currentIndex : -1,
            isNewTag : false,
            pickedTag : "Выберите тег",
            currentItem : {},
            newName : ""
        }
        this.newWords = []
        this.newWordsNot = []
        this.oldWords = []
        this.oldWordsNot = []
        
        this.pickCategory = this.pickCategory.bind(this);
        this.pickTeam = this.pickTeam.bind(this);
        this.toogleTags = this.toogleTags.bind(this);
        this.selectTag = this.selectTag.bind(this);
        this.newTagClicked = this.newTagClicked.bind(this);
        this.wordsChanged = this.wordsChanged.bind(this);
        this.wordsChangedNew = this.wordsChangedNew.bind(this);
        this.wordsNotChanged = this.wordsNotChanged.bind(this);
        this.wordsNotChangedNew = this.wordsNotChangedNew.bind(this);
        this.nameChanged = this.nameChanged.bind(this);
        this.addTagClicked = this.addTagClicked.bind(this);
    }
    newTagClicked(){
        this.setState({isNewTag : true, pickedTag : (this.state.isCategory ? "Новый тег" : "Новый отдел"), isShowTags : false})
    }
    componentDidUpdate(prevProps){
        if (prevProps != this.props){
            var teams = []
            var categories = []
            this.props.categories.forEach(element => {
                if (element.type == 1){
                    teams.push(element)
                } else {
                    categories.push(element)
                }
            });
            this.setState({categories : categories, teams : teams, current : categories})
        }
    }
    onFilterPicked = (filter, index) => {
        this.props.onFilterPicked(filter, index)
    }
    onClose = () => {
        console.log("onClose")
        if (this.props.onClose){
            this.props.onClose()
        }
        
    }
    pickCategory(){
        this.setState({isCategory : true, current : this.state.categories, currentIndex : -1, isNewTag : false, pickedTag : "Выберите тег", isShowTags : false})
        
    }
    pickTeam(){
        this.setState({isCategory : false, current : this.state.teams, currentIndex : -1, isNewTag : false, pickedTag : "Выберите отдел", isShowTags : false})
    }
    toogleTags(){
        this.setState({isShowTags : !this.state.isShowTags, isNewTag : false})
    }
    nameChanged(newName){
        this.setState({newName : newName})
        console.log("nameChanged = " + newName)
    }
    selectTag(index, tag){
        this.setState({currentIndex : index, pickedTag : tag.tag_name, currentItem : tag})
        this.toogleTags()
    }
    wordsChangedNew(words){
        this.newWords = words
        console.log("wordsChanged = " + words)
    }
    wordsNotChangedNew(words){
        this.newWordsNot = words
        console.log("wordsNotChanged = " + words)
    }
    wordsChanged(words){
        this.oldWords = words
        console.log("oldwordsChanged = " + words)
    }
    wordsNotChanged(words){
        this.oldWordsNot = words
        console.log("oldwordsNotChanged = " + words)
    }
    addTagClicked(){
        var name = ""
        var words = []
        var wordsNot = []
        var type = (this.state.isCategory ? 0 : 1)
        if (this.state.isNewTag){
            name = this.state.newName
            words = this.newWords
            wordsNot = this.newWordsNot
        } else {
            name = this.state.currentItem.tag_name
            words = this.oldWords
            wordsNot = this.oldWordsNot
        }
        if(words.length > 0){
            words = words.join("|")
        } else {
            words = ""
        }
        if(wordsNot.length > 0){
            wordsNot = wordsNot.join("|")
        } else {
            wordsNot = ""
        }
        
        var params = {}
        params.tag_name = name
        params.words = words
        params.words_not = wordsNot
        params.type = type
        console.log("params setConfigReviews = " + JSON.stringify(params))
        fetch(getRequestUrl() + "setConfigReviews", getHttpParams(params)).then((response) => response.json())
        .then((responseData) => {
            console.log("setConfigReviews = " + JSON.stringify(responseData))
            this.props.toogleAddTags()
            this.props.infoCategoryChanged()
        })
    }
    
    render(){
      
            return (
                    <div className="add_tag_bg">
                        <div className="add_tag_cointainer">
                            <img onClick={this.props.toogleAddTags} className="close_add_tag hover" src={close}/>
                            <p className="add_tag_title">{this.state.isCategory ? "Добавить тег к отзыву" : "Добавить отдел к отзыву"}</p>
                            <div className="flex">
                                <div onClick={this.pickCategory} className={this.state.isCategory ? "team_picker left_team active_team hover" : "team_picker left_team hover"}>Категория</div>
                                <div onClick={this.pickTeam} className={!this.state.isCategory ? "team_picker right_team active_team hover" : "team_picker right_team hover"}>Отдел</div>
                            </div>
                            <div className="old_tag_container">
                                <div className="flex">
                                    <div onClick={this.toogleTags} className={this.state.isShowTags ? "tag_picker_container tag_picker_active" : "tag_picker_container"}>
                                        <p className="tag_picker_title">{this.state.pickedTag}</p>
                                        <img className={this.state.isShowTags ? "arrow_tags arrow_tags_active" : "arrow_tags"} src={arrow_dropdown}/>
                                    </div>
                                    <div style={this.state.isNewTag ? disabledStyle : this.state.isShowTags ? {pointerEvents : 'auto', opacity : 1} : {}} className="tags_list">
                                        <div onClick={this.newTagClicked} className="add_tag_item">
                                            <img src={plus}/>
                                            <p className="add_tag_item_text">{this.state.isCategory ? "Новый тег" : "Новый отдел"}</p>
                                        </div>
                                        {this.state.current.length > 0 && this.state.current.map((item, index) => (
                                                <div onClick={() => this.selectTag(index, item)} style={this.state.currentIndex == index ? {background : 'rgba(227, 240, 255, 0.5)'} : {}} className="tag" index={index} key={index}>
                                                    {item.tag_name}
                                                    <img style={this.state.currentIndex == index ? {display : 'block'} : {display : 'none'}} src={check_blue}/>
                                                </div>
                                        ))}
                                    
                                    </div>
                                </div>
                                <img style={(this.state.isShowTags || this.state.isNewTag || (!this.state.isNewTag && this.state.currentIndex != -1)) ? {opacity : 0} : {}} className="man_img" src={man}/>
                            </div>
                           <Keywords wordsChanged={this.wordsChanged} wordsNotChanged={this.wordsNotChanged} currentItem={this.state.currentItem} isShow={!this.state.isNewTag && !this.state.isShowTags && this.state.currentIndex != -1}/>
                           
                           <NewKeywords isCategory={this.state.isCategory} nameChanged={this.nameChanged} wordsChanged={this.wordsChangedNew} wordsNotChanged={this.wordsNotChangedNew} isShow={this.state.isNewTag}/>

                            <div className="add_tags_btns">
                                <p onClick={this.addTagClicked} style={(this.state.pickedTag == "Выберите тег" || this.state.pickedTag == "Выберите отдел")? disabledBtnStyle : ((this.state.pickedTag == "Новый тег" || this.state.pickedTag == "Новый отдел") ? (this.state.newName != "" ? {} : disabledBtnStyle) : {})} className="add_tag_btn hover">Добавить</p>
                                <p onClick={this.props.toogleAddTags} className="add_tag_cancel hover">Отмена</p>
                            </div>
                            
                        </div>
               
                    </div>
                    
            ); 
        
        
    }
}
export default AddTag;
