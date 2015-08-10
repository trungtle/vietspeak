UI.registerHelper('formatTime', function(context, options) {
  if(context)
    return moment(context).format('MM/DD/YYYY, hh:mm');
});


newBackground = function(path) {
    $("#container").css("background-image", 'url(' + path + ')');
    $("#container").css("background-repeat", 'no-repeat');
    $("#container").css("background-size", 'cover');
    $("#container").css("overflow", 'hidden');
    $("#container").css("background-position", 'center');
}
