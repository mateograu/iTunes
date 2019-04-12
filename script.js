$(document).ready(function(){
    var submit = $("#submit");

    var button = getQueryParameter("button");
    if(button === "click"){
        document.getElementById("options").value = getQueryParameter("limit");
        document.getElementById("artist").value = getQueryParameter("term");
        inital();
    }

    submit.click(function(){
        inital();
    });

});


function processResults(data){

    $("#container").empty();

    var container = $("#container");
    var table = '<table class="w3-table w3-striped w3-bordered w3-large" id="table">';

    if(data.resultCount === 0){
        container.append("Sorry, no results were obtained :(");
    }

    var lim = parseInt($("#results").val());
    for(var i = 0; i < lim; i++){
        var href = "detail.html?term=";
        href += data.results[i].artistName + "&song=" + i + "&limit=" + lim;
        console.log(href);


        var image = data.results[i].artworkUrl100;
        var audio = data.results[i].previewUrl;

        table += '<tr id="' + i + '">';
        table += '<td><img src=' + '"' + image + '"' + '></td>';

        table += "<td><div>Rank:" + (i+1) + "</div><div>" + data.results[i].trackName + "</div><div>" +
            data.results[i].artistName + "</div><div>" + data.results[i].collectionName + '</div>' +
            '<a target="_blank" href="' + href + '">•••</a></td>';

        table += '<td><audio controls class="audio"> <source src="' + audio + '"></audio></td>';
    }


    table += '</tr></table>';
    container.append(table);
}

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



function inital(){
    var art = $("#artist");
    if(art.val() ===""){
        var searchTerm = getQueryParameter("term");
    }else{
        searchTerm = art.val();
    }
    $.ajax({
        url: "https://itunes.apple.com/search?term=" + searchTerm,
        type: 'GET',
        crossDomain: true,
        dataType: 'jsonp',
        success: function (result) {
            processResults(result);
            console.log(result);
        },
        error: function () {
            alert('Error!');
        }
    });
}
