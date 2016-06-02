var $ = require('jquery');

var Bartender = require('./bartender');

var jackSparrow = new Bartender();
var currentQuestion = jackSparrow.getNextQuestion();

module.exports = {

checkResponse: function() {
    $("#yes-button").click( function() {
      this.questionAsked(true);
    });

    $('#no-button').click( function() {
      this.questionAsked(false);
    }); 
  },

  questionAsked: function(userAccepted) {
     this.clearBartenderFeedback();
      if(userAccepted) {
        this.bartenderFeedback(currentQuestion.yesBartenderResponse);
        jackSparrow.addIngredient(currentQuestion.ingredientCategory);
      } else {
        this.bartenderFeedback(currentQuestion.noBartenderResponse);
      };
      
      if(jackSparrow.questionPosition === jackSparrow.questions.length) { //if bartender can make drink (true/false)
        this.clearQuestion();
        this.makeDrinkAnimation();
        this.answerFadeOut('#answer', 2000);
        this.displayDrink();
        // jackSparrow.restockPantry();
      } else {
        currentQuestion = jackSparrow.getNextQuestion();
        this.nextQuestion();
      };
  },

  askQuestion: function() {
    var html = $('#question-template').html()
                                      .replace(/{{question}}/, currentQuestion.theQuestion)
                                      .replace(/{{yesButton}}/, currentQuestion.yes)
                                      .replace(/{{noButton}}/, currentQuestion.no);
    $('.drink-question').append(html);
  },

  clearQuestion: function() {
    $('#question').remove();
    $('#yes-button').remove();
    $('#no-button').remove();
  },

  bartenderFeedback: function (bartenderFeedback) {
    var html = $('#answer-template').html()
                                    .replace(/{{answer}}/, bartenderFeedback);                              
      $('.the-answer-output').hide().html(html).fadeIn(1000);
  },

  clearBartenderFeedback: function() {
    $('#answer').remove();
  },

  nextQuestion: function() {
    this.clearQuestion();
    this.askQuestion();
    this.checkResponse();
  },

  answerFadeOut: function(element, speed) {
    $(element).fadeOut(speed);
  },

  makeDrinkAnimation: function() {
      $('.drink-being-made').fadeIn(1000).delay(2500).fadeOut(1000);
      $('#question-template').hide();
  },

  displayDrink: function() {
    var drink = jackSparrow.makeDrink();;
    var html = $('#drink-template').html()
                                    .replace(/{{drink}}/, drink );
      $('.drink-output').hide(); //to hide element before adding the drink
      $('#drink').html(html);
      $('.drink-output').delay(3000).fadeIn(1000);
      $('.drink-output-background').delay(3000).fadeIn(1000);
  },

  hideStackedElements: function() {
    $('.drink-being-made').hide();
    $('.no-drink-being-made').hide();
    $('.thirsty-yet').hide();
    $('.the-drink').hide();
    $('.drink-output').hide();
    $('.drink-output-background').hide();
  },

  orderAnother: function() {
    $('#order-another-button').click( function() {
      jackSparrow.questionPosition = 0;
      currentQuestion = jackSparrow.getNextQuestion();
      this.hideStackedElements();
      this.askQuestion();
      this.checkResponse();
    });
  },
}