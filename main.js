document.addEventListener('DOMContentLoaded', function() {

/*nav button hide/show*/
const nav = document.querySelector('#main-nav');
const sections = document.querySelectorAll('.page-section');

if (nav) {
    nav.addEventListener('click', function(e) {
      if (e.target.tagName === 'BUTTON') {
        const targetId = e.target.getAttribute('data-target');

        sections.forEach(function(sec) {
          sec.classList.add('hidden');
          sec.classList.remove('active');
        });

        const activeSec = document.getElementById(targetId);
        if (activeSec) {
          activeSec.classList.remove('hidden');
          activeSec.classList.add('active');
        }
      }
    });
  }

/* quizzzz*/
const btnSubmit = document.querySelector("#btnSubmit");
const scorebox = document.querySelector("#scorebox");
const quizContainer = document.querySelector("#quiz-container");

const questions = [ 
    {
      text: "1. When did TiTouDao Premiere?",
      name: "q1",
      options: ["1967", "2026", "1994", "2020"],
      correct: "1994"
	},
	{
      text: "2. Which Era of Live Drama wore clay masks?",
      name: "q2",
      options: ["Ancient Greece", "Elizabeth Era", "Asian Opera"],
      correct: "Ancient Greece"
    },
    {
      text: "3. What does the play Titoudao primarily represent in Singapore’s theatrical history?",
      name: "q3",
      options: [
        "The rise of modern Western musical theatre in Southeast Asia",
        "The resilience of traditional street opera (Wayang) performers and Singapore's vanishing cultural heritage",
        "A mythical legend set during the Ancient Greek era",
        "The transition from traditional theatre to television drama in the 1990s"
      ],
      correct: "The resilience of traditional street opera (Wayang) performers and Singapore's vanishing cultural heritage"
    }
  ];

function buildQuiz() {
	if (!quizContainer) return;
	let html = "";
	questions.forEach(function(q) {
		html += '<fieldset><legend>' + q.text + '</legend>';
		q.options.forEach(function(opt) {
		html += '<label><input type="radio" name="' + q.name + '" value="' + opt + '"> ' + opt + '</label><br>';
		});
		html += '</fieldset>';
	});

    quizContainer.innerHTML = html;
  }

function checkAns() {
    let score = 0;

	questions.forEach(function(q) {
      const checkedInput = document.querySelector("input[name='" + q.name + "']:checked");
      if (checkedInput && checkedInput.value === q.correct) {
        score++;
      }
    });

	if (scorebox) {
      scorebox.innerHTML = "Score: " + score + " / " + questions.length;
	}
}

buildQuiz();

if (btnSubmit) {
	btnSubmit.addEventListener("click", checkAns);
}
  /* game */
const gameBox = document.querySelector('#game-box');
const sprite = document.querySelector('#target-sprite');
const scoreDisplay = document.querySelector('#click-score');
const timerDisplay = document.querySelector('#click-timer');
const gameMsg = document.querySelector('#click-game-msg');
const btnStart = document.querySelector('#btnStartClickGame');


let gameScore = 0;
let gameTimeLeft = 20;
let isGameActive = false;
let gameTimer = null;

function moveSprite() {
	if (!gameBox || !sprite) return;

	const maxX = gameBox.clientWidth - 60;
	const maxY = gameBox.clientHeight - 60;

	const randomX = Math.floor(Math.random() * Math.max(10, maxX));
	const randomY = Math.floor(Math.random() * Math.max(10, maxY));

	sprite.style.left = randomX + 'px';
	sprite.style.top = randomY + 'px';
  }

function handleSpriteClick() {
	if (!isGameActive) return;

	const hitSound = document.getElementById('sound-hit');
	if (hitSound) {
		hitSound.currentTime = 0;
		hitSound.play();
	}

	gameScore++;
	if (scoreDisplay) scoreDisplay.textContent = gameScore;

	moveSprite();
}

function startClickGame() {
	gameScore = 0;
	gameTimeLeft = 20;
	isGameActive = true;

	if (scoreDisplay) scoreDisplay.textContent = gameScore;
	if (timerDisplay) timerDisplay.textContent = gameTimeLeft;

	if (gameMsg) gameMsg.classList.add('hidden');

	if (sprite) {
		sprite.classList.remove('hidden');
		moveSprite();
	}

	if (gameTimer) clearInterval(gameTimer);

	gameTimer = setInterval(function() {
		gameTimeLeft--;
		if (timerDisplay) timerDisplay.textContent = gameTimeLeft;

		if (gameTimeLeft <= 0) {
        endClickGame();
		}
    }, 1000);
  }

function endClickGame() {
	isGameActive = false;
	clearInterval(gameTimer);

	if (sprite) sprite.classList.add('hidden');

	if (gameMsg) {
    gameMsg.classList.remove('hidden');
    gameMsg.innerHTML = 
		'<h3 style="color: var(--cTerracota); margin-top: 0;">🎉 Time\'s Up!</h3>' +
		'<p>Final Score: <strong>' + gameScore + ' points</strong></p>';
    }
  }

	if (sprite) {
		sprite.addEventListener('click', handleSpriteClick);
	}

	if (btnStart) {
		btnStart.addEventListener('click', startClickGame);
	}

});