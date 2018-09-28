//API key ZzyQbkemkpMPEHpv78JzF5Hzv9iUX7W0
jQuery(document).ready(function(){
var reactions = ["Thumbs Up", "Popcorn", "Good Luck", "Eye Roll", "Animals", "Classics", "Congratulations", "Whatever", "Dancing", "Mindblown", "Flirting", "Excited", "Laughing", "Confused", "Love", "Yes", "Happy", "WTF", "High Five", "Nope", "Hello", "K", "Sad", "What", "Bye", "You're Welcome", "Facepalm", "Wow", "Applause", "Like", "No", "Angry", "Crying", "SMH", "Thank You", "Mad", "OMG", "Dislike", "Do Want", "Good job", "Hot", "Celebration", "OK", "Bored", "Smile", "Hug", "Dance", "Yay", "Why", "LOL", "Shrug", "Shame", "Shocked", "Disappointed", "Thanks", "Sorry", "Scared", "Waiting", "Hi", "Shake Head", "Tired", "Party"];

console.log(reactions);

function renderButtons() {
    $("#buttons_here").empty();

    for (var i=0; i<reactions.length; i++) {
        var button = $("<button class='btn btn-primary buttonSpace animated fadeInUp slower delay-5s'>");
        button.addClass("reaction").attr("data-name", reactions[i]).text(reactions[i]);
        $("#buttons_here").append(button);
    }
}

$("#add_reaction").on("click", function(event) {
    event.preventDefault();
    var newTopic = $("#reaction_input").val().trim();
    reactions.push(newTopic);
    console.log(reactions);
    $("#reaction_input").val('')
    renderButtons();
});

renderButtons();

function searchAndDisplayGIF() {
    var topicBtn = $(this).attr("data-name");
    console.log(topicBtn)

    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + topicBtn + "&api_key=ZzyQbkemkpMPEHpv78JzF5Hzv9iUX7W0&limit=10&rating=R";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        var results = response.data;
        console.log(results);

        for (var i = 0; i < results.length; i++) {
            var gifDiv = $("<div class='gifSpace animated flipInX slower delay-5s'>");
            var gifStill = results[i].images.fixed_height_still.url;
            var gifAnimate = results[i].images.fixed_height.url;
            var gifImage = $("<img>");
            var rating = "<div class='ratings text-center font-weight-bold'>Rated: " + results[i].rating + "</div>";

            gifImage.addClass("gif");
            gifImage.attr("src", gifStill);
            gifImage.attr("data-still", gifStill);
            gifImage.attr("data-animate", gifAnimate);
            gifImage.attr("data-state", "still");

            gifDiv.append(gifImage, rating);

            $("#reactions_view").prepend(gifDiv)
        
        }
    });
}

function animateGIF () {
    var state = $(this).attr("data-state");
    console.log(state)
    if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
    } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    }
}

$(document).on("click", ".reaction", searchAndDisplayGIF);
$(document).on("click", ".gif", animateGIF)

});