console.log("Let's play UNICAP");

const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choise-text"));
const questionCounterText = document.getElementById("questionCounter");
const scoreText = document.getElementById("score");

let currentQuestion = {};
let acceptingAnswers = true;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 5;

fetch("questoes.json")
    .then((res) => res.json())
    .then((loadedQuestions) => {
        availableQuestions = [...loadedQuestions];
        startGame();
    })
    .catch((err) => {
        console.error("Erro ao carregar perguntas:", err);
    });

startGame = () => {
    questionCounter = 0;
    score = 0;
    updateHUD();
    getNewQuestion();
};

getNewQuestion = () => {
    if (availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {
        localStorage.setItem("mostRecentScore", score);
        updateRanking(score);
        return window.location.assign("/fimdejogo.html");
    }

    questionCounter++;
    updateHUD();

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

choices.forEach((choice) => {
    choice.addEventListener("click", (e) => {
        if (!acceptingAnswers) return;

        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset["number"];

        const classToApply =
            selectedAnswer == currentQuestion.answer ? "correto" : "incorreto";

        console.log("Resposta:", classToApply);

        selectedChoice.parentElement.classList.add(classToApply);

        if (classToApply === "correto") {
            score += CORRECT_BONUS;
        }

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestion();
        }, 1000);
    });
});

const updateHUD = () => {
    questionCounterText.innerText = `${questionCounter}/${MAX_QUESTIONS}`;
    scoreText.innerText = score;
};

const updateRanking = (newScore) => {
    const ranking = JSON.parse(localStorage.getItem("ranking")) || [];
    ranking.push({ score: newScore, date: new Date().toLocaleString() });
    ranking.sort((a, b) => b.score - a.score);
    localStorage.setItem("ranking", JSON.stringify(ranking.slice(0, 10)));
};
