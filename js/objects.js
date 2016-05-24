Bartender = function() {
  var question1 = new Question('Do ye like yer drinks strong?', 'Strong', 'A strong one for ye!', 'A little on the light side, eh?');
  var question2 = new Question('Do ye like it with a salty tang?', 'Salty', 'Ye like a bit of ocean water!', 'Afraid of the ocean, eh?');
  var question3 = new Question('Are ye a lubber who likes it bitter?', 'Bitter', 'Bitter in ye heart, bitters in ye drink!', 'Too much for ye, eh?');
  var question4 = new Question('Would ye like a bit of sweetness with yer poison?', 'Sweet', 'Yer one tooth is sweet, me see.', 'No sweetness for ye!');
  var question5 = new Question('Are ye one for a fruity finish?', 'Fruity', 'Ye are no pirate!', 'No fruit? Ye may be a pirate indeed!');

  this.questions = [question1, question2, question3, question4, question5];
  this.questionPosition = 0;

  var rum = new Ingredient('Strong', 'Glug of Rum', 1);
  var whisky = new Ingredient('Strong', 'Slug of Whisky', 1);
  var gin = new Ingredient('Strong', 'Splash of Gin', 1);
  var olive = new Ingredient('Salty', 'Olive on a Stick', 1);
  var salt = new Ingredient('Salty', 'Salt-dusted Rim', 1);
  var bacon = new Ingredient('Salty', 'Rasher of Bacon', 1);
  var bitters =  new Ingredient('Bitter', 'Shake of Bitters', 1);
  var tonic = new Ingredient('Bitter', 'Splash of Tonic', 1);
  var lemon = new Ingredient('Bitter', 'Twist of Lemon Peel', 1);
  var sugar = new Ingredient('Sweet', 'Sugar Cube', 1);
  var honey = new Ingredient('Sweet', 'Spoonful of Honey', 1);
  var cola = new Ingredient('Sweet', 'Splash of Cola', 1);
  var orange = new Ingredient('Fruity', 'Slice of Orange', 1);
  var casis = new Ingredient('Fruity', 'Dash of Casis', 1);
  var cherry = new Ingredient('Fruity', 'Cherry on Top', 1);

  this.pantryItems = [rum, whisky, gin, olive, salt, bacon, bitters, tonic, lemon, sugar, honey, cola, orange, casis, cherry];

  this.bartendersPantry = new Pantry(this.pantryItems);

};

Bartender.prototype = {
  getNextQuestion: function() {
    var question = this.questions[this.questionPosition];
    this.questionPosition ++;
    return question;
  },
  userPreferences: [],
  addIngredient: function(ingredientType) {
    this.userPreferences.push(ingredientType)
  },
  makeDrink: function() {
    if(this.userPreferences.length == 0) {
      return ("Ye like nothing at this bar. Get out!")
    };
    var cocktailIngredientHoldingArray = [];
    var cocktailRecipe = [];
    for (var i = 0; i < this.userPreferences.length; i++) { //for as long as the number of items in the userPreference array
      var userPreference = this.userPreferences[i]; //set userPreference equal to the x item in the userPreferences array
      for (var x = 0; x < this.bartendersPantry.stockItems.length; x++) { //for as long as the length of items in the pantry
        if(this.bartendersPantry.stockItems[x].type == userPreference && this.bartendersPantry.stockItems[x].quantity > 0) { //if the pantry item matches the user preference
          cocktailIngredientHoldingArray.push(this.bartendersPantry.stockItems[x]); //push pantry item to a new holding array
        };
      };
      if (cocktailIngredientHoldingArray.length > 0) {
        var randomNumber = 0;
        randomNumber = [Math.floor(Math.random() * cocktailIngredientHoldingArray.length)];
        var ingredientForDrink = cocktailIngredientHoldingArray[randomNumber];
        cocktailRecipe.push(ingredientForDrink.servingSize); //of all the items in the holding array, select 1 random and push to cocktailRecipe array
        cocktailIngredientHoldingArray = []; //reset this array to blank and start over if more preferences remaining
        ingredientForDrink.quantity --;
      }
    };
    if(cocktailRecipe.length == 0) {
      this.restockPantry();
      this.userPreferences = [];
      return ('The bar is out of ingredients! New supplies on the way.  Please re-order.');
    };
    if(this.userPreferences.length != cocktailRecipe.length ) {
      this.restockPantry();
      this.userPreferences = [];
      return ('Bar supplies low. Ye get a  ') + cocktailRecipe.join(' with a ') + ('. Try ordering again!'); 
    };
    this.userPreferences = []; //reset user preferences for next drink
    return cocktailRecipe.join(' with a '); //no more preferences? return a joined string
  },
  restockPantry: function() {
    for (var i = 0; i < this.bartendersPantry.stockItems.length; i++) {
      if (this.bartendersPantry.stockItems[i].quantity === 0) {
        (this.bartendersPantry.stockItems[i].quantity = 1);
      }
    }
  }
};

function Question(theQuestion, ingredientCategory, yesBartenderResponse, noBartenderResponse) {
  this.yes = 'Aye';
  this.no = 'Ney';
  this.theQuestion = theQuestion;
  this.ingredientCategory = ingredientCategory;
  this.yesBartenderResponse = yesBartenderResponse;
  this.noBartenderResponse = noBartenderResponse;
};

function Ingredient(type, servingSize, quantity) {
  this.type = type;
  this.servingSize = servingSize;
  this.quantity = quantity;
}

function Pantry(stockItems) {
  this.stockItems = stockItems;
}