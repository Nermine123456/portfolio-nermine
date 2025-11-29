// Réponses correctes du quizz
const correctAnswers = {
    q1: 'a',
    q2: 'b',
    q3: 'b',
    q4: 'c',
    q5: 'b',
    q6: 'a',
    q7: 'a',
    q8: 'd',
    q9: 'a',
    q10: 'a',
    q11: 'b',
    q12: 'b',
    q13: 'a',
    q14: 'a',
    q15: 'd'
};

// Gestion de la soumission du formulaire
document.getElementById('quizz-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    let score = 0;
    const totalQuestions = 15;
    const userAnswers = {};
    const correctAnswersList = [];
    
    // Récupérer les réponses de l'utilisateur
    for (let i = 1; i <= totalQuestions; i++) {
        const questionName = 'q' + i;
        const selectedAnswer = document.querySelector(`input[name="${questionName}"]:checked`);
        
        if (selectedAnswer) {
            userAnswers[questionName] = selectedAnswer.value;
            
            // Vérifier si la réponse est correcte
            if (selectedAnswer.value === correctAnswers[questionName]) {
                score++;
            }
        }
        
        // Afficher la réponse correcte pour chaque question
        const correctAnswerElement = document.querySelector(`input[name="${questionName}"][value="${correctAnswers[questionName]}"]`);
        if (correctAnswerElement) {
            const questionItem = correctAnswerElement.closest('.question-item');
            const correctAnswerText = questionItem.querySelector('.correct-answer');
            if (correctAnswerText) {
                correctAnswerText.style.display = 'block';
            }
            
            // Ajouter à la liste des réponses correctes
            const questionText = questionItem.querySelector('h3').textContent;
            correctAnswersList.push({
                question: questionText,
                answer: correctAnswerElement.parentElement.textContent.trim()
            });
        }
    }
    
    // Calculer le pourcentage
    const percentage = Math.round((score / totalQuestions) * 100);
    
    // Afficher les résultats
    displayResults(score, totalQuestions, percentage, correctAnswersList);
    
    // Faire défiler vers les résultats
    document.getElementById('results').scrollIntoView({ behavior: 'smooth' });
});

// Fonction pour afficher les résultats
function displayResults(score, total, percentage, correctAnswersList) {
    const resultsDiv = document.getElementById('results');
    const scoreSpan = document.getElementById('score');
    const percentageSpan = document.getElementById('percentage');
    const correctAnswersListUl = document.getElementById('correct-answers-list');
    
    // Afficher le score
    scoreSpan.textContent = score;
    percentageSpan.textContent = percentage;
    
    // Afficher la liste des réponses correctes
    correctAnswersListUl.innerHTML = '';
    correctAnswersList.forEach((item, index) => {
        const li = document.createElement('li');
        li.innerHTML = `<strong>Question ${index + 1}:</strong> ${item.question}<br>
                        <strong>Réponse correcte:</strong> ${item.answer}`;
        correctAnswersListUl.appendChild(li);
    });
    
    // Afficher la section des résultats
    resultsDiv.style.display = 'block';
    
    // Ajouter une classe pour le style selon le score
    if (percentage >= 80) {
        resultsDiv.className = 'results success';
    } else if (percentage >= 60) {
        resultsDiv.className = 'results warning';
    } else {
        resultsDiv.className = 'results error';
    }
}

// Gestion du bouton de réinitialisation
document.querySelector('.btn-reset').addEventListener('click', function() {
    // Réinitialiser le formulaire
    document.getElementById('quizz-form').reset();
    
    // Masquer les réponses correctes
    const correctAnswers = document.querySelectorAll('.correct-answer');
    correctAnswers.forEach(answer => {
        answer.style.display = 'none';
    });
    
    // Masquer les résultats
    document.getElementById('results').style.display = 'none';
    
    // Réinitialiser les classes
    document.getElementById('results').className = 'results';
});

