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
				qtype: QTYPE.LISTENING_VE,
				vietnamese: "Tôi là Trung",
				audioSrc: "/audio/lessons/toi_an.m4a",
				english: ["I am Trung", "I'm Trung"]
			},
			{
				qtype: QTYPE.MULTIPLE_CHOICES,
				vietnamese: "Bạn là Minh",
				english: ["You are Minh", "You're Minh"]
			},
			{
				qtype: QTYPE.TRANSLATE_VE,
				vietnamese: "Người phụ nữ",
				english: ["The woman", "woman"]
			},
			{
				qtype: QTYPE.MULTIPLE_CHOICES,
				vietnamese: "Người đàn ông",
				english: ["The man", "man"]
			},
			{
				qtype: QTYPE.MULTIPLE_CHOICES,
				vietnamese: "Người đàn bà",
				english: ["The woman", "woman"]
			},
			{
				qtype: QTYPE.MULTIPLE_CHOICES,
				vietnamese: "Người con trai",
				english: ["The boy", "boy"]
			},
			{
				qtype: QTYPE.MULTIPLE_CHOICES,
				vietnamese: "Người con gái",
				english: ["The girl", "Girl"]
			},
			{
				qtype: QTYPE.MULTIPLE_CHOICES,
				vietnamese: "Tôi là con trai",
				english: ["I am a boy", "I'm a boy"]
			},
			{
				qtype: QTYPE.MULTIPLE_CHOICES,
				vietnamese: "Tôi là con gái",
				english: ["I am a girl", "I'm a girl"]
			},
			{
				qtype: QTYPE.MULTIPLE_CHOICES,
				vietnamese: "Tôi là nam",
				english: ["I am a male", "I am male", "I'm male", "I'm a male", "I'm a man", "I am a man"]
			},
			{
				qtype: QTYPE.MULTIPLE_CHOICES,
				vietnamese: "Tôi là nữ",
				english: ["I am a female", "I am female", "I'm female", "I'm a female", "I am a woman", "I'm a woman"]
			},
			{
				qtype: QTYPE.MULTIPLE_CHOICES,
				vietnamese: "Bé trai",
				english: ["baby boy"]
			},
			{
				qtype: QTYPE.MULTIPLE_CHOICES,
				vietnamese: "Bé gái",
				english: ["baby girl"]
			},
			{
				qtype: QTYPE.MULTIPLE_CHOICES,
				vietnamese: "Tôi thích bé gái",
				english: ["I like baby girl"]
			},
			{
				qtype: QTYPE.MULTIPLE_CHOICES,
				vietnamese: "Bạn là đàn ông",
				english: ["I am a male", "I am male", "I'm male", "I'm a male", "I'm a man", "I am a man"]
			},
		]
	});

	Lessons.insert({
		name: "Greetings",
		content: "Some greetigs stuff"
	});

	Lessons.insert({
		name: "Basic 2",
		content: "Basic 2 content",
	});
}

