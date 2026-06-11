/*
  ============================================================
  FILE: case-data.js
  VERSION: 1.0
  DATE: 2026-06-11
  PURPOSE: Case study data — contains all 10 questions with
           scenarios, options, correct answers, frameworks,
           and points for the Tara Air 9N-AET case study
  DEPLOYMENT: GitHub Pages + Cloudflare DNS
  AUTHOR: HF Training Module
  ============================================================
*/

// ============================================================
// CASE STUDY METADATA
// ============================================================
const CASE_METADATA = {
  id: "tara-air-9n-aet",
  title: "Tara Air 9N-AET",
  subtitle: "Pokhara → Jomsom • 29 May 2022",
  description: "DHC-6 Twin Otter • VFR into mountainous terrain • 22 fatalities",
  totalQuestions: 10,
  totalPoints: 100,
  passingScore: 70,
  timeLimitMinutes: 30
};

// ============================================================
// QUESTIONS DATA (10 Questions x 10 points = 100 points)
// ============================================================
const QUESTIONS_DATA = [
  {
    id: 1,
    framework: "Dirty Dozen (Gordon Dupont)",
    frameworkDescription: "Twelve human factors that contribute to errors in aviation maintenance and operations.",
    scenario: "On the CVR, the captain is heard expressing hesitation about the weather. However, a passenger or ground crew member is heard 'advising strongly to the PIC to conduct the flight.' The aircraft departs into deteriorating conditions.",
    question: "Which Dirty Dozen factor is most clearly at work in the decision to depart despite the captain's hesitation?",
    options: [
      "Pressure (commercial/passenger pressure to depart)",
      "Complacency (assuming weather will improve)",
      "Lack of assertiveness (captain not asserting authority)",
      "Norms ('everyone else is going')"
    ],
    correctIndex: 0,
    correctText: "Pressure (commercial/passenger pressure to depart)",
    explanation: "The captain was hesitant, but external pressure from a passenger or ground crew member overrode his professional judgment. This is a classic example of the Pressure factor in Dupont's Dirty Dozen.",
    points: 10,
    category: "Dirty Dozen"
  },
  {
    id: 2,
    framework: "Normalization of Deviance (Diane Vaughan / James Reason)",
    frameworkDescription: "The gradual acceptance of risky behavior as normal because 'nothing bad has happened yet.'",
    scenario: "The investigation revealed that the Terrain Awareness Warning System (TAWS) was intentionally inhibited. The aircraft had experienced 'nuisance warnings' due to incorrect calibration. Over time, the crew had gotten used to flying without TAWS. No one questioned its absence.",
    question: "This reflects which human factors concept?",
    options: [
      "Plan continuation bias",
      "Normalization of deviance",
      "Confirmation bias",
      "Sunk cost fallacy"
    ],
    correctIndex: 1,
    correctText: "Normalization of deviance",
    explanation: "Normalization of deviance occurs when unsafe practices become routine because they haven't yet caused an accident. Flying without TAWS had become normal at the airline.",
    points: 10,
    category: "Normalization of Deviance"
  },
  {
    id: 3,
    framework: "Authority Gradient (CRM)",
    frameworkDescription: "The balance of authority and voice between crew members; too steep prevents juniors from speaking up.",
    scenario: "The captain had 17,500 total flight hours. The First Officer had only 520 total hours. The investigation cited 'poor CRM (crew resource management)' as a contributing factor. The CVR revealed the captain assumed most cockpit duties.",
    question: "What authority gradient issue is most likely at play?",
    options: [
      "Gradient too flat — no clear decision-maker",
      "Gradient too steep — First Officer reluctant to challenge captain",
      "Gradient optimal — experience difference is appropriate",
      "Gradient reversed — First Officer dominating decisions"
    ],
    correctIndex: 1,
    correctText: "Gradient too steep — First Officer reluctant to challenge captain",
    explanation: "A steep authority gradient means junior crew members hesitate to speak up. With 17,500 vs 520 hours, the First Officer likely felt unable to challenge the captain's decisions.",
    points: 10,
    category: "Authority Gradient"
  },
  {
    id: 4,
    framework: "Situational Awareness (Mica Endsley)",
    frameworkDescription: "Three levels: Perception (what), Comprehension (meaning), Projection (what next).",
    scenario: "The aircraft 'inadvertently entered IMC conditions' while trying to stay visual (VFR). The crew failed to monitor the proper course. TAWS was inhibited. The aircraft flew into mountainous terrain without any apparent awareness of the impending impact.",
    question: "Which level of Endsley's Situational Awareness failed first?",
    options: [
      "Level 1 — Perception (did not see weather deteriorating)",
      "Level 2 — Comprehension (did not understand the risk)",
      "Level 3 — Projection (did not predict terrain impact)",
      "All three levels failed simultaneously"
    ],
    correctIndex: 2,
    correctText: "Level 3 — Projection (did not predict terrain impact)",
    explanation: "The crew saw the weather (Perception) and may have understood the risk (Comprehension), but they failed to project ahead — they did not realize they were on a collision course with terrain.",
    points: 10,
    category: "Situational Awareness"
  },
  {
    id: 5,
    framework: "Decision-Making Bias",
    frameworkDescription: "Cognitive biases that affect judgment under pressure.",
    scenario: "The captain expressed dissatisfaction with 'the behaviour of other pilots who conduct VFR flights in such unfavourable weather.' Yet he continued. The investigation cited 'flight crew's failure to follow SOP' and 'plan continuation' as factors.",
    question: "What bias best explains the captain's decision to continue despite his own expressed concerns?",
    options: [
      "Confirmation bias (seeking weather that confirms his plan)",
      "Anchoring (fixed on the original flight plan)",
      "Plan continuation bias (pressing on past decision point)",
      "Overconfidence (experience as armour)"
    ],
    correctIndex: 2,
    correctText: "Plan continuation bias (pressing on past decision point)",
    explanation: "Plan continuation bias is the tendency to continue with an original plan past the point where a rational decision to change or abort should be made. The captain saw others flying in bad weather and continued despite his own concerns.",
    points: 10,
    category: "Decision Bias"
  },
  {
    id: 6,
    framework: "Swiss Cheese Model (James Reason)",
    frameworkDescription: "Accidents occur when holes in multiple defensive layers align.",
    scenario: "TAWS inhibited + weather deteriorating + captain hesitant but continued + poor CRM + First Officer inexperienced + no weather second check.",
    question: "How many defensive layers failed in this accident?",
    options: [
      "2 layers",
      "3 layers",
      "4 layers",
      "5 or more layers"
    ],
    correctIndex: 3,
    correctText: "5 or more layers",
    explanation: "Multiple defensive layers failed: TAWS (technology), weather monitoring (procedures), CRM (teamwork), captain's judgment (human), First Officer's voice (authority gradient), and organizational oversight (management).",
    points: 10,
    category: "Swiss Cheese"
  },
  {
    id: 7,
    framework: "Psychological Safety (Amy Edmondson)",
    frameworkDescription: "The belief that one will not be punished for speaking up.",
    scenario: "The First Officer had only 520 hours. The captain had 17,500 hours. The First Officer did not speak up when the captain continued into bad weather.",
    question: "What does this indicate about psychological safety in the cockpit?",
    options: [
      "Excellent psychological safety",
      "The First Officer was incompetent",
      "Low psychological safety — speaking up felt dangerous",
      "Psychological safety is irrelevant"
    ],
    correctIndex: 2,
    correctText: "Low psychological safety — speaking up felt dangerous",
    explanation: "Psychological safety is the belief that you won't be punished for speaking up. In a steep authority gradient, the First Officer likely felt that challenging the captain would have negative consequences.",
    points: 10,
    category: "Psychological Safety"
  },
  {
    id: 8,
    framework: "Just Culture (Sidney Dekker)",
    frameworkDescription: "Distinguishes between human error, at-risk behavior, and reckless behavior.",
    scenario: "The captain made a poor decision to continue. He was not malicious. He was trying to complete the flight for waiting passengers.",
    question: "According to Dekker's Just Culture, how should this be classified?",
    options: [
      "Reckless behaviour — sanction",
      "Human error — console and fix the system",
      "At-risk behaviour — coach and fix perception of risk",
      "Criminal behaviour — prosecute"
    ],
    correctIndex: 2,
    correctText: "At-risk behaviour — coach and fix perception of risk",
    explanation: "At-risk behavior occurs when a person makes a choice believing the risk is acceptable. The captain thought he could complete the flight safely. The response is to coach and fix the perception of risk, not to punish.",
    points: 10,
    category: "Just Culture"
  },
  {
    id: 9,
    framework: "Drift into Failure (Sidney Dekker)",
    frameworkDescription: "Slow, incremental erosion of safety margins that becomes invisible from inside the system.",
    scenario: "TAWS had been inhibited for months. Weather minima had been gradually pushed. Crew had become comfortable with marginal VFR.",
    question: "What is this slow, invisible erosion of safety margins called?",
    options: [
      "Swiss Cheese",
      "Normalization of deviance",
      "Drift into failure",
      "Plan continuation"
    ],
    correctIndex: 2,
    correctText: "Drift into failure",
    explanation: "Drift into failure describes how small accommodations to pressure become normal over time. No one decides to be unsafe — the system slowly drifts. TAWS inhibition and marginal weather flying are examples of drift.",
    points: 10,
    category: "Drift"
  },
  {
    id: 10,
    framework: "The Accident Chain (Six Links)",
    frameworkDescription: "Executive decisions flow down through strategy, policy, resourcing, procedures, supervision, to frontline action.",
    scenario: "Route economics → Marginal weather policy → No TAWS → Inexperienced FO → Captain hesitation ignored → CFIT.",
    question: "Where in the chain from executive desk to frontline did the accident begin?",
    options: [
      "At the frontline (captain's decision)",
      "In the cockpit (poor CRM)",
      "At the executive desk (route economics, training, policy)",
      "At the regulator (CAAN oversight)"
    ],
    correctIndex: 2,
    correctText: "At the executive desk (route economics, training, policy)",
    explanation: "The accident report is written years before the accident. Executive decisions about route profitability, training budgets, and safety policies created the latent conditions that made the accident possible.",
    points: 10,
    category: "Six Links"
  }
];

// ============================================================
// HELPER FUNCTIONS
// ============================================================

/**
 * Get total possible points
 * @returns {number} Total points (100)
 */
function getTotalPoints() {
  return QUESTIONS_DATA.reduce((sum, q) => sum + q.points, 0);
}

/**
 * Get question by ID
 * @param {number} id - Question ID (1-10)
 * @returns {object|null} Question object or null
 */
function getQuestionById(id) {
  return QUESTIONS_DATA.find(q => q.id === id) || null;
}

/**
 * Validate an answer for a question
 * @param {number} questionId - Question ID
 * @param {number} selectedIndex - Selected option index (0-3)
 * @returns {object} Result with isCorrect, points, correctText
 */
function validateAnswer(questionId, selectedIndex) {
  const question = getQuestionById(questionId);
  if (!question) {
    return { isCorrect: false, points: 0, correctText: null };
  }
  
  const isCorrect = (selectedIndex === question.correctIndex);
  return {
    isCorrect: isCorrect,
    points: isCorrect ? question.points : 0,
    correctText: question.correctText,
    explanation: question.explanation
  };
}

/**
 * Calculate grade based on score
 * @param {number} score - Total score (0-100)
 * @returns {object} Grade object with name, class, icon
 */
function calculateGrade(score) {
  if (score >= 80) {
    return { name: "Completed with Distinction", class: "grade-distinction", icon: "🏆" };
  } else if (score >= 70) {
    return { name: "Completed", class: "grade-completed", icon: "✅" };
  } else {
    return { name: "Attended", class: "grade-attended", icon: "📋" };
  }
}

// ============================================================
// EXPORT (for browser environment)
// ============================================================
window.CASE_METADATA = CASE_METADATA;
window.QUESTIONS_DATA = QUESTIONS_DATA;
window.getTotalPoints = getTotalPoints;
window.getQuestionById = getQuestionById;
window.validateAnswer = validateAnswer;
window.calculateGrade = calculateGrade;
