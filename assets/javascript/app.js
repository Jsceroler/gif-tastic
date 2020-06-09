
 var placeholderArr = ["Jotaro Kujo","Giorno Giovanna","Dio Brando","Joseph Joestar","Josuke Higashikata","Rohan Kishibe"];
 var apikey = "&api_key=mCaqIcGqKH89FGa9jI822NQeEEueOqWy&limit=10";
 var query = "https://api.giphy.com/v1/gifs/search?q=";

 function populateButtonArea(){
    $("#buttons").empty();
    for(var i = 0; i<placeholderArr.length;i++){
        var button = $("<button>");
        button.addClass("btn btn-info");
        button.attr("data-name", placeholderArr[i]);
        button.text(placeholderArr[i]);
        $("#buttons").append(button);
    }
 }

 function displayGify()
 {
     $("#jojo").empty();
     var search = $(this).attr("data-name");
     var refine = search.replace(/\s/g,'+');
     var queryTotal= query + refine + apikey;
        console.log(queryTotal);
     $.ajax({
         url:queryTotal,
         method:"GET"
     }).then(function(response){
         console.log(response);
        for(var i=0;i<response.data.length;i++){

            var searchDiv = $("<div class='col'>");
            var imageTotal = $("<img>");
            var imgURL = response.data[i].images.fixed_height_still.url;
            var rating = response.data[i].rating;
            var gify = response.data[i].images.fixed_height.url;

            imageTotal.attr("src",imgURL);
            imageTotal.attr("data-state","still");
            imageTotal.attr("data-still",imgURL);
            imageTotal.attr("data-animate",gify);
            imageTotal.addClass("gify-image");

            searchDiv.append(imageTotal);
            $("#jojo").append(searchDiv);
        }
     });
 }

$("#add-char").on("click", function(event){
    console.log(event);
    event.preventDefault;
    var addInput= $("#user-input").val().trim();
    placeholderArr.push(addInput);
    populateButtonArea();
    $("#user-input").val("");
});
$(document).on("click", ".btn", displayGify);
 populateButtonArea();


 $(document).on("click", ".gify-image", function() {

    var state = $(this).attr("data-state");
 
    if (state === "still") {
      $(this).attr("src", $(this).attr("data-animate"));
      $(this).attr("data-state", "animate");
    } else {
      $(this).attr("src", $(this).attr("data-still"));
      $(this).attr("data-state", "still");
    }
  });