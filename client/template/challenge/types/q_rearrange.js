// maybe we should have a single file contain our constants
const KEYCODE_ENTER = 13;


Template.qRearrange.onCreated(function() {

    var lesson = Template.currentData();
    setUpQuestion(lesson);
});

Template.qRearrange.helpers({
    englishHint: function() {
        return Session.get("englishHint");
    },
    arrangedWords: function() {
        return Session.get("arrangedWords");
    },
    unarrangedWords: function() {
        return Session.get("unarrangedWords");
    },
   
});

Template.qRearrange.events({
    "click .unarranged": function(ev) {
        var clickWord = ev.target.id;
        
        transferWord("unarrangedWords", "arrangedWords", clickWord);
        enableSubmitButton();
    },

    "click .arranged": function(ev) {
        var clickWord = ev.target.id;
        
        transferWord("arrangedWords", "unarrangedWords", clickWord);

    },
});

// ----------------------
// Public functions
// ----------------------

aRearrange = function(){
    var answer = Session.get("feedback");

    var arrangedWords = Session.get("arrangedWords");

    var arrangedPhrase = toPhrase(arrangedWords);

    return answer === arrangedPhrase? CHALLENGE_PROGRESS_CORRECT :
                                        CHALLENGE_PROGRESS_WRONG;
 }


// ----------------------
// Private functions
// ----------------------

// converts a list of word objects into a single space-separated string
function toPhrase (words) {
    words = _.map(words, function(w) { return w.word;});
    var phrase = _.reduce(words, function(memo, word) {return memo + " " + word;},"");
    
    return s.trim(phrase);
}

// converts a phrase into a list of words
function toWords (phrase) {
    var words = s.words(s.trim(phrase, "."));
    // words = _.map(words, function (w) { return {word: w}} );
    return words;
}

// move word from src array to end of dst array 
// (src & dst being session object keys)
function transferWord(src, dst, targetWord) {
    var srcWords = Session.get(src);
    var dstWords = Session.get(dst);

    var targetWordObj = _.findWhere(srcWords, {word : targetWord});
    if (targetWordObj) {
        srcWords = _.without(srcWords, targetWordObj);

        dstWords.push(targetWordObj);

        Session.set(dst, dstWords);
        Session.set(src, srcWords);
    }

}

function setUpQuestion(lesson) {

    // mix up the words from two 3+ word phrases in the current lesson

    var choices = lesson.phrases;

    // pick phrases of a single question type that have more than 3 words
    choices = _.reject(choices, function(choice) {
        var isTranslateVE = choice.qType !== QTYPE.TRANSLATE_VE;
        var threeOrMoreWords = s.count(choice.vietnamese, " ") < 3;
        return isTranslateVE || threeOrMoreWords;
                
    });

    // use two random phrases, the first is the question prompt/answer and 
    // the second one is mixed in with the first

    choices = _.sample(choices, 2);

    // assuming this will always be show EN phrase, arrange VN words 
    var answer = s.trim(choices[0].vietnamese, ".");
    var englishHint = choices[0].english[0];
    var otherPhrase = s.trim(choices[1].vietnamese, ".");

    // listify
    var answerWords = toWords(answer);
    var otherPhraseWords = toWords(otherPhrase);

    // make sure second phrase doesn't have words from first phrase

    otherPhraseWords = _.difference(otherPhraseWords, answerWords);

    // combine answer/non-answer word list and conver to word objects
    var unarrangedWords = answerWords.concat(otherPhraseWords);
    unarrangedWords = _.map(unarrangedWords, function (w) { return {word: w}} );

    Session.set("unarrangedWords", unarrangedWords);
    Session.set("arrangedWords", []);
    Session.set("englishHint", englishHint);
    Session.set("feedback", answer);
}