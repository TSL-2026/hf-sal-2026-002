/*
  ============================================================
  FILE: utils.js
  VERSION: 1.0
  DATE: 2026-06-11
  PURPOSE: Utility functions — shared helper functions used across
           all modules including HTML escaping, localStorage management,
           ID generation, flash notifications, and PWA detection
  DEPLOYMENT: GitHub Pages + Cloudflare DNS
  AUTHOR: HF Training Module
  ============================================================
*/

// ============================================================
// NAMESPACE
// ============================================================
const Utils = (function() {
  'use strict';

  // ============================================================
  // STRING UTILITIES
  // ============================================================
  
  /**
   * Escape HTML special characters to prevent XSS attacks
   * @param {string} str - Input string
   * @returns {string} Escaped string
   */
  function escapeHtml(str) {
    if (!str) return '';
    return str.replace(/[&<>]/g, function(m) {
      if (m === '&') return '&amp;';
      if (m === '<') return '&lt;';
      if (m === '>') return '&gt;';
      return m;
    });
  }

  /**
   * Truncate text to specified length and add ellipsis
   * @param {string} str - Input string
   * @param {number} length - Maximum length (default: 100)
   * @returns {string} Truncated string
   */
  function truncate(str, length = 100) {
    if (!str) return '';
    if (str.length <= length) return str;
    return str.substring(0, length) + '...';
  }

  /**
   * Capitalize first letter of each word
   * @param {string} str - Input string
   * @returns {string} Capitalized string
   */
  function capitalizeWords(str) {
    if (!str) return '';
    return str.split(' ').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    ).join(' ');
  }

  // ============================================================
  // STORAGE UTILITIES
  // ============================================================
  
  /**
   * Save data to localStorage
   * @param {string} key - Storage key
   * @param {any} data - Data to store (will be JSON.stringify'd)
   */
  function saveToLocalStorage(key, data) {
    try {
      localStorage.setItem(key, JSON.stringify(data));
      return true;
    } catch (e) {
      console.error('Error saving to localStorage:', e);
      return false;
    }
  }

  /**
   * Load data from localStorage
   * @param {string} key - Storage key
   * @param {any} defaultValue - Default value if key doesn't exist
   * @returns {any} Parsed data or defaultValue
   */
  function loadFromLocalStorage(key, defaultValue = null) {
    try {
      const saved = localStorage.getItem(key);
      if (saved) {
        return JSON.parse(saved);
      }
      return defaultValue;
    } catch (e) {
      console.error('Error loading from localStorage:', e);
      return defaultValue;
    }
  }

  /**
   * Remove data from localStorage
   * @param {string} key - Storage key
   */
  function removeFromLocalStorage(key) {
    localStorage.removeItem(key);
  }

  /**
   * Clear all app-related data from localStorage
   */
  function clearAllAppData() {
    const keys = [
      'hf-current-player',
      'hf-participants',
      'hf-session-end-time',
      'hf-announcement'
    ];
    
    // Also clear all answer keys
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && (key.startsWith('tara-answers-') || key.startsWith('case-progress-'))) {
        keys.push(key);
      }
    }
    
    keys.forEach(key => localStorage.removeItem(key));
  }

  // ============================================================
  // ID GENERATION
  // ============================================================
  
  /**
   * Generate a unique ID
   * @returns {string} Unique timestamp-random string
   */
  function generateId() {
    return Date.now() + '-' + Math.random().toString(36).substr(2, 8);
  }

  /**
   * Generate a short session ID
   * @returns {string} Short session ID (e.g., "HF-7B3D")
   */
  function generateSessionId() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = 'HF-';
    for (let i = 0; i < 4; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }

  // ============================================================
  // UI UTILITIES
  // ============================================================
  
  /**
   * Show a floating notification message
   * @param {string} message - Message to display
   * @param {string} type - Message type: 'success', 'error', 'info' (default: 'success')
   */
  function showNotification(message, type = 'success') {
    const colors = {
      success: 'rgba(46, 196, 182, 0.9)',
      error: 'rgba(230, 57, 70, 0.9)',
      info: 'rgba(69, 179, 255, 0.9)'
    };
    
    const div = document.createElement('div');
    div.className = 'success-message';
    div.style.background = colors[type] || colors.success;
    div.textContent = message;
    document.body.appendChild(div);
    
    setTimeout(() => {
      if (div && div.remove) div.remove();
    }, 3000);
  }

  /**
   * Show a loading overlay (optional)
   * @param {boolean} show - Show or hide loading
   * @param {string} message - Loading message
   */
  function showLoading(show, message = 'Loading...') {
    let overlay = document.getElementById('loading-overlay');
    
    if (show) {
      if (!overlay) {
        overlay = document.createElement('div');
        overlay.id = 'loading-overlay';
        overlay.style.cssText = `
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.8);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 9999;
          flex-direction: column;
          gap: 1rem;
        `;
        overlay.innerHTML = `
          <div style="width: 50px; height: 50px; border: 3px solid var(--border-glow); border-top-color: var(--accent-blue); border-radius: 50%; animation: spin 1s linear infinite;"></div>
          <div style="color: var(--text-white);">${message}</div>
        `;
        document.body.appendChild(overlay);
        
        // Add spin animation if not exists
        if (!document.querySelector('#spin-style')) {
          const style = document.createElement('style');
          style.id = 'spin-style';
          style.textContent = '@keyframes spin { to { transform: rotate(360deg); } }';
          document.head.appendChild(style);
        }
      } else {
        const msgDiv = overlay.querySelector('div:last-child');
        if (msgDiv) msgDiv.textContent = message;
        overlay.style.display = 'flex';
      }
    } else {
      if (overlay) {
        overlay.style.display = 'none';
      }
    }
  }

  // ============================================================
  // DATE UTILITIES
  // ============================================================
  
  /**
   * Format date to local string
   * @param {Date|string} date - Date object or ISO string
   * @returns {string} Formatted date (DD/MM/YYYY)
   */
  function formatDate(date) {
    const d = new Date(date);
    return d.toLocaleDateString('en-GB');
  }

  /**
   * Format time remaining from milliseconds
   * @param {number} ms - Milliseconds remaining
   * @returns {string} Formatted time (MM:SS)
   */
  function formatTimeRemaining(ms) {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  }

  // ============================================================
  // PWA UTILITIES
  // ============================================================
  
  /**
   * Check if app is installed as PWA
   * @returns {boolean} True if in standalone mode (installed)
   */
  function isPWAInstalled() {
    return window.matchMedia('(display-mode: standalone)').matches || 
           window.navigator.standalone === true;
  }

  /**
   * Check if browser is online
   * @returns {boolean}
   */
  function isOnline() {
    return navigator.onLine;
  }

  /**
   * Show offline warning
   */
  function checkOnlineStatus() {
    if (!isOnline()) {
      showNotification('⚠️ You are offline. Some features may be limited.', 'info');
    }
  }

  // ============================================================
  // DEEP CLONE
  // ============================================================
  
  /**
   * Deep clone an object
   * @param {object} obj - Object to clone
   * @returns {object} Cloned object
   */
  function deepClone(obj) {
    return JSON.parse(JSON.stringify(obj));
  }

  // ============================================================
  // PUBLIC API
  // ============================================================
  return {
    escapeHtml: escapeHtml,
    truncate: truncate,
    capitalizeWords: capitalizeWords,
    saveToLocalStorage: saveToLocalStorage,
    loadFromLocalStorage: loadFromLocalStorage,
    removeFromLocalStorage: removeFromLocalStorage,
    clearAllAppData: clearAllAppData,
    generateId: generateId,
    generateSessionId: generateSessionId,
    showNotification: showNotification,
    showLoading: showLoading,
    formatDate: formatDate,
    formatTimeRemaining: formatTimeRemaining,
    isPWAInstalled: isPWAInstalled,
    isOnline: isOnline,
    checkOnlineStatus: checkOnlineStatus,
    deepClone: deepClone
  };
})();

// Make Utils available globally
window.Utils = Utils; 
