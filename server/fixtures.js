// Question type
QTYPE = {
	RANDOM: 0,
	TRANSLATE_VE: 1,
	LISTENING_VE: 2,
	MULTIPLE_CHOICES: 3,
	MULTIPLE_CHOICES_PIC_VE: 4,
	REARRANGE: 5,
	FILL_IN_BLANK: 6,
	MATCHING: 7,
	REPLACE_WRONG_WORD: 8, 		// Click on wrong word, retype it
	SELECT_CORRECT_SPLEEING: 9, // 12 phrases flowing through
	TRANSLATE_EV: 10,
};

if (Lessons.find().count() === 0)
{
	Lessons.insert({
		name: "Introduction",
		content: ["lessonIntroduction1", "lessonIntroduction2", "lessonIntroduction3"],
		phrases: [
			{
				qType: QTYPE.TRUE_FALSE,
				question: "Vietnamese is a tonal language.",
				answer: true,
			},
			{
				qType: QTYPE.TRUE_FALSE,
				question: "Vietnamese uses many borrowed Chinese words in its vocabulary.",
				answer: true,
			},
		]
	});

	Lessons.insert({
		name: "Basic 1",
		preview: "Đàn ông, đàn bà, con chó, con mèo...",
		content: ["Basic 1 content"],
		phrases: [
			{
				qType: QTYPE.MULTIPLE_CHOICES_PIC_VE,
				image: "/img/lessons/man.jpg",
				vietnamese: "Đàn ông",
				english: ["Man"]
			},
			{
				qType: QTYPE.MULTIPLE_CHOICES_PIC_VE,
				vietnamese: "Đàn bà",
				image: "/img/lessons/woman.jpg",
				english: ["Woman"]
			},
			{
				qType: QTYPE.MULTIPLE_CHOICES,
				vietnamese: "Tôi là đàn ông",
				english: ["I am a man", "I'm a man"]
			},
			{
				qType: QTYPE.TRANSLATE_VE,
				vietnamese: "Đàn ông",
				image: "/img/lessons/man.jpg",
				english: ["Man"]
			},
			{
				qType: QTYPE.MULTIPLE_CHOICES,
				vietnamese: "Tôi là đàn bà",
				english: ["I am a woman", "I'm a woman"]
			},
			{
				qType: QTYPE.MULTIPLE_CHOICES_PIC_VE,
				vietnamese: "Con chó",
				image: "/img/lessons/dog.jpg",
				english: ["Dog"]
			},
			{
				qType: QTYPE.MULTIPLE_CHOICES_PIC_VE,
				vietnamese: "Con mèo",
				image: "/img/lessons/cat.jpg",
				english: ["Cat"]
			},
			{
				qType: QTYPE.MULTIPLE_CHOICES,
				vietnamese: "Đây là con chó",
				english: ["This is a dog", "This is the dog"]
			},
			{
				qType: QTYPE.TRANSLATE_VE,
				vietnamese: "Con chó",
				english: ["Dog"]
			},
			{
				qType: QTYPE.MULTIPLE_CHOICES,
				vietnamese: "Đây là con mèo",
				english: ["This is a cat", "This is the cat"]
			},
			{
				qType: QTYPE.TRANSLATE_VE,
				vietnamese: "Đàn bà",
				english: ["Woman"]
			},
			{
				qType: QTYPE.TRANSLATE_VE,
				vietnamese: "Tôi là đàn bà",
				english: ["I am a woman", "I'm a woman"]
			},
			{
				qType: QTYPE.TRANSLATE_VE,
				vietnamese: "Đây là con mèo",
				english: ["This is a cat", "This is the cat"]
			},
		]
	});

	Lessons.insert({
		name: "Greetings",
		content: "Some greetings stuff",
		phrases: [
			{
				qType: QTYPE.MULTIPLE_CHOICES,
				vietnamese: "Xin chào",
				english: ["Hello"]
			},
			{
				qType: QTYPE.MULTIPLE_CHOICES,
				vietnamese: "Chào",
				english: ["Hi / Bye", "Hi", "Bye"]
			},
			{
				qType: QTYPE.MULTIPLE_CHOICES,
				vietnamese: "Tạm biệt",
				english: ["Goodbye"]
			},
			{
				qType: QTYPE.MULTIPLE_CHOICES,
				vietnamese: "Chào buổi sáng",
				english: ["Good morning"]
			},
			{
				qType: QTYPE.TRANSLATE_VE,
				vietnamese: "Bạn có khoẻ không?",
				english: ["How are you?", "How are you"]
			},
		]
	});

	Lessons.insert({
		name: "Basic 2",
		content: "Basic 2 content",
	});
}

