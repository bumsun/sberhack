import status_bad from '../icons/status_bad.svg'
import status_critical from '../icons/status_critical.svg'
import status_neutral from '../icons/status_neutral.svg'
import positive from '../icons/positive.svg'

export const getStatusIcon = (review, listCategories) => {
    var img = ""
    listCategories.forEach(element => {
        if (element.tag_name == "критическое" || review.score == 1 || review.score == 2){
            img = status_critical
        } else if (element.tag_name == "баг" || element.tag_name == "ошибка UX" || element.tag_name == "претензия"){
            img = status_bad
        } else if (element.tag_name == "похвала" || element.tag_name == "решено"){
            img = positive
        }
        
    });
    if (img != ""){
        return img
    }
    switch(review.score){
        case 5:
            return positive
            break;
            case 4:
                return status_neutral
                break;
                case 3:
                    return status_bad
                    break;
                    case 2:
                        return status_critical
                        break;
                        case 1:
                            return status_critical
                            break;
        }
  
};
export const getListCategories = (review, categories) => {
    var result = []
    for (var key in review) {
        if (review.hasOwnProperty(key)) {
            if (isKeyId(key) && review[key] != 0){
                categories.forEach(element => {
                    if (element._id == key){
                        result.push(element)
                    }
                    return
                });    
            }
           
        }
    }
    return result
}
export const getCategories = (categories) => {
    var result = []
    categories.forEach(element => {
        if (element.type == 0){
            result.push(element)
        }
    });
   return result
}
export const getTeams = (categories) => {
    var result = []
    categories.forEach(element => {
        if (element.type == 1){
            result.push(element)
        }
    });
   return result
}
export const isKeyId = (key) => {
   if (key == "at" || key == "content" || key == "repliedAt" || key == "replyContent" || key == "reviewCreatedVersion" || key == "score" || key == "thumbsUpCount" || key == "userImage" || key == "userName"){
       return false
   } else {
       return true
   }
}
// export const translateKey = (key) => {
//     //  "bugs":1,
//     //   "crucials":0,
//     //   "bugs_ux":0,
//     //   "complaints":0,
//     //   "compliments":1,
//     //   "features":0,
//     //   "questions":1,
//     //   "vulnerabilities":1,
//     //   "solved":0,
//     //   "case_sberpay":0,
//     //   "case_dark_theme":0,
//     //   "case_qr":0
//     // switch(key){
//     //     case "bugs"
//     //     return ""

//     // }
// }