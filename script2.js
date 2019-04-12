$(document).ready(function(){
    var artist = getQueryParameter("term");

    $.ajax({
        url: "https://itunes.apple.com/search?term=" + artist,
        type: 'GET',
        crossDomain: true,
        dataType: 'jsonp',
        success: function (result) {
            display(result);
            console.log(result);
        },
        error: function (){
            alert('Error!');
        }
    });
});

function getQueryParameter(name) {
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i=0;i<vars.length;i++) {
        var pair = vars[i].split("=");
        if(pair[0] === name){
            return pair[1];
        }
    }
}

function display(data) {
    $("#container").empty();
    var contain = $("#container");
    var song = getQueryParameter("song");
    var date = new Date(data.results[song].releaseDate);
    var trackTime = mms(data.results[song].trackTimeMillis);
    var releaseDate = date.toLocaleDateString();
    var image = data.results[song].artworkUrl100;
    var audio = data.results[song].previewUrl;
    var explicit = "";

    if(data.results[song].trackExplicitness === "explicit"){
        explicit = "(explicit)";
    }else{
        explicit = "(clean)";
    }

    contain.append('<img src=' + '"' + image + '"' + '>');
    contain.append("<div>" + data.results[song].trackName + " " + explicit + "</div><div>" +
        data.results[song].artistName + "</div><div>" + data.results[song].collectionName + '</div>');
    contain.append('<audio controls class="audio"> <source src="' + audio + '"></audio>');
    contain.append('<div>Date Released: ' + releaseDate + '</div>');
    contain.append('<div>Duration: ' + trackTime + '</div>');
    contain.append('<div> Genre: ' + data.results[song].primaryGenreName + '</div>');
    contain.append('<div><a href="' + data.results[song].collectionViewUrl + '" target="_blank">Visit Apple Music Album Page</a></div>');


    var href = "index.html?term=";
    var artist = getQueryParameter("term");
    var limit = getQueryParameter("limit");
    href += artist + "&button=click" + "&limit=" + limit;

    contain.append('<div><a href="' + href +'">Last Page</a></div>');
}

function mms(millis) {
    var minutes = Math.floor(millis / 60000);
    var seconds = ((millis % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
}