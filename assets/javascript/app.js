var games = ["Banjo Kazooie", "Hollow Knight", "Dark Souls", "Ori and the Blind Forest","Hotline Miami",
 "Bloodborne", "Fortnite", "Overwatch","Terraria","Rivals of Aether", "Celeste", "Super Smash Brothers"];

 //take the topics in this array and create buttons in the html
    //use a loop that appends a button for each string in the array.
function displayGameInfo(){
    var game = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + game + "&api_key=B34kYXJCO20us5T1qXWZUjReG35MEWKA&limit=10";
    
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        

        var results = response.data;

    
        //when i console.log response, it doesn't directly give me the data
        console.log(response)

        for (var i = 0; i < results.length; i++) {
        
            var gameDiv = $("<div class ='game'>");

            var pRate = $("<p>").text("Rating: " + results[i].rating);

            // Creating and storing an image tag
            var gameImage = $("<img>");
            // Setting the src attribute of the image to a property pulled off the result item
            gameImage.attr("src", results[i].images.fixed_height.url);
            //as a still image
            gameImage.attr("src", results[i].images.fixed_height_still.url);

            gameDiv.append(pRate);
            
            gameDiv.append(gameImage);
            

            //Putting the game before the previous ones
            $("#games-view").prepend(gameDiv);
        }
    });

//making the state of the gifs
    //var state = $(this).attr("data-state");

}
//function for displaying game data
function renderButtons(){

    //Deleting games prior to adding new movies
    $("#buttons-view").empty();

    for (var i = 0; i < games.length; i++){
        var a = $("<button>");
        a.addClass("game-btn");
        a.attr("data-name",games[i]);
        a.text(games[i]);

        $("#buttons-view").append(a);
    }
}

//handles events where a game button is clicked
$("add-game").on("click", function(event) {
    event.preventDefault();
    var game = $("game-input").val().trim();

    //adding games to games array
    games.push(game);

    renderButtons();
});

//adding a click event listener
$(document).on("click", ".game-btn", displayGameInfo);

//calling the button function that displays the initial buttons
renderButtons();

//next step: make them pause when loading a page until I click on them