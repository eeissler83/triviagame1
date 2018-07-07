// all game action takes place in the panel 
var panel = $("#gamearea");

// trivia questions. array of 10 questions with array of 4 possible answers each
var questions = [{
    question: "How many countries are in the EU, excluding the UK?",
    answers: ["28", "30", "27", "29"],
    correctAnswer: "27",
    image: "assets/images/eu.jpg",
}, {
    question: "Who founded modern Turkey?",
    answers: ["Recep Tayyip Erdogan", "Mustafa Kemal Ataturk", "Ali Babacan", "Cem Karaca"],
    correctAnswer: "Mustafa Kemal Ataturk",
    image: "assets/images/ataturk.jpg",
}, {
    question: "Which is smallest nation in Europe?",
    answers: ["Malta", "Liechtenstein", "Monaco", "Vatican City"],
    correctAnswer: "Vatican City",
    image: "assets/images/vatican-city.jpg"
}, {
    question: "Which is the largest city in Europe by population?",
    answers: ["Moscow", "Istanbul", "Paris", "London"],
    correctAnswer: "Istanbul",
    image: "assets/images/Istanbul.jpg"
}, {
    question: "Arnold Schwarzenegger was born in which country?",
    answers: ["Germany", "Luxemborg", "Austria", "Norway"],
    correctAnswer: "Austria",
    image: "assets/images/Austria.jpg"
}, {
    question: "Which country has the longest history of wine making?",
    answers: ["Italy", "France", "Spain", "Georgia"],
    correctAnswer: "Georgia",
    image: "assets/images/georgia.jpg"
}, {
    question: "How many seas does Turkey have?",
    answers: ["1", "2", "3", "4"],
    correctAnswer: "3",
    image: "assets/images/turkey-map.gif"
}, {
    question: "Archduke Franz Ferdinan was assassinated in 1914 in the Austrian-Hungarian Empire, starting World War I. Which modern day country was he assassinated in?",
    answers: ["Austria", "Bosnia", "Hungary", "Italy"],
    correctAnswer: "Bosnia",
    image: "assets/images/bosnia.jpg"
}, {
    question: "In which city did Oktoberfest originate?",
    answers: ["Berlin", "Munich", "Holzelfingen", "Stuttgart"],
    correctAnswer: "Munich",
    image: "assets/images/munich.jpg"
}, {
    question: "Which country is known located wholly in Asia but considered by its inhabitants to be European?",
    answers: ["Israel", "Azerbaijan", "Lebanon", "Jordan"],
    correctAnswer: "Azerbaijan",
    image: "assets/images/baku.jpg"
}];

//variables
var score;
var timer;
var seconds = 20;


// game function. thought it was better to put game into one flow.
var game = {

    questions: questions,
    currentQuestion: 0,
    correct: 0,
    incorrect: 0,
    seconds: 20,
    timer: seconds,
    theCounter: setInterval,

    countdown: function() {
        game.timer--;
        $('#timer').html(game.timer);
        if (game.timer == 0) {
            console.log('TIME UP');
            game.timeUp();
        }
    },


    resetTimer: function() {

      clearInterval(game.theCounter);
      $('#timer').html(" ");

    },

    loadQuestion: function() { 


      $('#timer').html(game.seconds);

      game.timer = game.seconds;
      game.theCounter = setInterval(game.countdown, 1000);
      $('#image').html('<img src="' + questions[this.currentQuestion].image +'" height="64px" width="64px">');
      panel.html('<h2>' + questions[this.currentQuestion].question + '</h2>');
      for (var i = 0; i < questions[this.currentQuestion].answers.length; i++) {
        
        panel.append('<button class="answer-button" id="button" data-name="' + questions[this.currentQuestion].answers[i] + '"> ' + questions[this.currentQuestion].answers[i] +' </button>');
      }
    },


    firstQuestion: function() {
        //timer = setInterval(game.countdown, 1000);
        game.loadQuestion();
    },

    nextQuestion: function() {
        
        game.currentQuestion++;
        game.loadQuestion();
    },

    timeUp: function() {

        game.resetTimer();
        

        panel.html('<h2>Time is up!</h2>');
        panel.append('<h3>The correct answer is: ' + questions[this.currentQuestion].correctAnswer);
        panel.append('<img src="' + questions[this.currentQuestion].image + '" />');

        if (game.currentQuestion === questions.length - 1) {
            setTimeout(game.results, 3 * 1000);
        } else {
            setTimeout(game.nextQuestion, 3 * 1000);
        }
    },
    results: function() {
        //clearInterval(timer);

        panel.html('<h2>Your final score!</h2>');
        $('#timer').html(game.timer);
        panel.append('<h3>Correct Answers: ' + game.correct + '</h3>');
        panel.append('<h3>Incorrect Answers: ' + game.incorrect + '</h3>');
        panel.append('<h3>Unanswered: ' + (questions.length - (game.incorrect + game.correct)) + '</h3>');
        panel.append('<br><button id="start-over">Start Over?</button>');
    },
    clicked: function(e) {
        //clearInterval(timer);
        console.log($(e.target).data("name"));
        //clearInterval(game.theCounter);
        game.resetTimer();
        if ($(e.target).data("name") == questions[this.currentQuestion].correctAnswer) {
            this.answeredCorrectly();
        } else {
            this.answeredIncorrectly();
        }
    },
    answeredIncorrectly: function() {
      game.resetTimer();
        game.incorrect++;
        //clearInterval(timer);
        panel.html('<h2>Incorrect!</h2>');
        panel.append('<h3>The Correct Answer was: ' + questions[game.currentQuestion].correctAnswer + '</h3>');
        panel.append('<img src="' + questions[game.currentQuestion].image + '" />');

        if (game.currentQuestion === questions.length - 1) {
            setTimeout(game.results, 3 * 1000);
        } else {
            setTimeout(game.nextQuestion, 3 * 1000);
        }
    },
    answeredCorrectly: function() {
        //clearInterval(timer);
        game.resetTimer();
        game.correct++;
        panel.html('<h2>Correct!</h2>');
        panel.append('<img src="' + questions[game.currentQuestion].image + '" />');

        if (game.currentQuestion === questions.length - 1) {
            setTimeout(game.results, 3 * 1000);
        } else {
            setTimeout(game.nextQuestion, 3 * 1000);
        }
    },
    reset: function() {
        this.currentQuestion = 0;
        this.counter = countStartNumber;
        this.correct = 0;
        this.incorrect = 0;
        this.loadQuestion();
        game.loadQuestion();
    }
};

// click events
$(document).ready(function() {

    console.log("asa");
    $(document).on('click', '#restart', function(e) {
        game.reset();
    });

    $(document).on('click', '.answer-button', function(e) {
        game.clicked(e);
    });

    $(document).on('click', '#start', function(e) {
        console.log('start game');
        $('#gamearea').prepend('<h2>Time Remaining: <span id="counter-number">20</span> Seconds</h2>');
        game.firstQuestion();
    });

});