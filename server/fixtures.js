Lessons.remove({});

if (Lessons.find().count() === 0) {

    Lessons.insert({
        name: "Basics 1",
        preview: "Tôi là, đàn ông, phụ nữ, đây là, con chó, con mèo",
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
            qType: QTYPE.WORD_PAIRING,
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
            qType: QTYPE.WORD_PAIRING,
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
        name: "Basics 2",
        content: ["basic2"],
        preview: "có, thích, anh ấy, cô ấy, bạn",
        phrases: [{
            qType: QTYPE.TRANSLATE_VE,
            vietnamese: "Tôi có một con chó",
            english: ["I have a dog"]
        }, {
            qType: QTYPE.TRANSLATE_VE,
            vietnamese: "Bạn có con chó",
            english: ["You have a dog", "You have the dog"]
        }, {
            qType: QTYPE.TRANSLATE_VE,
            vietnamese: "Bạn không có con mèo",
            english: ["You don't have a cat", "You do not have a cat"]
        },{
            qType: QTYPE.TRANSLATE_VE,
            vietnamese: "Cô ấy có một con mèo",
            english: ["She has a cat"]
        }, {
            qType: QTYPE.TRANSLATE_VE,
            vietnamese: "Tôi thích con chó",
            english: ["I like the dog"]
        }, {
            qType: QTYPE.TRANSLATE_VE,
            vietnamese: "Anh  thích con chó",
            english: ["I like the dog"]
        }, {
            qType: QTYPE.TRANSLATE_VE,
            vietnamese: "Bạn thích chó",
            english: ["You like dogs"]
        }, {
            qType: QTYPE.TRANSLATE_VE,
            vietnamese: "Cô ấy thích phụ nữ",
            english: ["She likes women"]
        }, {
            qType: QTYPE.TRANSLATE_VE,
            vietnamese: "Đây là con mèo",
            english: ["This is a cat", "This is the cat"]
        }, {
            qType: QTYPE.TRANSLATE_VE,
            vietnamese: "Cô ấy không phải là con mèo",
            english: ["She is not a cat", "She's not a cat"]
        }, {
            qType: QTYPE.TRANSLATE_VE,
            vietnamese: "Cô ấy thích con chó",
            english: ["She likes the dog"]
        }, {
            qType: QTYPE.TRANSLATE_VE,
            vietnamese: "Bạn có con mèo",
            english: ["You have a cat", "You have the cat"]
        }]
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
                qType: QTYPE.WORD_PAIRING,
            }, {
                qType: QTYPE.MULTIPLE_CHOICES_TRANSLATION,
                vietnamese: "Cám ơn",
                english: ["Thank you", "Thanks"]
            }, {
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
                qType: QTYPE.WORD_PAIRING,
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

    Lessons.insert({
        name: "Food",
        content: ["food"],
        phrases: [{

        }]
    });

    Lessons.insert({
        name: "Family",
        content: ["family"],
        phrases: [{

        }]
    });

    Lessons.insert({
        name: "Date & Time",
        content: ["datetime"],
        phrases: [{
                qType: QTYPE.MULTIPLE_CHOICES_TRANSLATION,
                vietnamese: "Xin chào",
                english: ["Hello"]
            }]

    });

    Lessons.insert({
        name: "Animals",
        content: ["animals"],
        phrases: [{
                qType: QTYPE.MULTIPLE_CHOICES_TRANSLATION,
                vietnamese: "Xin chào",
                english: ["Hello"]
            }]

    });

    Lessons.insert({
        name: "On the street",
        content: ["streets"],
        phrases: [{
                qType: QTYPE.MULTIPLE_CHOICES_TRANSLATION,
                vietnamese: "Xin chào",
                english: ["Hello"]
            }]

    });

}
