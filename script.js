const difficultySelection = document.getElementById('difficultySelection')
const gameDiv = document.getElementById('game')
const questionElement = document.getElementById('question')
const answersDiv = document.getElementById('answers')
const scoreElement = document.getElementById('score')
const timerElement = document.getElementById('timer')

let score = 0
let currentAnswer = 0
let timer
let timeLeft
let currentDifficulty

const difficulties = {
    easy: { min: 1, max: 10 },
    medium: { min: 10, max: 50 },
    hard: { min: 50, max: 100 }
}

document.querySelectorAll('.difficulty-btn').forEach(button => {
    button.addEventListener('click', () => {
        currentDifficulty = button.getAttribute('data-difficulty')
        startGame(currentDifficulty)
    })
})

function startGame(difficulty) {
    difficultySelection.classList.add('hidden')
    gameDiv.classList.remove('hidden')
    score = 0
    scoreElement.textContent = `Score: ${score}`
    generateQuestion(difficulty)
}

function generateQuestion(difficulty) {
    clearInterval(timer)
    timeLeft = 15
    timerElement.textContent = `Temps restant: ${timeLeft}s`
    timer = setInterval(updateTimer, 1000)

    const { min, max } = difficulties[difficulty]
    const num1 = Math.floor(Math.random() * (max - min + 1)) + min
    const num2 = Math.floor(Math.random() * (max - min + 1)) + min
    const operation = Math.random() > 0.5 ? '+' : '-'
    currentAnswer = operation === '+' ? num1 + num2 : num1 - num2

    questionElement.textContent = `${num1} ${operation} ${num2} = ?`
    generateAnswers(currentAnswer)
}

function generateAnswers(correctAnswer) {
    answersDiv.innerHTML = ''
    const answers = [correctAnswer]
    while (answers.length < 6) {
        const wrongAnswer = correctAnswer + Math.floor(Math.random() * 20) - 10
        if (!answers.includes(wrongAnswer)) {
            answers.push(wrongAnswer)
        }
    }
    answers.sort(() => Math.random() - 0.5)

    answers.forEach(answer => {
        const button = document.createElement('button')
        button.textContent = answer
        button.className = 'answer-btn bg-gray-300 hover:bg-gray-400 text-black font-bold py-2 px-4 rounded w-full'
        button.addEventListener('click', () => checkAnswer(answer))
        answersDiv.appendChild(button)
    })
}

function checkAnswer(answer) {
    if (answer === currentAnswer) {
        score++
        scoreElement.textContent = `Score: ${score}`
        generateQuestion(currentDifficulty)
    } else {
        endGame(`Mauvaise réponse! Votre score est: ${score}`)
    }
}

function updateTimer() {
    timeLeft--
    timerElement.textContent = `Temps restant: ${timeLeft}s`
    if (timeLeft <= 0) {
        endGame(`Temps écoulé! Votre score est: ${score}`)
    }
}

function endGame(message) {
    clearInterval(timer)
    alert(message)
    resetGame()
}

function resetGame() {
    gameDiv.classList.add('hidden')
    difficultySelection.classList.remove('hidden')
}
