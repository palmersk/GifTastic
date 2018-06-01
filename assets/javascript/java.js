
var controller = {

    topicButtonClick: () => {
        $("body").on("click", ".topic-button", function () {
            var emotion = $(this).text();
            var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
                emotion + "&api_key=cp2YE3vqeMKUmaukPsqx72MrfGtu6uxp&limit=12";

            $.ajax({
                url: queryURL,
                method: "GET"
            }).done(function (response) {

                $('.gif-display').empty();

                // declare JSON output into a results variable
                var results = response.data;

                // console log the results
                console.log(results)

                // loop through results to parse out what we want to display from the api
                for (var i = 0; i < results.length; i++) {


                    var gifDiv = $('<div>');
                    gifDiv.addClass('col-4 gif-div');

                    var rated = $('<p>');
                    rated.addClass('rating');

                    // get the rating of each gif to display
                    rated.text("rated: " + results[i].rating);

                    // jQuery variable to for gifImages to go into
                    var gifImage = $('<img>')

                    gifImage.attr("src", results[i].images.fixed_height_still.url);
                    gifImage.attr("gif-still", results[i].images.fixed_height_still.url);
                    gifImage.attr("gif-animate", results[i].images.fixed_height.url);
                    gifImage.attr("gif-state", "still")
                    gifImage.addClass('image-gif');

                    gifDiv.prepend(rated);

                    gifDiv.prepend(gifImage);

                    $('.gif-display').append(gifDiv);

                }

            })

        });
    },

    addTopicToArray: () => {
        $("body").on("click", ".add-button", function () {
            // prevent form from submitting
            event.preventDefault();

            var newTopic = $('#new-topic').val().trim();
            console.log(newTopic);
            topics.push(newTopic);
            $('#new-topic').val("");
            view.displayButtons();
        });

    },

    playGifs: () => {
        $("body").on("click", ".image-gif", function () {

            var state = $(this).attr("gif-state");
            // If the clicked image's state is still, update its src attribute to what its gif-animate value is.
            // Then, set the image's state to animate
            // Else set src to the still value
            if (state === "still") {
                $(this).attr("src", $(this).attr("gif-animate"));
                $(this).attr("gif-state", "animate");
            } else {
                $(this).attr("src", $(this).attr("gif-still"));
                $(this).attr("gif-state", "still");
            }

        });
    },

};

// Array of Emotion Gifs found on Giphy
var topics = ["eye roll", "no", "kiss", "happy", "wink", "excited", "frustrated", "sarcastic", "smile", "crying", "interested", "love", "lol", "dancing", "reaction", "judging you", "sleepy", "agree", "bored", "shocked", "yes", "stressed", "surprised", "serious", "tired", "unimpressed", "mind blown", "mic drop"];

var buttonColors = [
    { color: "btn-primary" },
    { color: "btn-success" },
    { color: "btn-danger" },
    { color: "btn-info" }
];

// for the project that will manipulate our webpage

$(document).ready(function () {

    view.displayButtons();
    controller.topicButtonClick();
    controller.playGifs();
    controller.addTopicToArray();

});

// view Object

var view = {

    displayButtons: () => {

        $('.button-display').empty()

        for (var i = 0; i < topics.length; i++) {
            var topicButtons = $('<button>').addClass('topic-button btn').text(topics[i]);
            topicButtonColor = buttonColors[Math.floor(Math.random() * buttonColors.length)];
            topicButtons.addClass(topicButtonColor.color);
            $('.button-display').append(topicButtons);
        }

    },

};