var games = ["Banjo Kazooie", "Hollow Knight", "Dark Souls", "Ori and the Blind Forest","Hotline Miami",
 "Bloodborne", "Fortnite", "Overwatch","Terraria","Rivals of Aether", "Celeste", "Super Smash Brothers"];

 //take the topics in this array and create buttons in the html
    //use a loop that appends a button for each string in the array.
function displayGameInfo(){
    var game = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + game + "&api_key=B34kYXJCO20us5T1qXWZUjReG35MEWKA&limit=10";
    console.log("test");
    $("#games-view").empty();
    
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        

        var results = response.data;

    
        console.log(response)
        

        for (var i = 0; i < results.length; i++) {
        
            var gameDiv = $("<div class ='game'>");

            var pRate = $("<p>").text("Rating: " + results[i].rating);

            // Creating and storing an image tag
            var gameImage = $("<img>");
            // Setting the src attribute of the image to a property pulled off the result item
            gameImage.attr("src", results[i].images.fixed_height_still.url);
            //as a still image
            gameImage.attr("data-still", results[i].images.fixed_height_still.url);
            gameImage.attr("data-animate", results[i].images.fixed_height.url);
            gameImage.attr("data-state", "still");
            gameImage.attr("class","gif");


        

            gameDiv.append(pRate);
            
            gameDiv.append(gameImage);
            

            //Putting the game before the previous ones
            $("#games-view").prepend(gameDiv);
        }
        //on click, change the state of the gif
        $(".gif").on("click", function() {
            var state = $(this).attr("data-state");
            console.log(this);
            if (state === "still") {
                $(this).attr("src", $(this).attr("data-animate"));
                $(this).attr("data-state", "animate");
              } else {
                $(this).attr("src", $(this).attr("data-still"));
                $(this).attr("data-state", "still");
              }
        });
    });

//making the state of the gifs
    //var state = $(this).attr("data-state");

}
//function for displaying game data
function renderButtons(){

    //Deleting games prior to adding new games
    $("#buttons-view").empty();

    for (var i = 0; i < games.length; i++){
        var a = $("<button>");
        a.addClass("game-btn");
        a.attr("data-name",games[i]);
        a.text(games[i]);

        $("#buttons-view").append(a);
    }
}

//handles events where add a game button is clicked(not working)
$("#add-game").on("click", function(event) {
    console.log(this);
    event.preventDefault();
    var game = $("#game-input").val().trim();
    

    //adding games to games array
    games.push(game);

    renderButtons();
    
});

//adding a click event listener
$(document).on("click", ".game-btn", displayGameInfo);



//calling the button function that displays the initial buttons
renderButtons();



