
export const filterByText = (reviews, text) => {
    var fullReviews = reviews
        var result = fullReviews.filter(function(review) {
            return review.content.toLowerCase().includes(text.toLowerCase());
        });
   return result
}

export const filterByParams = (reviews, rating, categories, teams) => {
    var fullReviews = reviews
    
        var result = fullReviews.filter(function(review) {
            var isRatingOk = (rating == -1 ? true : review.score == rating)
            var isCategoryOk = compareCategory(categories, review)
            var isTeamOk = compareCategory(teams, review)
            return isRatingOk && isCategoryOk && isTeamOk
        });
   return result
}
export const compareCategory = (categories, review) => {
    var result = false
    if (categories.length == 0){
        return true
    }
    categories.forEach(element => {
       if (review[element._id] == 1){
           result = true
       }
   });
   return result
}
