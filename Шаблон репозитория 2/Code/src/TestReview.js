import React from 'react';
import sber_logo from './icons/sber_logo.svg'
import happy from './icons/happy.svg'
import { getRequestUrl, getHttpParams } from './utils/Utils';
import ReviewItem from './list_items/ReviewItem';
import AddTag from './customViews/tooltips/AddTag';
import Loader from './customViews/Loader';
class TestReview extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            finished : false,
            isLoading : false,
            reviews : [],
            reviewText : "",
            isShowAddTags : false,
            categories : []
        }
        this.textChanged = this.textChanged.bind(this);
        this.removeCategory = this.removeCategory.bind(this);
        this.infoCategoryChanged = this.infoCategoryChanged.bind(this);
        this.toogleAddTags = this.toogleAddTags.bind(this);

    }
    componentDidMount(){
        this.getConfigReviews()
    }
    send = () => {
        this.getReviews()
    }
    textChanged(event) {
        if (event){
            var text = event.target.value
            this.setState({reviewText : text})
           
        }
    }
    getConfigReviews = () => {
        fetch(getRequestUrl() + "getConfigReviews", getHttpParams({})).then((response) => response.json())
        .then((responseData) => {
            this.setState({categories : responseData})
            console.log("getConfigReviews = " + JSON.stringify(responseData))
        })
    }
    getReviews = () => {
        this.setState({isLoading : true})
        var params = {}
        params.review = this.state.reviewText
        console.log("getReviews params = " + JSON.stringify(params))
        fetch(getRequestUrl() + "getReviewsForSber", getHttpParams(params)).then((response) => response.json())
        .then((responseData) => {
            console.log("getReviewsForSber = " + JSON.stringify(responseData))
            this.setState({reviews : responseData.out, isLoading : false, finished : true})
        })
    }
    openReview = () => {
        document.location.href = '/reviews'
    }
    toogleAddTags(){
        this.setState({isShowAddTags : !this.state.isShowAddTags})
    }
    removeCategory(id, index){
        var reviews = this.state.reviews
        reviews[index][id] = 0
        this.setState({reviews : reviews})
 
    }
    infoCategoryChanged(){
        this.setState({isLoading : true, categories : [], reviews : []})
        this.getConfigReviews()
        this.getReviews()
    }
    render() {
        return (
            <div className="test_container">
               {(!this.state.finished && !this.state.isLoading) && <div className="center_container">
                    <img className="center_icon_sber" src={sber_logo}/>
                    <p className="sber_online">Сбербанк Онлайн</p>
                    <textarea onChange={this.textChanged} className="text_area" placeholder="Напишите ваш отзыв о приложении Сбербанк Онлайн" value={this.state.reviewText}/>
                    <div onClick={this.send} className="write_review_btn hover">Отправить</div>
                </div>}

                {this.state.isLoading ? <Loader text="Отзыв обрабатывается"/> : this.state.finished && <div className="center_container">
                    <p className="sber_online">Ваш отзыв обработан</p>
                    {this.state.reviews.length > 0 && this.state.reviews.map((item, index) => (
                        <ReviewItem isHideInfo={true} toogleAddTags={this.toogleAddTags} removeCategory={this.removeCategory} categories={this.state.categories} review={item} index={index} key={index}/>
                    ))}                    
                    <div onClick={this.openReview} className="write_review_btn hover">Открыть ленту отзывов</div>
                    <img className="happy_icon" src={happy}/>
                </div>}
                
                {this.state.isShowAddTags && <AddTag infoCategoryChanged={this.infoCategoryChanged} toogleAddTags={this.toogleAddTags} categories={this.state.categories}/>}
            </div>
        );
    }
}
export default TestReview;