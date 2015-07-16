Lessons.remove({});

if (Lessons.find().count() === 0) {

    Lessons.insert(BASIC_1);
    Lessons.insert(BASIC_2);
    Lessons.insert(GREETINGS);

    Lessons.insert({
        name: "Food",
        level: 2,
    });

    Lessons.insert({
        name: "Family",
        level: 2,
    });

    Lessons.insert({
        name: "Date & Time",
        level: 3,
    });

    Lessons.insert({
        name: "Animals",
        level: 3,
    });

    Lessons.insert({
        name: "On the street",
        level: 3,
    });
    Lessons.insert({
        name: "Directions",
        level: 4,
    });

    Lessons.insert({
        name: "Diacritics",
        level: 4,
    });

    Lessons.insert({
        name: "Numbers",
        level: 4,
    });

    Lessons.insert({
        name: "Questions",
        level: 5,
    });

    Lessons.insert({
        name: "Places",
        level: 5,
    });

    Lessons.insert({
        name: "Around the house",
        level: 5,
    });

    Lessons.insert({
        name: "Adjectives",
        level: 5,
    });

    Lessons.insert({
        name: "Nouns",
        level: 6,
    });

    Lessons.insert({
        name: "Verbs",
        level: 6,
    });

    Lessons.insert({
        name: "Travel",
        level: 6,
    });

    Lessons.insert({
        name: "Science",
        level: 7,
    });

    Lessons.insert({
        name: "Flirting",
        level: 7,
    });

    Lessons.insert({
        name: "Pronouns",
        level: 7,
    });

    Lessons.insert({
        name: "Clothing",
        level: 7,
    });

    Lessons.insert({
        name: "Jokes",
        level: 8,
    });
    Lessons.insert({
        name: "Proverbs",
        level: 8,
    });
    Lessons.insert({
        name: "Measure",
        level: 9,
    });
    Lessons.insert({
        name: "Emotions",
        level: 9,
    });
    Lessons.insert({
        name: "Professions",
        level: 9,
    });
    Lessons.insert({
        name: "Business",
        level: 10,
    });
    Lessons.insert({
        name: "Nature",
        level: 10,
    });
    Lessons.insert({
        name: "Spirituality",
        level: 10,
    });
}
