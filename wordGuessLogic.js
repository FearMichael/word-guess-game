$(document).ready(function(){

    //Word Guess Game Logic
const wordGuessGame = {
    //Array of words to choose from
    getWords: async function() {
        await $.get("https://api.datamuse.com/words?topics=photography", function(data) {
        data.forEach(elem => {
            return wordGuessGame.words.push(elem.word)
        });
        wordGuessGame.playButton.attr("disabled", false);
    })},
    words: [],
    // words: ["camera","lens","shutter","canon","nikon","panasonic","aperature","aspect ratio","bokeh","film","focal length","flash","exposure","manual","metering","noise","raw","negative","print","portrait","red_eye","zoom","telephoto","full frame","stabilizer"],
    getDefinition: function (word) {
        console.log(encodeURIComponent(word));
        $.get(`https://googledictionaryapi.eu-gb.mybluemix.net/?define=${encodeURIComponent(word)}`).then(data => {
            console.log(data);
            let wordDefinition;
            let word;
            if (data[0].meaning.noun) {
                wordDefinition = data[0].meaning.noun[0].definition
            } else {
                wordDefinition = "No Definition Found"
            }
            if (data[0].word) {
                word = data[0].word
            } else {
                word = "Word Not Found"
            }
            wordGuessGame.definitionWord.text(word);
            wordGuessGame.definition.text(wordDefinition);
            wordGuessGame.definitionArea.show(300);
        })
    },
    // Random Number generated and assigned to pick a word from the word array
    generateWord: function() {
        let genWord = this.words[Math.floor(Math.random() * this.words.length -1)]
        this.selectedWord = genWord;
        return genWord;
    },
    selectedWord: "",    
    guesses: [],
    playButton: $("#play"),
    definitionArea: $(".definitionArea"),
    definitionWord: $(".definitionWord"),
    definition: $(".definitionFull"),
}
//Fetch Words
wordGuessGame.getWords();

// Declare variables
let word;
var maskWord;
var answer = $("#answer");
var losses = 0;
var wins = 0;
var guessCount;
var lossSound = $("#lossSound")[0];
var winSound = $("#winSound")[0];


// NOTES
// - Should stop monitoring keystrokes once game has ended 
// - Words sometimes repeated often - add a way to remove played words or pull in a larger list from another source?


//Game start logic

wordGuessGame.playButton.on('click', function() {
   answer.text("");
   $("#guesses").text("");
   $("#guessesLeft").text("");
   wordGuessGame.definitionArea.hide(800);
   maskWord = [];
    word = wordGuessGame.generateWord();
    console.log(word)
    for (i = 0; i < word.length; i++) {
            if (word[i] === " ") {
            maskWord[i] = " ";
            } else if (word[i] != " ") {
            maskWord[i] = "-";
            }
            };
            document.getElementById("answer").textContent = maskWord.join('');
            answer.text(maskWord.join(""));
    wordGuessGame.playButton.hide(800);
    wordGuessGame.guesses = [];
    $("#guess-box").show();
    $("#winner").hide();
    $("#loser").hide();
    guessCount = 7;
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
        wordGuessGame.getDefinition(wordGuessGame.selectedWord);
        }
    if (maskWord.join('') == word) {
        $("#winner").show(800);
        $("#play").show();
        wins++;
        $("#wins").text(wins);
        winSound.play();
        $("stats").hide();
        wordGuessGame.getDefinition(wordGuessGame.selectedWord);
    }
    };
    document.onkeypress = function(event) {
        return false;
    };

// Keystroke and guess recognition
document.onkeypress = function(event) {
        var keyGuess = event.key;
        if (event.which > 96 && event.which < 123) {
            if (word.indexOf(keyGuess) === -1 && wordGuessGame.guesses.includes(keyGuess) == false) {
                wordGuessGame.guesses.push(keyGuess);
                $("#guesses").append(" " + keyGuess + " ");
                guessCount -= 1;
            } else {
                for (i=0; i<word.length; i++) {
                    if (word[i] == keyGuess) {
                        maskWord[i] = keyGuess;
                        answer.text(maskWord.join(''));
                    }
                }
            };
        gameEnd();

        $("#guessesLeft").text(guessCount);
    } else if (event.which > 64 && event.which < 91) {
        event
    }
};

});