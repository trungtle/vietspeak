Lessons.remove({});

if (Lessons.find().count() === 0) {

    Lessons.insert(BASIC_1);
    Lessons.insert(BASIC_2);
    Lessons.insert(GREETINGS);

    Lessons.insert({
        name: "Food",
    });

    Lessons.insert({
        name: "Family",
    });

    Lessons.insert({
        name: "Date & Time",
    });

    Lessons.insert({
        name: "Animals",
    });

    Lessons.insert({
        name: "On the street",
    });

    Lessons.insert({
        name: "Numbers",
    });

    Lessons.insert({
        name: "Questions",
    });

    Lessons.insert({
        name: "Places",
    });

    Lessons.insert({
        name: "Around the house",
    });

    Lessons.insert({
        name: "Nouns",
    });

    Lessons.insert({
        name: "Adjectives",
    });

    Lessons.insert({
        name: "Verbs",
    });

    Lessons.insert({
        name: "Travel",
    });

    Lessons.insert({
        name: "Science",
    });

    Lessons.insert({
        name: "Flirting",
    });

    Lessons.insert({
        name: "Pronouns",
    });

    Lessons.insert({
        name: "Diacritics",
    });

    Lessons.insert({
        name: "Clothing",
    });

    Lessons.insert({
        name: "Jokes",
    });
    Lessons.insert({
        name: "Proverbs",
    });
    Lessons.insert({
        name: "Measure",
    });
    Lessons.insert({
        name: "Directions",
    });
    Lessons.insert({
        name: "Emotions",
    });
    Lessons.insert({
        name: "Professions",
    });
    Lessons.insert({
        name: "Business",
    });
    Lessons.insert({
        name: "Nature",
    });
    Lessons.insert({
        name: "Spirituality",
    });
}
