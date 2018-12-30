$(document).ready(function(){

    //Word Guess Game Logic
const wordGuessGame = {
    //Array of words to choose from
    words: ["camera","lens","shutter","canon","nikon","panasonic","aperature","aspect_ratio","bokeh","film","focal length","flash","exposure","manual","metering","noise","raw","negative","print","portrait","red_eye","zoom","telephoto","full_frame","stabilizer"],
    // Random Number generated and assigned to pick a word from the word array
    generateWord: function() {
        return this.words[Math.floor(Math.random() * this.words.length -1)];
    },    
    guesses: [],
    playButton: $("#play"),
}

// Declare variables
let word;
var maskWord;
var answer = $("#answer");
var losses = 0;
var wins = 0;
var guessCount;
var lossSound = $("#lossSound")[0];
var winSound = $("#winSound")[0];

//Game start logic
wordGuessGame.playButton.on('click', function() {
   answer.text("");
   $("#guesses").text("");
   $("#guessesLeft").text("");
   maskWord = [];
    word = wordGuessGame.generateWord();
    for (i = 0; i < word.length; i++) {
            if (word[i] === "_") {
            maskWord[i] = "_";
            } else if (word[i] != "_") {
            maskWord[i] = "-";
            }
            };
            document.getElementById("answer").textContent = maskWord.join('');
            answer.text(maskWord.join(" "));
    wordGuessGame.playButton.hide(800);
    wordGuessGame.guesses = [];
    $("#guess-box").show();
    $("#winner").hide();
    $("#loser").hide();
    guessCount = word.length + 3;
    $("#guessesLeft").text(guessCount);
    $("#stats-win").show();
    $("#stats-lose").show();
});
//Game End logic
var gameEnd = () => {
    if (wordGuessGame.guesses.length === word.length + 3) {
        $("#loser").show(800);
        $("#play").show();
        losses++;
        $("#losses").text(losses);
        lossSound.play();
        $("#word").html("&nbsp;" + word);
        }
    if (maskWord.join('') == word) {
        $("#winner").show(800);
        $("#play").show();
        wins++;
        $("#wins").text(wins);
        winSound.play();
        $("stats").hide();
    }
    };
    document.onkeypress = function(event) {
        return false;
    };
// Keystroke and guess recognition
document.onkeypress = function(event) {
        var keyGuess = event.key;
            console.log(keyGuess);
            if (word.indexOf(keyGuess) === -1 && wordGuessGame.guesses.includes(keyGuess) == false) {
                console.log(word.indexOf(keyGuess));
                wordGuessGame.guesses.push(keyGuess);
                $("#guesses").append(" " + keyGuess + " ");
                guessCount -= 1;
            } else {
                for (i=0; i<word.length; i++) {
                    if (word[i] == keyGuess) {
                        maskWord[i] = keyGuess;
                        answer.text(maskWord.join(' '));

                    }
                }
            };
        gameEnd();

        $("#guessesLeft").text(guessCount);
};

});

