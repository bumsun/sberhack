import React from 'react';
import KeywordsInput from './KeywordsInput';

class Keywords extends React.Component {
    constructor(props){
        super(props)
       
    }
   
    render() {
        return (
            <div style={(this.props.isShow && this.props.currentItem != {}) ? {opacity : 1, pointerEvents : 'all'} : {}} className="new_tag_container">
                <div className="m_right_32">
                    <p className="keywords_title">Ключевые слова</p>
                    {this.props.currentItem.words != undefined && <KeywordsInput wordsChanged={this.props.wordsChanged} words={this.props.currentItem.words.includes("|") ? this.props.currentItem.words.split("|") : [this.props.currentItem.words]} placeholder="Введите и нажмите Enter"/>}
                    <p className="tag_desription">По этим ключевым словам система поймёт, что отзыв относится именно к этому тегу. Чтобы тег присвоился данному отзыву, обязательно введи ключевое слово для него.</p>
                </div>
                <div>
                    <p className="keywords_title">Исключения</p>
                    {this.props.currentItem.words_not != undefined && <KeywordsInput wordsChanged={this.props.wordsNotChanged} words={this.props.currentItem.words_not.includes("|") ? this.props.currentItem.words_not.split("|") : this.props.currentItem.words_not != "" ? [this.props.currentItem.words_not] : []} placeholder="Введите и нажмите Enter"/>}
                    <p className="tag_desription">Если нужно задать правило, по которому система будет отличать “хорошо” от “нехорошо”, нужно задать исключения в данном поле.</p>
                </div>
                
            </div>
        );
    }
}
export default Keywords;