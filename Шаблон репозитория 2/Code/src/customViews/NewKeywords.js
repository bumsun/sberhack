import React from 'react';
import KeywordsInput from './KeywordsInput';

class NewKeywords extends React.Component {
    constructor(props){
        super(props)
       this.state = {
           newName : ""
       }
       this.nameChanged = this.nameChanged.bind(this);
    }
    nameChanged = (event) => {
        if (event){
            var text = event.target.value
            this.setState({newName : text})
            this.props.nameChanged(text)
        }
    }
    
    render() {
        return (
            <div style={this.props.isShow ? {opacity : 1, pointerEvents : 'all'} : {}}  className="new_tag_cont">
                <p className="keywords_title">{this.props.isCategory ? "Название нового тега" : "Название нового отдела"}</p>
                <input placeholder="Введите название" onChange={this.nameChanged} className="input_new_tag" value={this.state.newName}/>
                <div className="flex">
                    <div className="m_right_32">
                        <p className="keywords_title">Ключевые слова</p>
                        <KeywordsInput wordsChanged={this.props.wordsChanged} words={[]} placeholder="Введите и нажмите Enter"/>
                        <p className="tag_desription">По этим ключевым словам система поймёт, что отзыв относится именно к этому тегу. Чтобы тег присвоился данному отзыву, обязательно введи ключевое слово для него.</p>

                    </div>
                    <div>
                        <p className="keywords_title">Исключения</p>
                        <KeywordsInput wordsChanged={this.props.wordsNotChanged} words={[]} placeholder="Введите и нажмите Enter"/>
                        <p className="tag_desription">Если нужно задать правило, по которому система будет отличать “хорошо” от “нехорошо”, нужно задать исключения в данном поле.</p>

                    </div>
                </div>
            </div>
            
        );
    }
}
export default NewKeywords;