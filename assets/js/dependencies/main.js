$(document).ready(function () {
  /***Objects***/
  var letters = {
    alphabet: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h',
        'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's',
        't', 'u', 'v', 'w', 'x', 'y', 'z'],
    populate: populate,
    turnUsed: turnUsed,
    reset: resetLetters
  }

   var word = {
    availableWords: {
      "animals": ["bear", "lion", "kangaroo", "tiger", "frog"],
      "chores": ["taking out the trash", "washing the dishes", "vacuuming", "tending the garden", "dusting"],
      "countries": ["india", "china", "taiwan", "france", "germany"],
      "sports": ["hockey", "basketball", "football", "baseball", "tennis"],
      "companies": ["microsoft", "google", "apple", "intel", "lenovo"]
  },
    word: "",
    wordArray: [],
    guessesLeft: 5,
    get: getWord,
    generate: generateWord,
    fill: fillWord,
    guess: guessWord,
    reset: resetWord

  }



  /***For letters object***/

  function populate () {
    var lettersForGuessing = $('.lettersForGuessing');
    for(var i = 0; i < this.alphabet.length; i++) {

        lettersForGuessing.append("<span id='"+this.alphabet[i]+"' class='letter'>"+this.alphabet[i].toUpperCase()+"</span>");
      }
    }



  function turnUsed (letter) {
    var index = this.alphabet.indexOf(letter);
    $('#'+letter).addClass('used');
  }

  function resetLetters () {
    var letters = $('.letter');
    $('.letter').removeClass('used');
  }

  /***For word object***/


  function getWord (category, number) {
    return this.availableWords[category][number];
  }

  function generateWord (category) {
    i = Math.ceil(Math.random()*(this.availableWords[category].length-2)); //minus two since index starts @ 0 and last field is taken by the prototype
    generatedWord = this.get(category, i);
    var wordArray = [];
    for(var i = 0; i < generatedWord.length; i++) {
        wordArray.push(generatedWord.charAt(i));
    }
    this.word = generatedWord;
    this.wordArray = wordArray;
    this.fill(); //we can tell it to fill since generate and fill usually take place @ same time
  }

  function fillWord () {
    wordArray = this.wordArray;
    var wordDiv = $('.word');
    var vowels = [];
    for(var i = 0; i < wordArray.length; i++) {
      if(vowels.indexOf(wordArray[i]) != -1) {
        wordDiv.append("<span class='letterInWord'>"+wordArray[i].toUpperCase()+"</span>");
        wordArray[i] = "+"; //to signify it has been replaced
      } else {
        wordDiv.append("<span class='letterInWord'>_</span>");
      }
    }
    this.wordArray = wordArray;
  }

  function guessWord (letter) {
    var index, isValidGuess;
    var wordArray = this.wordArray;
    //for multiple matches
    while(wordArray.indexOf(letter) != -1) {
      index = wordArray.indexOf(letter);
      $(".letterInWord:eq("+index+")").html(wordArray[index].toUpperCase());
      wordArray[index] = "+"; //to signify it has been guessed
      isValidGuess = true;
    }
    if (wordArray.allValuesSame()) {
      this.guessesLeft = 0;
      appendScoreRecord({
        wordGuessed: this.word,
        gameWon: true,   
        guessesLeft: 0
      });
      $('.word').html("Congratulations! You guessed the right word, "+this.word.toUpperCase() + ". To play again, please select a new category.");

    }

    this.wordArray = wordArray;
    if(isValidGuess) return true;
    var guessedBefore = $("#"+letter).hasClass("used");
    if(!guessedBefore) {
      this.guessesLeft -= 1;
      hangmanDrawer(this.guessesLeft);
    };
    if(!this.guessesLeft) {
      appendScoreRecord({
        wordGuessed: this.word,
        gameWon: false,   
        guessesLeft: this.guessesLeft
      });
      $('.word').html("Game over! The word was "+this.word.toUpperCase()+". To play again, please select a new category.");
    }

    return false;
  }

  function appendScoreRecord(data) {
    // interface data {
    //   wordGuessed: '',
    //   gameWon: '',
    //   player: '',   
    //   guessesLeft: ''
    // }
    if (uid) {
      data.player = uid;

      $.ajax({
        url : "/score",
        type: "POST",
        data: JSON.stringify(
          data
        ),
        contentType: "application/json; charset=utf-8",
        dataType   : "json",
        success    : function () {
          console.log('data saved');
        },
        error: function (xhr, text, exception) {
          alert('An ERROR occured! ' + text);
        }
      });
    } else {
      alert('No valid uID found');
    }

  }


  function resetWord () {
    this.word = "";
    this.wordArray = [];
    this.guessesLeft = 5;
    $('.word').html('');
    letters.reset();
  }

  function hangmanDrawer(numberofGuessesLeft) {
    switch(numberofGuessesLeft) {
      case 4: canvas.hanger(); break;
      case 3: canvas.head(); break;
      case 2: canvas.stick(); break;
      case 1: canvas.arms(); break;
      case 0: canvas.legs(); break;
    }
  }




  /***
  Initialization and Events
  ***/

  $('.playCircle').on("click", function () {
    $('.introOverlay').css("top", "100%");
  });



  letters.populate();
  $('.letter').on("click", function () {
    if(word.guessesLeft) {
      var id = $(this).attr('id');
      word.guess(id);
      letters.turnUsed(id);
    }
  });

  word.generate($('#chooseCategory option:selected').val());
  $('#chooseCategory').on("change", function () {
    word.reset();
    word.generate($('#chooseCategory option:selected').val());
    canvas.wipe();
    canvas.stand();
  });


});
