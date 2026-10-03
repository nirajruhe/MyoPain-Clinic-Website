# MyoPain Physiotherapy & Wellness Clinic — Website Owner Guide

Welcome to your newly upgraded clinic website! This guide is written in plain, beginner-friendly English to help you customize, preview, back up, and prepare your website for real patients.

---

## 1. What Was Created & Upgraded

1. **Original Files Preserved Safely**:
   - Before any changes were made, your original project files were backed up inside the [`backup-original`](file:///c:/Users/lenovo/Desktop/MyoPain-Clinic-Website/backup-original) folder.

2. **Complete Healthcare Design System**:
   - **Calming Palette**: Deep Forest Green (`#123832`), Sage Teal (`#2F6A5F`), Soft Mint (`#E8F3EE`), Warm Off-White (`#F8FAF7`), and High-Contrast Charcoal text.
   - **Typography**: Clean, professional Google Fonts (`Manrope` for modern headlines and `DM Sans` for high-legibility text).
   - **Accessibility**: Built to WCAG 2.2 AA standards with clear focus indicators, a "Skip to Content" link for keyboard users, and smooth scrolling that respects motion sensitivities.

3. **Complete Clinic Page Structure**:
   - **Top Announcement Bar**: Contact telephone call link + WhatsApp booking shortcut.
   - **Header & Navigation**: Clinic logo mark, links with active scroll tracking, and a mobile hamburger drawer.
   - **Hero Section**: Reassuring headline (*"Evidence-informed physiotherapy to help you move with confidence"*), key trust points, dual call-to-actions, and a clinic photo.
   - **Clinic Commitments Strip**: In-depth evaluation, collaborative planning, active recovery, and transparent milestones.
   - **6 Clinical Services**: Musculoskeletal Pain, Sports Injury Rehab, Spinal Care & Posture, Therapeutic Exercise, Post-Op Care, and Preventive Wellness.
   - **Conditions We Support**: Categorized symptom guide with an educational medical disclaimer.
   - **The MyoPain Approach**: Step-by-step philosophy with a high-resolution clinic consultation photo.
   - **Patient Journey**: Transparent 4-step roadmap (Inquiry $\rightarrow$ Assessment $\rightarrow$ Targeted Care $\rightarrow$ Review & Independence).
   - **Clinic Team Section**: Clinician cards with SVG photo placeholders, qualification badges, and council registration tags.
   - **Patient Reviews (Ethical Preview)**: Formatted cards with a clear notice that fake reviews are never invented.
   - **Interactive FAQ Accordion**: 8 essential patient questions (First visit, referrals, clothing, fees, etc.) with keyboard and screen reader support.
   - **Appointment Request & Contact Section**:
     - Clinic address, phone (click-to-call), email, and operating hours.
     - Form with live field validation (Name, Phone, Service, Date, Time Slot, Notes).
     - **WhatsApp Message Generator**: Formats a clean appointment request and handles both placeholder and live numbers gracefully.
   - **Medical Disclaimer**: Stating clearly that website content is educational and does not replace doctor/physiotherapist consultations.
   - **Footer**: Clinic recap, operating hours, quick links, and auto-updating copyright year.

---

## 2. File Directory Overview

- [`index.html`](file:///c:/Users/lenovo/Desktop/MyoPain-Clinic-Website/index.html) — The entire content and structure of your clinic homepage.
- [`style.css`](file:///c:/Users/lenovo/Desktop/MyoPain-Clinic-Website/style.css) — Colors, typography, spacing, layout, and mobile responsive rules.
- [`script.js`](file:///c:/Users/lenovo/Desktop/MyoPain-Clinic-Website/script.js) — Mobile menu, FAQ accordion, appointment validation, and WhatsApp draft logic.
- [`assets/images/`](file:///c:/Users/lenovo/Desktop/MyoPain-Clinic-Website/assets/images/) — Clinic photography and team placeholder avatars.
- [`assets/favicon.svg`](file:///c:/Users/lenovo/Desktop/MyoPain-Clinic-Website/assets/favicon.svg) — Browser tab icon.
- [`robots.txt`](file:///c:/Users/lenovo/Desktop/MyoPain-Clinic-Website/robots.txt) & [`sitemap.xml`](file:///c:/Users/lenovo/Desktop/MyoPain-Clinic-Website/sitemap.xml) — Search engine discovery files.
- [`backup-original/`](file:///c:/Users/lenovo/Desktop/MyoPain-Clinic-Website/backup-original/) — Untouched original backup copies.

---

## 3. How to Preview the Website on Your Computer

You do not need to install complex tools. You can view your website using either of these simple methods:

### Method A: Double-Click (Simplest)
1. Open File Explorer on your computer.
2. Navigate to: `c:\Users\lenovo\Desktop\MyoPain-Clinic-Website`
3. Double-click [`index.html`](file:///c:/Users/lenovo/Desktop/MyoPain-Clinic-Website/index.html).
4. It will immediately open in Google Chrome, Microsoft Edge, or your default browser.

### Method B: Local Server (Already Running)
A local server is currently running for you on:
👉 **[http://localhost:3000](http://localhost:3000)**

Simply click the link or paste `http://localhost:3000` into your web browser address bar.

---

## 4. Placeholders You Must Update for Real Clinic Launch

Open [`script.js`](file:///c:/Users/lenovo/Desktop/MyoPain-Clinic-Website/script.js) and [`index.html`](file:///c:/Users/lenovo/Desktop/MyoPain-Clinic-Website/index.html) in your editor (e.g. Antigravity or VS Code or Notepad) and update these items:

### In [`script.js`](file:///c:/Users/lenovo/Desktop/MyoPain-Clinic-Website/script.js) (Lines 11–26):
Look for the `CLINIC_CONFIG` box at the top:
```javascript
const CLINIC_CONFIG = {
  // 1. Enter your clinic's WhatsApp number with country code (e.g. "919876543210" for India)
  whatsappNumber: "91XXXXXXXXXX",

  // 2. Enter your clinic telephone number for voice calls
  phoneNumber: "+91 XXXXXXXXXX",

  // 3. Enter your clinic's official email
  email: "contact@myopainclinic.example.com",

  // 4. Enter your real clinic address
  address: "Replace with Clinic Street Address, Suite/Floor, Landmark, City, State, PIN"
};
```

### In [`index.html`](file:///c:/Users/lenovo/Desktop/MyoPain-Clinic-Website/index.html):
1. **Clinic Phone Number & Telephone Links**:
   - Search for `tel:+91XXXXXXXXXX` and replace with your clinic's telephone number.
2. **Clinic Street Address & Operating Hours**:
   - In the Appointment & Contact section, replace `[Replace with Clinic Street Address...]` with your real address.
3. **Team Members**:
   - In the `#team` section, replace `Dr. [Lead Clinician Name], PT`, `[Reg #XXXXX]`, and qualifications with your actual staff details.
4. **Photos**:
   - To use your real clinic photos, place your JPG or PNG files in the `assets/images/` folder and update the `src` attribute in `index.html`.
5. **Patient Testimonials**:
   - In the `#reviews` section, replace the bracketed placeholder text with real quotes from patients who have authorized you to share their feedback.

---

## 5. How to Make a Safe Backup Anytime

Before making future edits:
1. Open File Explorer.
2. Copy the entire `MyoPain-Clinic-Website` folder.
3. Paste it on your Desktop as `MyoPain-Clinic-Website-Backup-Date`.
4. If you ever make a mistake, you can simply restore from this copy!

---

## 6. How Deployment Works (When You Are Ready)

Because this website uses clean, standard HTML, CSS, and JavaScript, it can be hosted on any web server for free or very low cost:
- **Netlify or Vercel** (Drag-and-drop your folder for instant free hosting with free SSL security).
- **GitHub Pages** (Free hosting if your code is on GitHub).
- **Traditional Hosting** (cPanel / Hostinger / GoDaddy — just upload these files into your `public_html` directory).
- **Custom Domain**: You can buy a domain name (e.g., `myopainclinic.com`) and link it to your hosting in a few clicks.

*(No deployment or domain purchase was made during this upgrade. Everything is running locally on your computer).*
