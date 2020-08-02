import React from 'react';

import star from '../icons/star.svg'
import thumbs_up from '../icons/thumbs_up.svg'
import android from '../icons/android.svg'
import more from '../icons/more.svg'
import check from '../icons/check.svg'
import add from '../icons/add.svg'
import CategoryItem from './CategoryItem';
import { getStatusIcon, getListCategories } from '../utils/ReviewHelper';
import { getReviewDate } from '../utils/DateHelper';
class ReviewItem extends React.Component {
    constructor(props){
        super(props)
        this.removeCategory = this.removeCategory.bind(this);
    }
    removeCategory(id){
        this.props.removeCategory(id, this.props.index)
    }
    render() {
        const listCategories = getListCategories(this.props.review, this.props.categories)
        return (
            <div className="review_item element">
                <div className="just_content">
                    <div className="flex">
                        <img src={getStatusIcon(this.props.review, listCategories)}/>
                        <div className="reviewer_info">
                            <p className="reviewer_name">{this.props.review.userName}</p>
                            <div style={this.props.isHideInfo != undefined ? {display : 'none'} : {}} className="flex">
                                <p className="reviewer_name">{this.props.review.score}</p>
                                <img className="star_icon" src={star}/>

                                <p className="reviewer_name">{this.props.review.thumbsUpCount}</p>
                                <img className="star_icon" src={thumbs_up}/>

                                <p className="light_gray date">{getReviewDate(this.props.review.at)}</p>
                                <img className="star_icon" src={android}/>
                            </div>
                        </div>
                    </div>
                    <div className="flex">
                        {/* <div>
                            <img className="checked_icon" src={check}/>
                            <p className="light_gray">решен</p>
                        </div> */}
                        <img className="more_icon hover" src={more}/>
                    </div>
                </div>
                <p className="review_text">{this.props.review.content}</p>
                <div className="categories_container">
                    {listCategories.map((item, index) => (
                        <CategoryItem removeCategory={this.removeCategory} category={item} index={index} key={index}/>
                    ))}
                    {/* <CategoryItem hasIcon={false} title="Претензия"/>
                    <CategoryItem hasIcon={true} title="Претензия"/>
                    <CategoryItem hasIcon={false} title="Похвала"/>
                    <CategoryItem hasIcon={true} title="Карта в телефоне"/>
                    <CategoryItem hasIcon={true} title="Карта в телефоне"/>
                    <CategoryItem hasIcon={true} title="Карта в телефоне"/>
                    <CategoryItem hasIcon={true} title="Карта в телефоне"/> */}
                    <img onClick={this.props.toogleAddTags} className="icon_add hover" src={add}/>

                </div>
            </div>
        );
    }
}
export default ReviewItem;