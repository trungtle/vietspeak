Lessons.remove({});

if (Lessons.find().count() === 0) {

    Lessons.insert(BASIC_1);
    Lessons.insert(BASIC_2);
    Lessons.insert(GREETINGS);
    Lessons.insert(FOODS_1);

    Lessons.insert({
        createdAt: new Date(),
        name: "family",
        title: "Family",
        level: 2,
    });

    Lessons.insert({
        createdAt: new Date(),
        name: "date_time",
        title: "Date & Time",
        level: 3,
    });

    Lessons.insert({
        createdAt: new Date(),
        name: "animals",
        title: "Animals",
        level: 3,
    });

    Lessons.insert({
        createdAt: new Date(),
        name: "street",
        title: "On the street",
        level: 3,
    });
    Lessons.insert({
        createdAt: new Date(),
        name: "directions",
        title: "Directions",
        level: 4,
    });

    Lessons.insert({
        createdAt: new Date(),
        name: "diacritics",
        title: "Diacritics",
        level: 4,
    });

    Lessons.insert({
        createdAt: new Date(),
        name: "numbers",
        title: "Numbers",
        level: 4,
    });

    Lessons.insert({
        createdAt: new Date(),
        name: "questions",
        title: "Questions",
        level: 5,
    });

    Lessons.insert({
        createdAt: new Date(),
        name: "pronouns",
        title: "Pronouns",
        level: 5,
    });

    Lessons.insert({
        createdAt: new Date(),
        name: "places",
        title: "Places",
        level: 5,
    });

    Lessons.insert({
        createdAt: new Date(),
        name: "house",
        title: "Around the house",
        level: 5,
    });

    Lessons.insert({
        createdAt: new Date(),
        name: "adjectives",
        title: "Adjectives",
        level: 6,
    });

    Lessons.insert({
        createdAt: new Date(),
        name: "nouns",
        title: "Nouns",
        level: 6,
    });

    Lessons.insert({
        createdAt: new Date(),
        name: "verbs",
        title: "Verbs",
        level: 6,
    });

    Lessons.insert({
        createdAt: new Date(),
        name: "travel",
        title: "Holiday & Travel",
        level: 6,
    });

    Lessons.insert({
        createdAt: new Date(),
        name: "science",
        title: "Science",
        level: 7,
    });

    Lessons.insert({
        createdAt: new Date(),
        name: "flirting",
        title: "Flirting",
        level: 7,
    });

    Lessons.insert({
        createdAt: new Date(),
        name: "clothing",
        title: "Clothing",
        level: 7,
    });

    Lessons.insert({
        createdAt: new Date(),
        name: "jokes",
        title: "Jokes",
        level: 8,
    });
    Lessons.insert({
        createdAt: new Date(),
        name: "proverbs",
        title: "Proverbs & Poetry",
        level: 8,
    });
    Lessons.insert({
        createdAt: new Date(),
        name: "measure",
        title: "Measure",
        level: 9,
    });
    Lessons.insert({
        createdAt: new Date(),
        name: "emotions",
        title: "Emotions",
        level: 9,
    });
    Lessons.insert({
        createdAt: new Date(),
        name: "professions",
        title: "Professions",
        level: 9,
    });
    Lessons.insert({
        createdAt: new Date(),
        name: "business",
        title: "Business",
        level: 10,
    });
    Lessons.insert({
        createdAt: new Date(),
        name: "nature",
        title: "Nature",
        level: 10,
    });
    Lessons.insert({
        createdAt: new Date(),
        name: "spirituality",
        title: "Spirituality",
        level: 10,
    });
}
