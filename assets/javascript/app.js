// all game action takes place in the panel 
var panel = $("#gamearea");


// trivia questions. array of 10 questions with array of 4 possible answers each
var questions = [{
    question: "How many countries are in the EU, excluding the UK?",
    answers: ["28", "30", "27", "29"],
    correctAnswer: "27",
    image: ""
}, {
    question: "Who founded modern Turkey?",
    answers: ["Recep Tayyip Erdogan", "Mustafa Kemal Ataturk", "Ali Babacan", "Cem Karaca"],
    correctAnswer: "Mustafa Kemal Ataturk",
    image: ""
}, {
    question: "Which is smallest nation in Europe is?",
    answers: ["Malta", "Liechtenstein", "Monaco", "Vatican City"],
    correctAnswer: "Vatican City",
    image: ""
}, {
    question: "Which is the largest city in Europe by population?",
    answers: ["Moscow", "Istanbul", "Paris", "London"],
    correctAnswer: "Istanbul",
    image: ""
}, {
    question: "Arnold Schwarzenegger was born in which country?",
    answers: ["Germany", "Luxemborg", "Austria", "Norway"],
    correctAnswer: "Austria",
    image: ""
}, {
    question: "Which country has the longest history of wine making?",
    answers: ["Italy", "France", "Spain", "Georgia"],
    correctAnswer: "Georgia",
    image: ""
}, {
    question: "How many seas does Turkey have?",
    answers: ["1", "2", "3", "4"],
    correctAnswer: "3",
    image: ""
}, {
    question: "Archduke Franz Ferdinan was assassinated in 1914 in the Austrian-Hungarian Empire, starting World War I. Which modern day country was he assassinated in?",
    answers: ["Austria", "Bosnia", "Hungary", "Italy"],
    correctAnswer: "Bosnia",
    image: ""
}, {
    question: "In which city did Oktoberfest originate?",
    answers: ["Berlin", "Munich", "Holzelfingen", "Stuttgart"],
    correctAnswer: "Munich",
    image: ""
}, {
    question: "Which country is known located wholly in Asia but considered by its inhabitants to be European?",
    answers: ["Israel", "Azerbaijan", "Lebanon", "Jordan"],
    correctAnswer: "Azerbaijan",
    image: ""
}, {
}];
    //variables
    var score;
    var timer;

 




    //game function. thought it was better to put game into one flow.

var game = {
    questions:questions,
    currentQuestion:0,
    timer:startcounter,
    correct:0,
    incorrect:0,
    countdown: function(){
      game.counter--;
      $('timer').html(game.timer);
  
      if (game.timer === 0){
        console.log('TIME UP');
        game.timeUp();
      }
    },

},
firstQuestion: function(){
  timer = setInterval(game.countdown, 1000);
  panel.html('<h2>' + questions[this.currentQuestion].question + '</h2>' );
  for (var i = 0; i<questions[this.currentQuestion].answers.length; i++){
    panel.append('<button class="answer-button" id="button"' + 'data-name="' + questions[this.currentQuestion].answers[i] + '">' + questions[this.currentQuestion].answers[i]+ '</button>');
  }
},
nextQuestion: function(){
  game.counter = startCounter;
  $('#counter-number').html(game.counter);
  game.currentQuestion++;
  game.loadQuestion();
},
timeUp: function (){
  clearInterval(timer);
  $('#counter-number').html(game.counter);

  panel.html('<h2>Time is up!</h2>');
  panel.append('<h3>The correct answer is: ' + questions[this.currentQuestion].correctAnswer);
  panel.append('<img src="' + questions[this.currentQuestion].image + '" />');

  if (game.currentQuestion === questions.length - 1){
    setTimeout(game.results, 3 * 1000);
  } else {
    setTimeout(game.nextQuestion, 3 * 1000);
  }
},
results: function() {
  clearInterval(timer);

  panel.html('<h2>Your final score!</h2>');
  $('#counter-number').html(game.counter);
  panel.append('<h3>Correct Answers: ' + game.correct + '</h3>');
  panel.append('<h3>Incorrect Answers: ' + game.incorrect + '</h3>');
  panel.append('<h3>Unanswered: ' + (questions.length - (game.incorrect + game.correct)) + '</h3>');
  panel.append('<br><button id="start-over">Start Over?</button>');
},
clicked: function(e) {
  clearInterval(timer);

  if ($(e.target).data("name") === questions[this.currentQuestion].correctAnswer){
    this.answeredCorrectly();
  } else {
    this.answeredIncorrectly();
  }
},
answeredIncorrectly: function() {
  game.incorrect++;
  clearInterval(timer);
  panel.html('<h2>Incorrect!</h2>');
  panel.append('<h3>The Correct Answer was: ' + questions[game.currentQuestion].correctAnswer + '</h3>');
  panel.append('<img src="' + questions[game.currentQuestion].image + '" />');

  if (game.currentQuestion === questions.length - 1){
    setTimeout(game.results, 3 * 1000);
  } else {
    setTimeout(game.nextQuestion, 3 * 1000);
  }
},
answeredCorrectly: function(){
  clearInterval(timer);
  game.correct++;
  panel.html('<h2>Correct!</h2>');
  panel.append('<img src="' + questions[game.currentQuestion].image + '" />');

  if (game.currentQuestion === questions.length - 1){
    setTimeout(game.results, 3 * 1000);
  } else {
    setTimeout(game.nextQuestion, 3 * 1000);
  }
},
reset: function(){
  this.currentQuestion = 0;
  this.counter = countStartNumber;
  this.correct = 0;
  this.incorrect = 0;
  this.loadQuestion();
}
};

// click events
$(document).on('click', '#restart', function(e) {
    game.reset();
  });
  
  $(document).on('click', '.answer-button', function(e) {
    game.clicked(e);
  });
  
  $(document).on('click', '#start', function(e) {
    $('#quizarea').prepend('<h2>Time Remaining: <span id="counter-number">30</span> Seconds</h2>');
    game.firstQuestion();
  });