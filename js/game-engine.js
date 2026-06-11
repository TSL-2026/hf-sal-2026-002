/*
  ============================================================
  FILE: game-engine.js
  VERSION: 1.0
  DATE: 2026-06-11
  PURPOSE: Game engine — manages scoring, timer, answer submission,
           progress tracking, certificate generation, and
           session state management for the case study
  DEPLOYMENT: GitHub Pages + Cloudflare DNS
  AUTHOR: HF Training Module
  ============================================================
*/

// ============================================================
// GAME STATE
// ============================================================
const GameEngine = (function() {
  'use strict';

  // Private variables
  let currentPlayer = null;
  let answers = [];
  let currentQuestionIndex = 0;
  let sessionEndTime = null;
  let sessionTimer = null;
  let isSessionActive = true;
  let questionsData = [];

  // ============================================================
  // INITIALIZATION
  // ============================================================
  
  /**
   * Initialize the game engine
   * @param {Array} questions - Array of question objects
   */
  function init(questions) {
    questionsData = questions || window.QUESTIONS_DATA || [];
    loadPlayer();
    loadSavedAnswers();
    checkSessionStatus();
  }

  /**
   * Load current player from localStorage
   */
  function loadPlayer() {
    const saved = Utils.loadFromLocalStorage('hf-current-player');
    if (saved) {
      currentPlayer = saved;
    } else {
      window.location.href = 'index.html';
    }
  }

  /**
   * Load saved answers for current player
   */
  function loadSavedAnswers() {
    const saved = Utils.loadFromLocalStorage(`tara-answers-${currentPlayer.id}`);
    if (saved && Array.isArray(saved)) {
      answers = saved;
      currentQuestionIndex = answers.length;
    }
  }

  /**
   * Check session status and timer
   */
  function checkSessionStatus() {
    const savedEndTime = Utils.loadFromLocalStorage('hf-session-end-time');
    if (savedEndTime && Date.now() > parseInt(savedEndTime)) {
      isSessionActive = false;
    } else if (savedEndTime) {
      sessionEndTime = parseInt(savedEndTime);
      isSessionActive = true;
    } else {
      // Start new session
      sessionEndTime = Date.now() + (30 * 60 * 1000);
      Utils.saveToLocalStorage('hf-session-end-time', sessionEndTime);
      isSessionActive = true;
    }
  }

  // ============================================================
  // TIMER FUNCTIONS
  // ============================================================
  
  /**
   * Start the session timer
   * @param {Function} onTick - Callback on each tick with time remaining
   * @param {Function} onEnd - Callback when timer ends
   */
  function startTimer(onTick, onEnd) {
    if (sessionTimer) clearInterval(sessionTimer);
    
    sessionTimer = setInterval(() => {
      if (!isSessionActive) return;
      
      const now = Date.now();
      const timeLeft = sessionEndTime - now;
      
      if (timeLeft <= 0) {
        endSession(onEnd);
      } else {
        const minutes = Math.floor(timeLeft / 60000);
        const seconds = Math.floor((timeLeft % 60000) / 1000);
        if (onTick) onTick(minutes, seconds, timeLeft);
      }
    }, 1000);
  }

  /**
   * End the session
   * @param {Function} onEnd - Callback
   */
  function endSession(onEnd) {
    isSessionActive = false;
    if (sessionTimer) clearInterval(sessionTimer);
    if (onEnd) onEnd();
  }

  /**
   * Extend session by minutes
   * @param {number} minutes - Minutes to add
   */
  function extendSession(minutes = 5) {
    const newEndTime = Date.now() + (minutes * 60 * 1000);
    sessionEndTime = newEndTime;
    Utils.saveToLocalStorage('hf-session-end-time', newEndTime);
    isSessionActive = true;
    Utils.showNotification(`Session extended by ${minutes} minutes`, 'info');
  }

  // ============================================================
  // ANSWER HANDLING
  // ============================================================
  
  /**
   * Submit an answer for current question
   * @param {number} selectedIndex - Index of selected option (0-3)
   * @returns {object} Result with isCorrect, pointsEarned, correctText, explanation
   */
  function submitAnswer(selectedIndex) {
    if (!isSessionActive) {
      Utils.showNotification('Session has ended. Cannot submit more answers.', 'error');
      return null;
    }
    
    if (currentQuestionIndex >= questionsData.length) {
      Utils.showNotification('All questions already answered.', 'info');
      return null;
    }
    
    const currentQ = questionsData[currentQuestionIndex];
    const isCorrect = (selectedIndex === currentQ.correctIndex);
    const pointsEarned = isCorrect ? currentQ.points : 0;
    
    const answerRecord = {
      questionIndex: currentQuestionIndex,
      questionId: currentQ.id,
      framework: currentQ.framework,
      selectedIndex: selectedIndex,
      selectedText: currentQ.options[selectedIndex],
      isCorrect: isCorrect,
      pointsEarned: pointsEarned,
      correctText: currentQ.correctText,
      explanation: currentQ.explanation,
      timestamp: new Date().toISOString()
    };
    
    answers.push(answerRecord);
    saveAnswers();
    
    currentQuestionIndex++;
    
    return {
      isCorrect: isCorrect,
      pointsEarned: pointsEarned,
      correctText: currentQ.correctText,
      explanation: currentQ.explanation,
      totalScore: getTotalScore(),
      completed: isComplete()
    };
  }

  /**
   * Save answers to localStorage
   */
  function saveAnswers() {
    Utils.saveToLocalStorage(`tara-answers-${currentPlayer.id}`, answers);
    updatePlayerScore();
  }

  /**
   * Update player's total score in participant list
   */
  function updatePlayerScore() {
    const totalScore = getTotalScore();
    if (currentPlayer) {
      currentPlayer.score = totalScore;
      Utils.saveToLocalStorage('hf-current-player', currentPlayer);
      
      // Update in participants list
      let participants = Utils.loadFromLocalStorage('hf-participants', []);
      const index = participants.findIndex(p => p.id === currentPlayer.id);
      if (index !== -1) {
        participants[index].score = totalScore;
        Utils.saveToLocalStorage('hf-participants', participants);
      }
    }
  }

  // ============================================================
  // SCORING & PROGRESS
  // ============================================================
  
  /**
   * Get total score
   * @returns {number} Total points earned
   */
  function getTotalScore() {
    return answers.reduce((sum, a) => sum + a.pointsEarned, 0);
  }

  /**
   * Get current question index (0-based)
   * @returns {number}
   */
  function getCurrentQuestionIndex() {
    return currentQuestionIndex;
  }

  /**
   * Get current question object
   * @returns {object|null}
   */
  function getCurrentQuestion() {
    if (currentQuestionIndex < questionsData.length) {
      return questionsData[currentQuestionIndex];
    }
    return null;
  }

  /**
   * Check if all questions are answered
   * @returns {boolean}
   */
  function isComplete() {
    return answers.length >= questionsData.length;
  }

  /**
   * Get all answers
   * @returns {Array}
   */
  function getAllAnswers() {
    return [...answers];
  }

  /**
   * Get all questions data
   * @returns {Array}
   */
  function getAllQuestions() {
    return [...questionsData];
  }

  /**
   * Get progress percentage
   * @returns {number} 0-100
   */
  function getProgressPercent() {
    return (answers.length / questionsData.length) * 100;
  }

  // ============================================================
  // CERTIFICATE GENERATION
  // ============================================================
  
  /**
   * Generate PDF certificate
   * @returns {boolean} Success status
   */
  async function generateCertificate() {
    const totalScore = getTotalScore();
    const grade = window.calculateGrade ? window.calculateGrade(totalScore) : { name: "Completed", class: "grade-completed", icon: "✅" };
    
    // Check if jsPDF is loaded
    if (typeof window.jspdf === 'undefined') {
      Utils.showNotification('Certificate library not loaded. Please check internet connection.', 'error');
      return false;
    }
    
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF({ orientation: 'landscape', unit: 'mm', format: 'a4' });
    
    // Background
    doc.setFillColor(10, 42, 58);
    doc.rect(0, 0, 297, 210, 'F');
    
    // Decorative bars
    doc.setFillColor(69, 179, 255);
    doc.rect(0, 0, 297, 5, 'F');
    doc.rect(0, 205, 297, 5, 'F');
    
    // Borders
    doc.setDrawColor(255, 209, 102);
    doc.setLineWidth(1.5);
    doc.rect(10, 10, 277, 190);
    doc.setDrawColor(69, 179, 255);
    doc.setLineWidth(0.5);
    doc.rect(13, 13, 271, 184);
    
    // Title
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(26);
    doc.setTextColor(255, 209, 102);
    doc.text('CERTIFICATE OF COMPLETION', 148.5, 45, { align: 'center' });
    
    // Subtitle
    doc.setFontSize(10);
    doc.setTextColor(69, 179, 255);
    doc.text('Tara Air 9N-AET Human Factors Case Study', 148.5, 60, { align: 'center' });
    doc.text('NCAR Part 145 • CAAN Mandatory Training', 148.5, 68, { align: 'center' });
    
    // Recipient
    doc.setFontSize(14);
    doc.setTextColor(255, 255, 255);
    doc.text('This certificate is presented to', 148.5, 95, { align: 'center' });
    
    doc.setFontSize(24);
    doc.setTextColor(255, 209, 102);
    const playerName = currentPlayer ? currentPlayer.name : 'Participant';
    doc.text(playerName, 148.5, 115, { align: 'center' });
    
    // Completion text
    doc.setFontSize(11);
    doc.setTextColor(255, 255, 255);
    doc.text('for successful completion of the', 148.5, 135, { align: 'center' });
    
    doc.setFontSize(12);
    doc.setTextColor(69, 179, 255);
    doc.text('Tara Air 9N-AET Human Factors Case Study', 148.5, 148, { align: 'center' });
    
    // Grade and score
    doc.setFontSize(13);
    doc.setTextColor(255, 209, 102);
    const gradeText = grade.name === 'Completed with Distinction' ? 'DISTINCTION' : 
                      grade.name === 'Completed' ? 'COMPLETED' : 'ATTENDED';
    doc.text(`${gradeText} — ${totalScore}/100 points`, 148.5, 165, { align: 'center' });
    
    // Date
    doc.setFontSize(9);
    doc.setTextColor(123, 138, 155);
    const today = new Date().toLocaleDateString('en-GB');
    doc.text(`Issue Date: ${today}`, 148.5, 185, { align: 'center' });
    
    // Footer
    doc.setFontSize(7);
    doc.setTextColor(123, 138, 155);
    doc.text('Training is not completion. Application is completion.', 148.5, 198, { align: 'center' });
    
    // Save
    const safeName = playerName.replace(/[^a-z0-9]/gi, '_');
    doc.save(`Certificate_${safeName}.pdf`);
    
    return true;
  }

  // ============================================================
  // RESET FUNCTIONS
  // ============================================================
  
  /**
   * Reset game progress for current player
   */
  function resetProgress() {
    answers = [];
    currentQuestionIndex = 0;
    Utils.removeFromLocalStorage(`tara-answers-${currentPlayer.id}`);
    updatePlayerScore();
    Utils.showNotification('Progress reset successfully', 'info');
  }

  /**
   * Clear all session data
   */
  function clearAllData() {
    Utils.clearAllAppData();
    answers = [];
    currentQuestionIndex = 0;
    isSessionActive = true;
  }

  // ============================================================
  // GETTERS
  // ============================================================
  
  /**
   * Get current player
   * @returns {object}
   */
  function getCurrentPlayer() {
    return currentPlayer;
  }

  /**
   * Check if session is active
   * @returns {boolean}
   */
  function getIsSessionActive() {
    return isSessionActive;
  }

  /**
   * Get time remaining in milliseconds
   * @returns {number}
   */
  function getTimeRemaining() {
    if (!sessionEndTime) return 30 * 60 * 1000;
    return Math.max(0, sessionEndTime - Date.now());
  }

  // ============================================================
  // PUBLIC API
  // ============================================================
  return {
    init: init,
    startTimer: startTimer,
    endSession: endSession,
    extendSession: extendSession,
    submitAnswer: submitAnswer,
    getTotalScore: getTotalScore,
    getCurrentQuestionIndex: getCurrentQuestionIndex,
    getCurrentQuestion: getCurrentQuestion,
    isComplete: isComplete,
    getAllAnswers: getAllAnswers,
    getAllQuestions: getAllQuestions,
    getProgressPercent: getProgressPercent,
    generateCertificate: generateCertificate,
    resetProgress: resetProgress,
    clearAllData: clearAllData,
    getCurrentPlayer: getCurrentPlayer,
    getIsSessionActive: getIsSessionActive,
    getTimeRemaining: getTimeRemaining
  };
})();

// Make GameEngine available globally
window.GameEngine = GameEngine; 
