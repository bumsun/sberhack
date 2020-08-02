import React from 'react';
import {DebounceInput} from 'react-debounce-input';
import x from '../icons/x.svg'
class KeywordsInput extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            tags : this.props.words,
            tagText : ""
        }
        this.tagTextChanged = this.tagTextChanged.bind(this);
        if (this.props.words && this.props.words.length > 0){
            this.props.wordsChanged(this.props.words)
        }
        
    }
    componentDidUpdate(prevProps){
        if(prevProps != this.props && this.props.words.length > 0){
            this.setState({tags : this.props.words})
            this.props.wordsChanged(this.props.words)
        }
    }
    tagTextChanged = (event) => {
        if (event){
            var text = event.target.value
            this.setState({tagText : text})

        }
    }
    deleteTag = (index) => {
        var tags = this.state.tags
        tags.splice(index, 1);
        this.setState({tags : tags})
        this.props.wordsChanged(tags)
    }
    onFocusLost = () => {
        var event = {key : "Enter", target : {value : this.state.tagText}}
        this.addTags(event)
        console.log("onFocusLost")
    }
    addTags = event => {
        if (event && event.key === "Enter" && event.target.value !== "") {
            var tags = this.state.tags
            tags.push(event.target.value)
            this.setState({tags : tags, tagText : ""})
            console.log("addTags key = " + event.target.value)
            this.props.wordsChanged(tags)
            event.target.value = "";
            
        }
    };
    render() {
        return (
            <div className="keywords_input">
                <div className="flex_input">
                    {this.state.tags.map((item, index) => (
                        <div onClick={() => this.deleteTag(index)} className="tag_height hover" index={index} key={index}>
                            {item}
                            <img className="x_icon" src={x}/>
                        </div>
                    ))}
                    <DebounceInput onBlur={this.onFocusLost} autoComplete="off" onKeyUp={event => this.addTags(event)}
                    onChange={this.tagTextChanged} className="input_text_search" placeholder={this.props.placeholder} value={this.state.tagText}/>
                </div>
            </div>
        );
    }
}
export default KeywordsInput;