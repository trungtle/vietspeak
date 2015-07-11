const CHOICE_NUM = 4;

Template.qWordPairing.onCreated(function() {

    var lesson = Template.currentData();
    fetchMatches(lesson);
});

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
    //@TODO: calculate score based on how many matches user
     // got right on their first try
    var numMatches = Session.get("numMatches");
    return numMatches === CHOICE_NUM;
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

function fetchMatches(lesson) {
    var choices = lesson.phrases;

    // Reject other choices that are not of the same question type
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
}
