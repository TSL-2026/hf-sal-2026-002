<!--
  ============================================================
  FILE: README.md
  VERSION: 1.0
  DATE: 2026-06-11
  PURPOSE: Documentation — provides overview, deployment instructions,
           and technical details for the case study application
  DEPLOYMENT: GitHub Pages + Cloudflare DNS
  AUTHOR: HF Training Module
  ============================================================
-->

# Tara Air 9N-AET | Human Factors Case Study

## Overview

This interactive web application delivers a **human factors case study** based on the Tara Air flight 9N-AET accident (Pokhara → Jomsom, 29 May 2022). It is designed for **CAAN mandatory training** for newly appointed airline executives and accountable managers.

### Key Features

| Feature | Description |
|---------|-------------|
| **10 Questions** | 10 multiple-choice questions, 10 points each (100 total) |
| **30-Minute Timer** | Automatic session end after time expires |
| **Certificate Generation** | PDF certificate with grade (Distinction/Completed/Attended) |
| **Facilitator Dashboard** | Real-time participant tracking, announcements, CSV export |
| **Offline Support** | PWA with service worker — works offline after first load |
| **Mobile Responsive** | Works on desktop, tablet, and mobile devices |

---

## Grading Scale

| Score | Grade | Requirement |
|-------|-------|-------------|
| 80-100 | Distinction | Certificate with Distinction |
| 70-79 | Completed | Standard Certificate |
| 0-69 | Attended | Attendance Confirmation |

**Passing score:** 70 points (70%)

---

## File Structure
hf-tara-air-2026/
│
├── index.html # Landing page — name input
├── casestudy.html # Interactive case study (10 questions)
├── facilitator.html # Facilitator dashboard
├── facilitator-login.html # Simple login for facilitator
├── manifest.json # PWA manifest
├── sw.js # Service worker for offline
├── offline.html # Offline fallback page
├── README.md # This file
│
├── assets/
│ ├── icons/ # PWA icons (72px - 512px)
│ ├── images/ # Route map, terrain, weather images
│ └── screenshots/ # App store screenshots
│
├── css/
│ └── styles.css # Global styles
│
├── js/
│ ├── app.js # Main application controller
│ ├── case-data.js # Case study questions data
│ ├── game-engine.js # Scoring, timer, answer handling
│ └── utils.js # Helper functions
│
└── tools/ # Future utilities


---

## Deployment Instructions

### Option 1: GitHub Pages (Recommended)

1. Create a new GitHub repository (e.g., `tara-air-hf-case-study`)
2. Upload all files from `hf-tara-air-2026/` folder to the repository
3. Go to **Settings → Pages**
4. Set branch to `main` and folder to `/ (root)`
5. Click **Save**
6. Your site will be available at: `https://[your-username].github.io/[repository-name]/`

### Option 2: Custom Domain with Cloudflare

1. Purchase a domain (e.g., `training.yourcompany.com`)
2. In GitHub Pages, enter your custom domain in **Settings → Pages → Custom domain**
3. Configure Cloudflare DNS with the following records:

| Type | Name | Value |
|------|------|-------|
| A | training | 185.199.108.153 |
| A | training | 185.199.109.153 |
| A | training | 185.199.110.153 |
| A | training | 185.199.111.153 |
| CNAME | www | [your-username].github.io |

4. Enable **SSL/TLS** → **Full (Strict)**
5. Enable **Always Use HTTPS**

### Option 3: Local Testing

```bash
# Using Python 3
python -m http.server 8000

# Using Node.js (npx)
npx serve .

# Then open http://localhost:8000

Facilitator Setup
Default Password
The facilitator login password is: tara2026

To change the password:

Open facilitator-login.html

Find line: const FACILITATOR_PASSWORD = "tara2026";

Change to your desired password

Participant Access
Participants access index.html (or your custom domain root). They:

Enter their name

Click Start Case Study

Answer 10 questions within 30 minutes

Download certificate upon completion

Data Storage
All data is stored in the participant's browser using localStorage:

Key	Purpose
hf-current-player	Current participant data
hf-participants	List of all participants
tara-answers-{playerId}	Individual answers and scores
hf-session-end-time	30-minute timer expiration
hf-announcement	Facilitator announcements
No server-side database is required. All data is client-side.

CAAN Compliance
This training satisfies:

CAR Section 9: Mandatory Human Factors training for newly appointed airline executives

Post-Tara Air directive (2022): Executive-level decision-making and safety culture module

NCAR Part 145: Human Factors training requirements

Troubleshooting
Issue	Solution
Certificate not downloading	Check if jsPDF library loaded (internet required)
Timer not showing	Clear browser cache and reload
Progress lost	Ensure localStorage is not cleared by browser settings
Offline mode not working	Load the page once while online to cache assets
Technical Requirements
Requirement	Specification
Browser	Chrome, Edge, Firefox, Safari (latest 2 versions)
JavaScript	Enabled
localStorage	Enabled (for progress saving)
Internet	Required for first load and certificate generation
Version History
Version	Date	Changes
1.0	2026-06-11	Initial release — 10 questions, 100 points, facilitator dashboard
Support
For technical issues or questions:

Email: training@[yourdomain].com

Facilitator Contact: [Your Name / Department]

License
This application is for internal training purposes only. Not for commercial distribution.

Credits
Developer: HF Training Module

Subject Matter: Tara Air 9N-AET Investigation Report (2022)

Frameworks: Reason, Dekker, Edmondson, Endsley, Dupont, Conklin, Kahneman

Training is not completion. Application is completion.

"# hf-sal-2026-002" 
