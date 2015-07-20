const CHOICE_NUM = 4;
const WRONG_DEDUCTION = 3;

Template.qWordPairing.helpers({

    choices: function() {
        return Session.get("choices");
    },
    choiceNum: function() {
      return CHOICE_NUM;
    }

});

Template.qWordPairing.events({

    "click .choice.enabled": function(ev) {
        // find clicked choice object based on id
        var clickWord = ev.target.id;
        var prevChoiceWord = Session.get("prevChoiceWord");

        compareChoices(prevChoiceWord, clickWord);

    }

});

// ----------------------
// Public functions
// ----------------------

aWordPairing = function() {
    return Session.get("answerScore");
}

// ----------------------
// Private functions
// ----------------------

function compareChoices(prevChoiceWord, curChoiceWord) {
    var choices = Session.get("choices");
    var curChoice = _.findWhere(choices, {displayedWord: curChoiceWord});

    if (prevChoiceWord) { // compare previous choice with the new one
      // choices matched:
        var prevChoice = _.findWhere(choices, {displayedWord: prevChoiceWord});
        if (prevChoice.matchingWord === curChoice.displayedWord) {
            curChoice.checked = true;
            Session.set("numMatches", Session.get("numMatches") + 1);
            // TODO: disable both buttons
            if(Session.get("numMatches") === CHOICE_NUM) {
              enableSubmitButton();
            }
            prevChoice.disabled = true;
            curChoice.disabled = true;
      // choices didn't match:
        } else {
            prevChoice["checked"] = false;
            curChoice["checked"] = false;
            reduceAnswerScore();
            //@TODO: run fancy "wrong!" animation
        }
    Session.set("prevChoiceWord", null);

    // no choices previously selected
    } else {
        curChoice.checked = true;
        Session.set("prevChoiceWord", curChoice.displayedWord);
    }

    // update Session
    Session.set("choices", choices);
}

function reduceAnswerScore(){
    var answerScore = Session.get("answerScore");
    if (answerScore > 0) {
        answerScore -=WRONG_DEDUCTION;
        Session.set("answerScore", answerScore);
    }
}

setupWordPairing = function(lesson) {
    var choices = lesson.phrases;

    // pick choices of a single question type
    choices = _.reject(choices, function(choice) {
        return choice.qType !== QTYPE.TRANSLATE_VE; // @TODO -- choose appropriate QTYPE

    });
    // randomly pick a set number of choices
    var vnChoices = _.sample(choices, CHOICE_NUM);

     // deep-copy vnchoices
    var enChoices = [];
    for(var i = 0; i < vnChoices.length; ++i) {
      enChoices.push($.extend(true, {}, vnChoices[i]));
    }

    // set up displayed/matching fields of VN-displayed words
    _.map(vnChoices, function(choice) {
      _.extend(choice,{
        displayedWord: choice.vietnamese,
        matchingWord: choice.english[0],
        checked: false,
        disabled: false
      });
    });


    // set up displayed/matching fields of EN-displayed words
    _.map(enChoices, function(choice) {
      _.extend(choice,{
        displayedWord: choice.english[0],
        matchingWord: choice.vietnamese,
        checked: false,
        disabled: false
      });
    });

    var choices = vnChoices.concat(enChoices);

    // Randomize!
    choices = _.shuffle(choices);

    Session.set("choices", choices);
    Session.set("prevChoiceWord", null); // comparison for match
    Session.set("numMatches", 0);
    Session.set("answerScore", WRONG_DEDUCTION*CHOICE_NUM);
}
