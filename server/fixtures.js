Lessons.remove({});

if (Lessons.find().count() === 0) {

    Lessons.insert(BASIC_1);
    Lessons.insert(BASIC_2);
    Lessons.insert(GREETINGS);
    Lessons.insert(FOODS_1);

    Lessons.insert({
        index: 5,
        name: "family",
        title: "Family",
        level: 2,
    });

    Lessons.insert({
        index: 6,
        name: "date_time",
        title: "Date & Time",
        level: 3,
    });

    Lessons.insert({
        index: 7,
        name: "animals",
        title: "Animals",
        level: 3,
    });

    Lessons.insert({
        index: 8,
        name: "street",
        title: "On the street",
        level: 3,
    });
    Lessons.insert({
        index: 9,
        name: "directions",
        title: "Directions",
        level: 4,
    });

    Lessons.insert({
        index: 10,
        name: "diacritics",
        title: "Diacritics",
        level: 4,
    });

    Lessons.insert({
        index: 11,
        name: "numbers",
        title: "Numbers",
        level: 4,
    });

    Lessons.insert({
        index: 12,
        name: "house",
        title: "Around the house",
        level: 5,
    });

    Lessons.insert({
        index: 13,
        name: "pronouns",
        title: "Pronouns",
        level: 5,
    });

    Lessons.insert({
        index: 14,
        name: "places",
        title: "Places",
        level: 5,
    });

    Lessons.insert({
        index: 15,
        level: 5,
        name: "questions",
        title: "Questions",
    });

    Lessons.insert({
        index: 16,
        name: "adjectives",
        title: "Adjectives",
        level: 6,
    });

    Lessons.insert({
        index: 17,
        name: "nouns",
        title: "Nouns",
        level: 6,
    });

    Lessons.insert({
        index: 18,
        name: "verbs",
        title: "Verbs",
        level: 6,
    });

    Lessons.insert({
        index: 19,
        name: "travel",
        title: "Holiday & Travel",
        level: 6,
    });

    Lessons.insert({
        index: 20,
        name: "science",
        title: "Science",
        level: 7,
    });

    Lessons.insert({
        index: 21,
        name: "flirting",
        title: "Flirting",
        level: 7,
    });

    Lessons.insert({
        index: 22,
        name: "clothing",
        title: "Clothing",
        level: 7,
    });

    Lessons.insert({
        index: 23,
        name: "jokes",
        title: "Jokes",
        level: 8,
    });
    Lessons.insert({
        index: 24,
        name: "proverbs",
        title: "Proverbs & Poetry",
        level: 8,
    });
    Lessons.insert({
        index: 25,
        name: "measure",
        title: "Measure",
        level: 9,
    });
    Lessons.insert({
        index: 26,
        name: "emotions",
        title: "Emotions",
        level: 9,
    });
    Lessons.insert({
        index: 27,
        name: "professions",
        title: "Professions",
        level: 9,
    });
    Lessons.insert({
        index: 28,
        name: "business",
        title: "Business",
        level: 10,
    });
    Lessons.insert({
        index: 29,
        name: "nature",
        title: "Nature",
        level: 10,
    });
    Lessons.insert({
        index: 30,
        name: "spirituality",
        title: "Spirituality",
        level: 10,
    });
}
