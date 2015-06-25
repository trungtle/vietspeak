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
		name: "Basic 1",
		content: "Basic 1 content",
		phrases: [
			{
				qtype: QTYPE.MULTIPLE_CHOICES,
				vietnamese: "Người đàn ông",
				english: ["man"]
			},
			{
				qtype: QTYPE.MULTIPLE_CHOICES,
				vietnamese: "Người đàn bà",
				english: ["woman"]
			},
			{
				qtype: QTYPE.MULTIPLE_CHOICES,
				vietnamese: "Tôi là đàn ông",
				english: ["I'm a man", "I am a man"]
			},
			{
				qtype: QTYPE.MULTIPLE_CHOICES,
				vietnamese: "Tôi là đàn bà",
				english: ["I'm a woman", "I am a woman"]
			},
			{
				qtype: QTYPE.MULTIPLE_CHOICES,
				vietnamese: "Con chó",
				english: ["Dog"]
			},
			{
				qtype: QTYPE.MULTIPLE_CHOICES,
				vietnamese: "Con mèo",
				english: ["Cat"]
			},
			{
				qtype: QTYPE.MULTIPLE_CHOICES,
				vietnamese: "Đây là con chó",
				english: ["This is a dog", "This is the dog"]
			},
			{
				qtype: QTYPE.MULTIPLE_CHOICES,
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
				qtype: QTYPE.MULTIPLE_CHOICES,
				vietnamese: "Xin chào",
				english: ["Hello"]
			},
			{
				qtype: QTYPE.MULTIPLE_CHOICES,
				vietnamese: "Chào",
				english: ["Hi"]
			},
			{
				qtype: QTYPE.MULTIPLE_CHOICES,
				vietnamese: "Chào buổi sáng",
				english: ["Good morning"]
			},
		]
	});

	Lessons.insert({
		name: "Basic 2",
		content: "Basic 2 content",
	});
}

