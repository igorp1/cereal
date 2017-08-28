///////////////////////
//
// HelpMe
// a little collection of helper methods for devs
//
///////////////////////


export module HelpMe {

  /// returns the value of the query param from the url
  export function getQueryParamByName(name : string, url : string = undefined) : string {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"), results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
  }

  /// more... 
   // [ ]



}
