import qs from 'querystring'

export function getUrlParameter(sParam) {
    var sPageURL = window.location.search.substring(1),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? undefined : decodeURIComponent(sParameterName[1]);
        }
    }
};

export const getRequestUrl = () => {
    return "http://138.68.64.84/api/";
};
export const getHttpParams = (params) => {
    var httpParams = {
        method: 'POST',
        headers: {'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'},
        body: qs.stringify(params)
    }
    return httpParams;
};
export const declension = (count, one, two, five) => {
    var realCount = parseInt(count);
  
    if (realCount > 100)
    realCount %= 100;
  
    if (realCount > 20)
    realCount %= 10;
  
    switch (realCount) {
        case 1:
            return one;
        case 2:
        case 3:
        case 4:
            return two;
        default:
            return five;
    }
  }