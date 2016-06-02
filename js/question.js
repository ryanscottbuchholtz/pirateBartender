

var Question = function (theQuestion, ingredientCategory, yesBartenderResponse, noBartenderResponse) {
  this.yes = 'Aye';
  this.no = 'Ney';
  this.theQuestion = theQuestion;
  this.ingredientCategory = ingredientCategory;
  this.yesBartenderResponse = yesBartenderResponse;
  this.noBartenderResponse = noBartenderResponse;
};

module.exports = Question;