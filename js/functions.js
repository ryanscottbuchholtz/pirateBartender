var jackSparrow = new Bartender();
var currentQuestion = jackSparrow.getNextQuestion();

var checkResponse = function() {
  $("#yes-button").click( function() {
    questionAsked(true);
  });

  $('#no-button').click( function() {
    questionAsked(false);
  }); 
}

var questionAsked = function(userAccepted) {
   clearBartenderFeedback();
    if(userAccepted) {
      bartenderFeedback(currentQuestion.yesBartenderResponse);
      jackSparrow.addIngredient(currentQuestion.ingredientCategory);
    } else {
      bartenderFeedback(currentQuestion.noBartenderResponse);
    };
    
    if(jackSparrow.questionPosition === jackSparrow.questions.length) { //if bartender can make drink (true/false)
      clearQuestion();
      makeDrinkAnimation();
      answerFadeOut('#answer', 2000);
      displayDrink();
      jackSparrow.restockPantry();
    } else {
      currentQuestion = jackSparrow.getNextQuestion();
      nextQuestion();
    };
}

var askQuestion = function() {
  var html = $('#question-template').html()
                                    .replace(/{{question}}/, currentQuestion.theQuestion)
                                    .replace(/{{yesButton}}/, currentQuestion.yes)
                                    .replace(/{{noButton}}/, currentQuestion.no);
  $('.drink-question').append(html);
}

var clearQuestion = function() {
  $('#question').remove();
  $('#yes-button').remove();
  $('#no-button').remove();
}

var bartenderFeedback = function (bartenderFeedback) {
  var html = $('#answer-template').html()
                                  .replace(/{{answer}}/, bartenderFeedback);                              
    $('.the-answer-output').hide().html(html).fadeIn(1000);
}

var clearBartenderFeedback = function() {
  $('#answer').remove();
}

var nextQuestion = function() {
  clearQuestion();
  askQuestion();
  checkResponse();
}

var answerFadeOut = function(element, speed) {
  $(element).fadeOut(speed);
}

var makeDrinkAnimation = function() {
    $('.drink-being-made').fadeIn(1000).delay(2500).fadeOut(1000);
    $('#question-template').hide();
}

var displayDrink = function() {
  var drink = jackSparrow.makeDrink();;
  var html = $('#drink-template').html()
                                  .replace(/{{drink}}/, drink );
    $('.drink-output').hide(); //to hide element before adding the drink
    $('#drink').html(html);
    $('.drink-output').delay(3000).fadeIn(1000);
    $('.drink-output-background').delay(3000).fadeIn(1000);
}

var noDrink = function() {
  $('.no-drink-being-made').fadeIn(1000);
  $('#question-template').hide();
}

var hideStackedElements = function() {
  $('.drink-being-made').hide();
  $('.no-drink-being-made').hide();
  $('.thirsty-yet').hide();
  $('.the-drink').hide();
  $('.drink-output').hide();
  $('.drink-output-background').hide();
}

var orderAnother = function() {
  $('#order-another-button').click( function() {
    jackSparrow.questionPosition = 0;
    currentQuestion = jackSparrow.getNextQuestion();
    hideStackedElements();
    askQuestion();
    checkResponse();
  });
}