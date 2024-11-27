console.log("Lets play UNICAP");

const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choise-text"));
console.log(choices);

let currentQuestion = {};
let acceptingAnswers = true;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [
    {
        question: "O que significa HTML?",
        choice1: "Hyper Text Markup Language",
        choice2: "Hyperlink Text Mark Language",
        choice3: "Home Tool Markup Language",
        choice4: "Hyper Text Markdown Language",
        answer: 1,
    },
    {
        question: "Qual a tag usada para criar um link em HTML?",
        choice1: "<div>",
        choice2: "<a>",
        choice3: "<link>",
        choice4: "<href>",
        answer: 2,
    },
    {
        question: "Qual atributo é usado para especificar uma imagem em uma tag <img>?",
        choice1: "alt",
        choice2: "src",
        choice3: "href",
        choice4: "title",
        answer: 2,
    },
    {
        question: "Qual destas tags é usada para criar uma lista não ordenada em HTML?",
        choice1: "<ul>",
        choice2: "<ol>",
        choice3: "<li>",
        choice4: "<list>",
        answer: 1,
    },
];

const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 3;

startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    console.log(availableQuestions);
    getNewQuestion();
};

getNewQuestion = () => {
    if (availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {
        // Fim do jogo
        console.log("Fim do jogo!");
        return;
    }

    questionCounter++;
    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    question.innerText = currentQuestion.question;

    choices.forEach((choice) => {
        const number = choice.dataset["number"];
        choice.innerText = currentQuestion["choice" + number];
    });

    availableQuestions.splice(questionIndex, 1);

    acceptingAnswers = true;
};

startGame();
