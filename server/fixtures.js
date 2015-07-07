// Question type
QTYPE = {
    RANDOM: 0,
    TRANSLATE_VE: 1,
    LISTEN_VE: 2,
    MULTIPLE_CHOICES_TRANSLATION: 3,
    MULTIPLE_CHOICES_TRANSLATION_PIC: 4,
    REARRANGE: 5, // Rearrange words in a Vietnamese phrase
    FILL_IN_BLANK: 6, // Fill in the blank for a Vietnamese phrase
    WORD_PAIRING: 7, // Pairing between English & Vietnamese
    REPLACE_WRONG_WORD: 8, // Use English hint, click on wrong word in Vietnamese phrase
    SELECT_CORRECT_SPELLING: 9, // Play a tone, and select the correct spelling for the tone
    TRANSLATE_EV: 10, // Teach typing in Vietnamese
    TRUE_FALSE: 11,
    MULTIPLE_CHOICES_MULTIPLE_ANSWERS: 12, // Multiple choices with multiple answers allowed
    MULTIPLE_CHOICES_MULTIPLE_ANSWERS_AUDIO: 13, // Multiple choices with multiple answers allowed
};

Lessons.remove({});

if (Lessons.find().count() === 0) {


    Lessons.insert({
        name: "Basic 1",
        preview: "Đàn ông, phụ nữ, con chó, con mèo...",
        content: ["basic1"],
        phrases: [{
            qType: QTYPE.MULTIPLE_CHOICES_TRANSLATION_PIC,
            image: "/img/lessons/man.jpg",
            vietnamese: "Đàn ông",
            english: ["Man"]
        }, {
            qType: QTYPE.MULTIPLE_CHOICES_TRANSLATION_PIC,
            vietnamese: "Phụ nữ",
            image: "/img/lessons/woman.jpg",
            english: ["Woman"]
        }, {
            qType: QTYPE.MULTIPLE_CHOICES_TRANSLATION,
            vietnamese: "Tôi là đàn ông",
            english: ["I am a man", "I'm a man"]
        }, {
            qType: QTYPE.TRANSLATE_VE,
            vietnamese: "Đàn ông",
            image: "/img/lessons/man.jpg",
            english: ["Man"]
        }, {
            qType: QTYPE.MULTIPLE_CHOICES_TRANSLATION,
            vietnamese: "Tôi là phụ nữ",
            english: ["I am a woman", "I'm a woman"]
        }, {
            qType: QTYPE.MULTIPLE_CHOICES_TRANSLATION_PIC,
            vietnamese: "Con chó",
            image: "/img/lessons/dog.jpg",
            english: ["Dog"]
        }, {
            qType: QTYPE.MULTIPLE_CHOICES_TRANSLATION_PIC,
            vietnamese: "Con mèo",
            image: "/img/lessons/cat.jpg",
            english: ["Cat"]
        }, {
            qType: QTYPE.LISTEN_VE,
            vietnamese: "Phụ nữ",
            english: ["Woman"]
        }, {
            qType: QTYPE.MULTIPLE_CHOICES_TRANSLATION,
            vietnamese: "Đây là con chó",
            english: ["This is a dog", "This is the dog"]
        }, {
            qType: QTYPE.TRANSLATE_VE,
            vietnamese: "Con chó",
            english: ["Dog"]
        }, {
            qType: QTYPE.MULTIPLE_CHOICES_TRANSLATION,
            vietnamese: "Đây là con mèo",
            english: ["This is a cat", "This is the cat"]
        }, {
            qType: QTYPE.TRANSLATE_VE,
            vietnamese: "Phụ nữ",
            english: ["Woman"]
        }, {
            qType: QTYPE.TRANSLATE_VE,
            vietnamese: "Tôi là phụ nữ",
            english: ["I am a woman", "I'm a woman"]
        }, {
            qType: QTYPE.TRANSLATE_VE,
            vietnamese: "Đây là con mèo",
            english: ["This is a cat", "This is the cat"]
        }, {
            qType: QTYPE.LISTEN_VE,
            vietnamese: "Đàn ông",
            english: ["Man"]
        }, ]
    });

    Lessons.insert({
        name: "Greetings",
        content: ["greetings1"],
        phrases: [{
                qType: QTYPE.MULTIPLE_CHOICES_TRANSLATION,
                vietnamese: "Xin chào",
                english: ["Hello"]
            }, {
                qType: QTYPE.MULTIPLE_CHOICES_TRANSLATION,
                vietnamese: "Chào",
                english: ["Hi / Bye", "Hi", "Bye"]
            }, {
                qType: QTYPE.MULTIPLE_CHOICES_TRANSLATION,
                vietnamese: "Tạm biệt",
                english: ["Goodbye"]
            }, {
                qType: QTYPE.MULTIPLE_CHOICES_TRANSLATION,
                vietnamese: "Chào buổi sáng",
                english: ["Good morning"]
            }, {
                qType: QTYPE.TRANSLATE_VE,
                vietnamese: "Bạn khoẻ không?",
                english: ["How are you?", "How are you"]
            }, {
                qType: QTYPE.MULTIPLE_CHOICES_TRANSLATION,
                vietnamese: "Tôi khoẻ",
                english: ["I'm good", "I am good", "I'm well", "I am well"]
            }, {
                qType: QTYPE.MULTIPLE_CHOICES_TRANSLATION,
                vietnamese: "Cám ơn",
                english: ["Thank you", "Thanks"]
            },

            {
                qType: QTYPE.TRANSLATE_VE,
                vietnamese: "Xin chào",
                english: ["Hello"]
            }, {
                qType: QTYPE.TRANSLATE_VE,
                vietnamese: "Tạm biệt",
                english: ["Goodbye"]
            }, {
                qType: QTYPE.TRUE_FALSE,
                question: "'Bạn' is an aggressive second person pronoun",
                answer: false
            }, {
                qType: QTYPE.MULTIPLE_CHOICES_TRANSLATION,
                vietnamese: "Không có chi",
                english: ["You're welcome"]
            }, {
                qType: QTYPE.TRANSLATE_VE,
                vietnamese: "Chào buổi sáng",
                english: ["Good morning"]
            }, {
                qType: QTYPE.MULTIPLE_CHOICES_TRANSLATION,
                vietnamese: "Xin lỗi",
                english: ["Sorry", "Excuse me"]
            }, {
                qType: QTYPE.TRANSLATE_VE,
                vietnamese: "Không sao",
                english: ["No problem"]
            }, {
                qType: QTYPE.MULTIPLE_CHOICES_TRANSLATION,
                vietnamese: "Phụ nữ",
                english: ["Woman"]
            }, {
                qType: QTYPE.TRUE_FALSE,
                question: "'Không có chi' is a reply to someone apologizing to you",
                answer: false
            }, {
                qType: QTYPE.TRANSLATE_VE,
                vietnamese: "Tạm biệt",
                english: ["Goodbye"]
            }, {
                qType: QTYPE.MULTIPLE_CHOICES_TRANSLATION,
                vietnamese: "Bạn khoẻ không?",
                english: ["How are you?", "How are you"]
            },
        ]
    });

}
