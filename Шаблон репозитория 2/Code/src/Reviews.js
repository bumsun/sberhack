import React from 'react';
import arrow_dropdown from './icons/arrow_dropdown.svg'
import ReviewItem from './list_items/ReviewItem';
import Filters from './customViews/Filters';
import { TransitionGroup } from 'react-transition-group';
import { getRequestUrl, getHttpParams } from './utils/Utils';
import Toolbar from './customViews/Toolbar';
import { filterByText, filterByParams } from './utils/FilterHelper';
import AddTag from './customViews/tooltips/AddTag';
import Loader from './customViews/Loader';
class Reviews extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            reviews : [],
            filteredReviews : [],
            categories : [],
            isLoading : true,
            isShowAddTags : false,   
        }
        this.ratingPickedFilter = -1 
        this.categoriesPickedFilter = []
        this.teamPickedFilter = []
        this.removeCategory = this.removeCategory.bind(this);
        this.toogleAddTags = this.toogleAddTags.bind(this);
        this.infoCategoryChanged = this.infoCategoryChanged.bind(this);
        this.ratingPicked = this.ratingPicked.bind(this);
        this.filter = this.filter.bind(this);
        this.categoryPicked = this.categoryPicked.bind(this);
        this.teamPicked = this.teamPicked.bind(this);
    }
    removeCategory(id, index){
        var reviews = this.state.filteredReviews
        reviews[index][id] = 0
        this.setState({filteredReviews : reviews})
        // var review = reviews[index]
        // for (var key in review) {
        //     if (review.hasOwnProperty(key)) {
        //         review.key
        //     }
        // }
    
        
    }
    componentDidMount(){
        this.getConfigReviews()
        this.getReviews()
    }
    getReviews = () => {
        fetch(getRequestUrl() + "getReviewsForSber", getHttpParams({})).then((response) => response.json())
        .then((responseData) => {
            this.setState({reviews : responseData.out, filteredReviews : responseData.out, isLoading : false})
            this.filter()
        })
    }
    getConfigReviews = () => {
        fetch(getRequestUrl() + "getConfigReviews", getHttpParams({})).then((response) => response.json())
        .then((responseData) => {
            this.setState({categories : responseData})
        })
    }
    searchTextChanged = (text) => {
        if (this.state.reviews.length > 0){
            this.setState({filteredReviews : filterByText(this.state.reviews, text)})
        }
    }
    toogleAddTags(){
        this.setState({isShowAddTags : !this.state.isShowAddTags})
    }
    infoCategoryChanged(){
        this.setState({isLoading : true, filteredReviews : [], categories : [], reviews : []})
        this.getConfigReviews()
        this.getReviews()
    }
    ratingPicked(rating){
        this.ratingPickedFilter = rating
        this.filter()
    }
    categoryPicked(categories){
        this.categoriesPickedFilter = categories
        this.filter()
    }
    teamPicked(teams){
        this.teamPickedFilter = teams
        this.filter()
    }
    filter(){
       this.setState({filteredReviews : filterByParams(this.state.reviews, this.ratingPickedFilter, this.categoriesPickedFilter, this.teamPickedFilter)})  
    }
    render(){
        // const items = this.state.reviews.map((item, index) => (
        //     <ReviewItem review={item} index={index} key={index}/>
        // ))
            return (
                <div className="reviews_page">
                    <Toolbar searchTextChanged={this.searchTextChanged}/>
                    <div className="reviews_flex">
                        <div className="reviews_list_container">
                            <div className="just_content full_width">
                                <p className="main_title">Отзывы</p>
                                <div className="filter_container just_content hover">
                                    <p className="filter_text">Сначала новые</p>
                                    <img src={arrow_dropdown}/>
                                </div>
                            </div>
                            {/* <TransitionGroup
                            transitionName="animation_list"
                            transitionAppear={true}
                            transitionAppearTimeout={3000}
                            transitionEnter={false}
                            transitionLeave={false}>
                            {items}
                            </TransitionGroup> */}
                            
                            {}
                            {this.state.isLoading ? <Loader text="Загружаем отзывы"/> : this.state.filteredReviews.length > 0 && this.state.filteredReviews.map((item, index) => (
                                <ReviewItem toogleAddTags={this.toogleAddTags} removeCategory={this.removeCategory} categories={this.state.categories} review={item} index={index} key={index}/>
                            ))}
                            
                                                     
                        </div>
                        <Filters teamPicked={this.teamPicked} categoryPicked={this.categoryPicked} categories={this.state.categories} ratingPicked={this.ratingPicked}/>
                    </div>
                    
                    {this.state.isShowAddTags && <AddTag infoCategoryChanged={this.infoCategoryChanged} toogleAddTags={this.toogleAddTags} categories={this.state.categories}/>}
                    {/* <AddTag toogleAddTags={this.toogleAddTags} categories={this.state.categories}/> */}
                </div>
            ); 
        
        
    }
}
export default Reviews;