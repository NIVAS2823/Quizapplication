

$(document).ready(function () {
    let questions = [];
    let currentQuestionIndex = 0;
    let score = 0;

    // Load questions from JSON file
    $.getJSON('questions.json', function (data) {
        questions = data;
        displayQuestion();
    }).fail(function() {
        alert("Error loading questions. Please check the questions.json file.");
    });

    function displayQuestion() {
        const questionContainer = $('#question-container');
        const optionsContainer = $('#options-container');
        const currentQuestion = questions[currentQuestionIndex];

        // Display the question
        questionContainer.text(currentQuestion.question);

        // Clear previous options
        optionsContainer.empty();

        // Display options
        currentQuestion.options.forEach(option => {
            optionsContainer.append(`<div class="option">${option}</div>`);
        });

        // Add click event to options
        $('.option').click(function () {
            const selectedOption = $(this).text();
            if (selectedOption === currentQuestion.answer) {
                score++;
                $(this).css("background-color", "#4CAF50"); // Green for correct
            } else {
                $(this).css("background-color", "#f44336"); // Red for incorrect
            }
            $('.option').off('click'); // Disable further clicks
            $('#next-button').show(); // Show next button
        });

        $('#next-button').hide(); // Hide next button initially
    }

    $('#next-button').click(function () {
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            displayQuestion();
            $(this).hide(); // Hide next button until an option is clicked
        } else {
            showScore();
        }
    });

    function showScore() {
        $('#quiz-container').html(`
            <h2>Your Score: ${score} out of ${questions.length}</h2>
            <button id="restart-button">Restart Quiz</button>
        `);

        $('#restart-button').click(function () {
            currentQuestionIndex = 0;
            score = 0;
            $('#quiz-container').html(`
                <h1>Quiz Application</h1>
                <div id="question-container"></div>
                <div id="options-container"></div>
                <button id="next-button" style="display: none;">Next Question</button>
                <div id="score-container"></div>
            `);
            displayQuestion();
        });
    }
});
