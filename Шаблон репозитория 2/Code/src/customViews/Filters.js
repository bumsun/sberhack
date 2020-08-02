import React from 'react';
import chevron_right from '../icons/chevron_right.svg'
import android_filter from '../icons/android_filter.svg'
import ios_filter from '../icons/ios_filter.svg'
import FilterDropdown from './tooltips/FilterDropdown';
import { TransitionGroup } from 'react-transition-group';
import FilterRating from './tooltips/FilterRating';
import { getCategories, getTeams } from '../utils/ReviewHelper';
import MobileDropdown from './tooltips/MobileDropdown';
var filtersRating = [5, 4, 3, 2, 1]
class Filters extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            isShowReviews : false,
            isShowCategory : false,
            isShowTeam : false,
            isShowRating : false,
            isShowMobile : false,

            ratingPicked : -1,
            categoriesPicked : [],
            teamsPicked : [],
        }
        this.toogleReviews = this.toogleReviews.bind(this)
        this.toogleCategory = this.toogleCategory.bind(this)
        this.toogleTeam = this.toogleTeam.bind(this)
        this.toogleRating = this.toogleRating.bind(this)
        this.ratingPicked = this.ratingPicked.bind(this)
        this.categoryPicked = this.categoryPicked.bind(this)
        this.teamPicked = this.teamPicked.bind(this)
        this.toogleMobile = this.toogleMobile.bind(this)
    }
    toogleReviews(){
        this.setState({isShowReviews : !this.state.isShowReviews})
    }
    toogleCategory(){
        this.setState({isShowCategory : !this.state.isShowCategory})
    }
    toogleTeam(){
        this.setState({isShowTeam : !this.state.isShowTeam})
    }
    toogleRating(){
        this.setState({isShowRating : !this.state.isShowRating})
    }
    ratingPicked(rating){
        this.setState({ratingPicked : rating})
        this.props.ratingPicked(rating)
    }
    categoryPicked(items){
        this.setState({categoriesPicked : items})
        this.props.categoryPicked(items)
    }
    teamPicked(items){
        this.setState({teamsPicked : items})
        this.props.teamPicked(items)
    }
    toogleMobile(){
        this.setState({isShowMobile : !this.state.isShowMobile})
    }
    
    render() {
        return (
            <div className="right_filter">
                <p className="right_filter_title">Фильтры</p>
                <div className="line"/>
                <div className="relative">
                    {this.state.isShowMobile && <MobileDropdown onCloseFilters={this.toogleMobile}/>}

                    <div onClick={this.toogleMobile} className="mobile_filters">
                        <img className="hover m_right_8" src={android_filter}/>
                        <img className="hover m_left_8" src={ios_filter}/>
                    </div>
                </div>
                
                <div className="line"/>
                <div onClick={this.toogleRating} className="just_content filter_pad">
                    {this.state.isShowRating && <FilterRating ratingPicked={this.state.ratingPicked} onFilterPicked={this.ratingPicked} onCloseFilters={this.toogleRating} filters={filtersRating}/>}
                    <div>
                        <p className="team">Оценка</p>
                        <p className="light_gray">{this.state.ratingPicked == -1 ? "Все" : this.state.ratingPicked}</p>
                    </div>
                    <img src={chevron_right}/>
                   
                </div>
                <div className="line"/>
                <div className="relative">
                    {this.state.isShowCategory && <FilterDropdown categoriesPicked={this.state.categoriesPicked} onFilterPicked={this.categoryPicked} onCloseFilters={this.toogleCategory} filters={getCategories(this.props.categories)}/>}
                    <div onClick={this.toogleCategory} className="just_content filter_pad">
                        <div>
                            <p className="team">Категория</p>
                            <p className="light_gray">{this.state.categoriesPicked.length == 0 ? "Все" : "Выбрано " + this.state.categoriesPicked.length}</p>
                        </div>
                        <img src={chevron_right}/>
                    
                    </div>
                </div>
                
                <div className="line"/>
                <div className="relative">
                    {this.state.isShowTeam && <FilterDropdown categoriesPicked={this.state.teamsPicked} onFilterPicked={this.teamPicked} onCloseFilters={this.toogleTeam} filters={getTeams(this.props.categories)}/>}
                    <div onClick={this.toogleTeam} className="just_content filter_pad">
                        <div>
                            <p className="team">Отдел</p>
                            <p className="light_gray">{this.state.teamsPicked.length == 0 ? "Все" : "Выбрано " + this.state.teamsPicked.length}</p>
                        </div>
                        <img src={chevron_right}/>
                    
                    </div>
                </div>
                
                
            </div>
        );
    }
}
export default Filters;