/*
  ============================================================
  FILE: app.js
  VERSION: 1.0
  DATE: 2026-06-11
  PURPOSE: Main application controller — orchestrates all modules,
           handles UI rendering, navigation, and application
           initialization for the Tara Air case study
  DEPLOYMENT: GitHub Pages + Cloudflare DNS
  AUTHOR: HF Training Module
  ============================================================
*/

// ============================================================
// MAIN APPLICATION CONTROLLER
// ============================================================
const App = (function() {
  'use strict';

  // Private variables
  let currentView = 'casestudy'; // 'casestudy', 'results'
  let timerInterval = null;
  let currentQuestionIndex = 0;
  let questionsData = [];

  // ============================================================
  // DOM ELEMENTS
  // ============================================================
  
  function getElements() {
    return {
      playerName: document.getElementById('player-name'),
      playerScore: document.getElementById('player-score'),
      timerDisplay: document.getElementById('timer-display'),
      mainContainer: document.getElementById('main-container'),
      progressFill: document.getElementById('progress-fill'),
      progressText: document.getElementById('progress-text')
    };
  }

  // ============================================================
  // UI RENDERING
  // ============================================================
  
  /**
   * Update player info display
   */
  function updatePlayerInfo() {
    const elements = getElements();
    const player = GameEngine.getCurrentPlayer();
    const totalScore = GameEngine.getTotalScore();
    const grade = window.calculateGrade ? window.calculateGrade(totalScore) : { icon: '📋', name: 'Attended' };
    
    if (elements.playerName) {
      elements.playerName.textContent = player ? player.name : 'Loading...';
    }
    if (elements.playerScore) {
      elements.playerScore.innerHTML = `Score: ${totalScore} pts <span style="font-size:0.65rem;">${grade.icon}</span>`;
    }
  }

  /**
   * Update progress bar
   */
  function updateProgress() {
    const elements = getElements();
    const percent = GameEngine.getProgressPercent();
    const answersCount = GameEngine.getAllAnswers().length;
    const totalQuestions = GameEngine.getAllQuestions().length;
    
    if (elements.progressFill) {
      elements.progressFill.style.width = `${percent}%`;
    }
    if (elements.progressText) {
      elements.progressText.textContent = `Questions: ${answersCount}/${totalQuestions} | Score: ${GameEngine.getTotalScore()}/100`;
    }
  }

  /**
   * Render current question
   */
  function renderCurrentQuestion() {
    const elements = getElements();
    const question = GameEngine.getCurrentQuestion();
    const currentIndex = GameEngine.getCurrentQuestionIndex();
    const totalQuestions = GameEngine.getAllQuestions().length;
    
    if (!question) {
      renderCompletionScreen();
      return;
    }
    
    const html = `
      <div class="progress-container" id="progress-container">
        <div class="progress-bar">
          <div class="progress-fill" id="progress-fill" style="width: ${GameEngine.getProgressPercent()}%;"></div>
        </div>
        <div class="progress-text" id="progress-text">Questions: ${GameEngine.getAllAnswers().length}/${totalQuestions} | Score: ${GameEngine.getTotalScore()}/100</div>
      </div>
      
      <div class="card-glass">
        <div class="card-header">
          <span class="card-title">Question ${currentIndex + 1}/${totalQuestions}</span>
          <span class="card-subtitle">${question.points} points</span>
        </div>
        <div style="margin-bottom: 0.5rem;">
          <span style="font-size: 0.7rem; color: var(--text-muted);">${Utils.escapeHtml(question.framework)}</span>
        </div>
        <div class="scenario-box" style="background: rgba(13, 27, 42, 0.5); border-left: 3px solid var(--accent-blue); padding: 1rem; border-radius: 12px; margin-bottom: 1.5rem; font-size: 0.85rem;">
          📖 ${Utils.escapeHtml(question.scenario)}
        </div>
        <div style="font-size: 1rem; font-weight: 500; margin-bottom: 1.5rem;">
          ${Utils.escapeHtml(question.question)}
        </div>
        
        <div class="options-grid" id="options-grid">
          ${question.options.map((opt, idx) => `
            <label class="option-radio">
              <input type="radio" name="answer" value="${idx}">
              <span class="option-text">${Utils.escapeHtml(opt)}</span>
            </label>
          `).join('')}
        </div>
        
        <button class="btn btn-primary btn-block" onclick="App.submitAnswer()">✓ SUBMIT ANSWER</button>
      </div>
    `;
    
    if (elements.mainContainer) {
      elements.mainContainer.innerHTML = html;
    }
    
    // Re-attach progress bar references
    const newProgressFill = document.getElementById('progress-fill');
    const newProgressText = document.getElementById('progress-text');
    if (newProgressFill) elements.progressFill = newProgressFill;
    if (newProgressText) elements.progressText = newProgressText;
  }

  /**
   * Render completion screen with results
   */
  function renderCompletionScreen() {
    const elements = getElements();
    const totalScore = GameEngine.getTotalScore();
    const grade = window.calculateGrade ? window.calculateGrade(totalScore) : { name: "Attended", class: "grade-attended", icon: "📋" };
    const answers = GameEngine.getAllAnswers();
    const questions = GameEngine.getAllQuestions();
    
    let resultsHtml = '';
    for (let i = 0; i < questions.length; i++) {
      const q = questions[i];
      const answer = answers.find(a => a.questionIndex === i);
      const isCorrect = answer ? answer.isCorrect : false;
      const userAnswer = answer ? answer.selectedText : 'Not answered';
      const pointsEarned = answer ? answer.pointsEarned : 0;
      
      resultsHtml += `
        <div style="background: rgba(13, 27, 42, 0.5); border-radius: 12px; padding: 1rem; margin-bottom: 0.75rem; border-left: 3px solid ${isCorrect ? '#2ec4b6' : '#e63946'};">
          <div style="font-weight: 600; margin-bottom: 0.3rem;">Q${i+1}: ${Utils.escapeHtml(q.framework)}</div>
          <div style="font-size: 0.8rem;">Your answer: ${Utils.escapeHtml(userAnswer)}</div>
          <div style="font-size: 0.75rem; color: ${isCorrect ? '#2ec4b6' : '#e63946'}; margin-top: 0.3rem;">
            ${isCorrect ? '✓ Correct' : '✗ Incorrect'} (${pointsEarned}/${q.points} points)
          </div>
          ${!isCorrect ? `<div style="font-size: 0.7rem; color: var(--text-muted); margin-top: 0.3rem;">Correct: ${Utils.escapeHtml(q.correctText)}</div>` : ''}
        </div>
      `;
    }
    
    const html = `
      <div class="card-glass" style="text-align: center;">
        <div style="width: 70px; height: 70px; background: rgba(46, 196, 182, 0.15); border: 2px solid #2ec4b6; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 1.5rem; font-size: 2rem;">✓</div>
        <h2 style="margin-bottom: 0.5rem;">Case Study Complete!</h2>
        <p style="color: var(--text-muted); margin-bottom: 1.5rem;">You have completed all 10 questions.</p>
        
        <div style="background: rgba(69, 179, 255, 0.1); padding: 1.5rem; border-radius: 16px; margin-bottom: 1.5rem;">
          <div style="font-size: 2rem; font-weight: 700; color: var(--accent-gold);">${totalScore} / 100 points</div>
          <div class="grade-badge ${grade.class}" style="font-size: 1rem; margin-top: 0.5rem; display: inline-block;">${grade.icon} ${grade.name}</div>
        </div>
        
        <div style="max-height: 400px; overflow-y: auto; margin-bottom: 1.5rem; text-align: left;">
          ${resultsHtml}
        </div>
        
        <div style="display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;">
          <button class="btn btn-primary" onclick="App.generateCertificate()">🏆 Download Certificate</button>
          <button class="btn btn-secondary" onclick="App.exitToJoin()">📋 Exit to Home</button>
        </div>
      </div>
    `;
    
    if (elements.mainContainer) {
      elements.mainContainer.innerHTML = html;
    }
  }

  // ============================================================
  // EVENT HANDLERS
  // ============================================================
  
  /**
   * Submit the current answer
   */
  function submitAnswer() {
    const selectedRadio = document.querySelector('input[name="answer"]:checked');
    if (!selectedRadio) {
      Utils.showNotification('⚠️ Please select an answer before submitting', 'error');
      return;
    }
    
    const selectedIndex = parseInt(selectedRadio.value);
    const result = GameEngine.submitAnswer(selectedIndex);
    
    if (result) {
      if (result.isCorrect) {
        Utils.showNotification(`✓ Correct! +${result.pointsEarned} points`, 'success');
      } else {
        Utils.showNotification(`✗ Incorrect. Correct answer: ${result.correctText}`, 'error');
      }
      
      updatePlayerInfo();
      updateProgress();
      
      if (result.completed) {
        GameEngine.endSession();
        renderCompletionScreen();
      } else {
        renderCurrentQuestion();
      }
    }
  }

  /**
   * Generate and download certificate
   */
  async function generateCertificate() {
    await GameEngine.generateCertificate();
  }

  /**
   * Exit to join page
   */
  function exitToJoin() {
    if (confirm('Exit this session? Your progress will be saved.')) {
      window.location.href = 'index.html';
    }
  }

  /**
   * Timer tick handler
   */
  function onTimerTick(minutes, seconds, timeLeft) {
    const elements = getElements();
    if (elements.timerDisplay) {
      elements.timerDisplay.textContent = `⏱️ ${minutes}:${seconds.toString().padStart(2, '0')}`;
    }
    
    // Warning at 5 minutes
    if (timeLeft <= 5 * 60 * 1000 && timeLeft > 4 * 60 * 1000) {
      Utils.showNotification('⚠️ 5 minutes remaining!', 'info');
    }
  }

  /**
   * Timer end handler
   */
  function onTimerEnd() {
    Utils.showNotification('⏰ Time is up! Session has ended.', 'error');
    renderCompletionScreen();
  }

  // ============================================================
  // INITIALIZATION
  // ============================================================
  
  /**
   * Initialize the application
   */
  function init() {
    // Load questions data
    if (window.QUESTIONS_DATA) {
      questionsData = window.QUESTIONS_DATA;
    }
    
    // Initialize game engine
    GameEngine.init(questionsData);
    
    // Update UI
    updatePlayerInfo();
    updateProgress();
    
    // Start timer
    GameEngine.startTimer(onTimerTick, onTimerEnd);
    
    // Render current question or completion screen
    if (GameEngine.isComplete()) {
      renderCompletionScreen();
    } else {
      renderCurrentQuestion();
    }
  }

  // ============================================================
  // PUBLIC API
  // ============================================================
  return {
    init: init,
    submitAnswer: submitAnswer,
    generateCertificate: generateCertificate,
    exitToJoin: exitToJoin,
    updatePlayerInfo: updatePlayerInfo,
    updateProgress: updateProgress
  };
})();

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
  App.init();
});

// Make App available globally
window.App = App; 
