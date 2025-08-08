const quizzes = {
  ICT: [
    {
      question: "What does 'CPU' stand for?",
      options: [
        "Personal Process Unit",
        "Central Processing Unit",
        "Computer Personal Unit",
      ],
      answer: "Central Processing Unit",
    },
    {
      question: "Which language is used to build websites?",
      options: ["Python", "HTML", "C++"],
      answer: "HTML",
    },
    {
      question: "What does 'RAM' stand for?",
      options: [
        "Random Access Memory",
        "Read Access Memory",
        "Rapid Access Memory",
      ],
      answer: "Random Access Memory",
    },
    {
      question: "Which of the following is an operating system?",
      options: ["Microsoft Word", "Windows", "Google Chrome"],
      answer: "Windows",
    },
    {
      question: "What does 'URL' stand for?",
      options: [
        "Universal Resource Locator",
        "Uniform Resource Locator",
        "United Resource Link",
      ],
      answer: "Uniform Resource Locator",
    },
    {
      question: "Which device is used to connect to the internet?",
      options: ["Printer", "Modem", "Scanner"],
      answer: "Modem",
    },
    {
      question: "What is the brain of a computer called?",
      options: ["Hard Drive", "Monitor", "Processor"],
      answer: "Processor",
    },
  ],
  Maths: [
    {
      question: "What is 8 × 7?",
      options: ["56", "64", "49"],
      answer: "56",
    },
    {
      question: "Solve: 12 ÷ 3",
      options: ["4", "3", "5"],
      answer: "4",
    },
    {
      question: "What is 15 + 27?",
      options: ["42", "41", "43"],
      answer: "42",
    },
    {
      question: "What is 9²?",
      options: ["81", "72", "90"],
      answer: "81",
    },
    {
      question: "Solve: 45 - 18",
      options: ["27", "25", "29"],
      answer: "27",
    },
    {
      question: "What is 6 × 9?",
      options: ["54", "56", "52"],
      answer: "54",
    },
    {
      question: "What is the square root of 64?",
      options: ["8", "6", "10"],
      answer: "8",
    },
  ],
  English: [
    {
      question: "Which word is a noun?",
      options: ["Quickly", "Beautiful", "Teacher"],
      answer: "Teacher",
    },
    {
      question: "What is the past tense of 'go'?",
      options: ["Gone", "Went", "Goes"],
      answer: "Went",
    },
    {
      question: "Which word is an adjective?",
      options: ["Run", "Happy", "Loudly"],
      answer: "Happy",
    },
    {
      question: "What is the plural of 'child'?",
      options: ["Childs", "Children", "Childes"],
      answer: "Children",
    },
    {
      question: "Which is a complete sentence?",
      options: ["Running fast", "The dog barks loudly", "In the morning"],
      answer: "The dog barks loudly",
    },
    {
      question: "What is a synonym for 'big'?",
      options: ["Small", "Large", "Tiny"],
      answer: "Large",
    },
    {
      question: "Which word is a verb?",
      options: ["Table", "Swimming", "Swim"],
      answer: "Swim",
    },
  ],
  Science: [
    {
      question: "Which planet is closest to the sun?",
      options: ["Mars", "Earth", "Mercury"],
      answer: "Mercury",
    },
    {
      question: "What do plants use to make their food?",
      options: ["Photosynthesis", "Respiration", "Digestion"],
      answer: "Photosynthesis",
    },
    {
      question: "How many bones are in the human body?",
      options: ["206", "208", "204"],
      answer: "206",
    },
    {
      question: "What gas do plants absorb from the atmosphere?",
      options: ["Oxygen", "Carbon Dioxide", "Nitrogen"],
      answer: "Carbon Dioxide",
    },
    {
      question: "What is the largest organ in the human body?",
      options: ["Heart", "Brain", "Skin"],
      answer: "Skin",
    },
    {
      question: "Which force keeps us on the ground?",
      options: ["Magnetism", "Gravity", "Friction"],
      answer: "Gravity",
    },
    {
      question: "What is the chemical symbol for water?",
      options: ["H2O", "CO2", "O2"],
      answer: "H2O",
    },
  ],
};

let selectedSubject = "ICT";
let currentIndex = 0;
let score = 0;

function selectSubject(subject) {
  selectedSubject = subject;
  currentIndex = 0;
  score = 0;

  console.log(`Selected subject: ${subject}, Score reset to: ${score}`);

  // Update active button
  document
    .querySelectorAll(".subject-btn")
    .forEach((btn) => btn.classList.remove("active"));
  document.getElementById("btn-" + subject).classList.add("active");

  // Update subject display
  document.getElementById("quizSubject").textContent = subject;

  loadNotes(); // ✅ Load saved notes when subject changes
  loadQuiz();
}

function loadQuiz() {
  const quizContainer = document.getElementById("quizContainer");
  const currentQuizSet = quizzes[selectedSubject];
  if (!quizContainer || !currentQuizSet) {
    console.error("Quiz container or quiz set not found!");
    return;
  }

  const currentQuiz = currentQuizSet[currentIndex];
  console.log(`Loading question ${currentIndex + 1}:`, currentQuiz.question);

  quizContainer.innerHTML = `
    <h3 class="quiz-question">${currentQuiz.question}</h3>
    <ul class="quiz-options">
      ${currentQuiz.options
        .map(
          (option, index) => `
        <li class="quiz-option">
          <label>
            <input type="radio" name="option" id="opt${index}" value="${option}">
            ${option}
          </label>
        </li>
      `
        )
        .join("")}
    </ul>
    <button onclick="submitAnswer()" class="submit-btn">Submit Answer</button>
  `;
}

function submitAnswer() {
  const selected = document.querySelector('input[name="option"]:checked');
  if (!selected) {
    alert("Please select an answer.");
    return;
  }

  const answer = selected.value;
  const correctAnswer = quizzes[selectedSubject][currentIndex].answer;

  console.log(`Selected: "${answer}", Correct: "${correctAnswer}"`);

  if (answer === correctAnswer) {
    score++;
    console.log(`Correct! Score is now: ${score}`);
  } else {
    console.log(`Incorrect. Score remains: ${score}`);
  }

  currentIndex++;
  console.log(`Moving to question ${currentIndex + 1}`);

  if (currentIndex < quizzes[selectedSubject].length) {
    loadQuiz();
  } else {
    console.log(
      `Quiz completed! Final score: ${score}/${quizzes[selectedSubject].length}`
    );
    showResult();
  }
}

function showResult() {
  const quizContainer = document.getElementById("quizContainer");
  const totalQuestions = quizzes[selectedSubject].length;
  const percentage = Math.round((score / totalQuestions) * 100);
  const emoji = percentage >= 80 ? "🎉" : percentage >= 60 ? "👍" : "📚";

  console.log(`Showing results: ${score}/${totalQuestions} (${percentage}%)`);

  quizContainer.innerHTML = `
    <div style="text-align: center; padding: 20px;">
      <h3 style="color: #667eea; margin-bottom: 20px;">${emoji} ${selectedSubject} Quiz Completed!</h3>
      <div style="font-size: 2rem; margin: 20px 0; color: #333;">
        ${score} / ${totalQuestions}
      </div>
      <div style="font-size: 1.2rem; margin-bottom: 30px; color: #666;">
        Score: ${percentage}%
      </div>
      <button onclick="restartQuiz()" class="submit-btn">🔄 Try Again</button>
    </div>
  `;
}

function restartQuiz() {
  currentIndex = 0;
  score = 0;
  console.log("Quiz restarted - Score reset to 0");
  loadQuiz();
}

// ===== NOTES LOGIC =====

function saveNotes() {
  const notes = document.getElementById("studentNotes").value;
  localStorage.setItem("notes_" + selectedSubject, notes);
  document.getElementById("noteStatus").textContent =
    "✅ Notes saved for " + selectedSubject;
}

function loadNotes() {
  const saved = localStorage.getItem("notes_" + selectedSubject);
  document.getElementById("studentNotes").value = saved || "";
  document.getElementById("noteStatus").textContent = "";
}
