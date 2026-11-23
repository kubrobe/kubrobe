---
number: 101
title: SkillSwap
summary: A peer-to-peer skill exchange for university students. Teach what you know, earn time-bank credits, spend them learning something new. One backend serves a website and an Android app.
type: case-study
year: 2026
status: in-progress
featured: true
presentation: exhibit
video: skillswap
order: 1
role: Android app and website front end, in a team of three
timeline: 7–17 Nov 2026 (commit history)
stack:
  - Node.js
  - Express
  - PostgreSQL (Supabase)
  - HTML, CSS, JavaScript
  - Kotlin
  - Jetpack Compose
  - Room
  - WebRTC
links:
  - label: Website source
    href: https://github.com/kubrobe/skillswap
  - label: Android source
    href: https://github.com/kubrobe/skillswap-android
  - label: Live site (Render, free tier)
    href: https://skillswap-vqt7.onrender.com
gallery:
  - src: ../../assets/work/skillswap/web-home.jpg
    alt: SkillSwap website on a phone, home screen with time-bank credits, open swaps and two-way matches.
    caption: Web · Home
    group: Website
  - src: ../../assets/work/skillswap/web-lessons.jpg
    alt: SkillSwap website lessons page listing a lesson with weekly free times and a book button that costs one credit.
    caption: Web · Lessons
    group: Website
  - src: ../../assets/work/skillswap/android-browse.jpg
    alt: SkillSwap Android app browse screen with search, a live activity ticker, swipe to swap and perfect matches.
    caption: Android · Browse
    group: Android app
  - src: ../../assets/work/skillswap/android-lessons.jpg
    alt: SkillSwap Android app My lessons screen with upcoming lessons, check-in, video, calendar and AI plan buttons.
    caption: Android · My lessons
    group: Android app
  - src: ../../assets/work/skillswap/web-swaps.jpg
    alt: SkillSwap website swap page with status history and a review.
    caption: Web · Swaps
    group: Website
  - src: ../../assets/work/skillswap/android-teach.jpg
    alt: SkillSwap Android app screen for publishing a skill to teach.
    caption: Android · Teach
    group: Android app
gallerySource: Screenshots from the project repositories. Every person and record shown is demo data.
facts:
  - value: "27"
    label: Database tables
    note: Base schema plus 11 migrations
  - value: "80"
    label: API routes
    note: 34 of them serve the Android app
  - value: "80/80"
    label: Website tests passed
    note: Run 22 Nov 2026, PostgreSQL 16
  - value: "1"
    label: Backend, two clients
    note: Website and Android app
---

## Overview

SkillSwap is a skill exchange for students. A member lists a practical skill they can teach, says what they want to learn, and is matched with people who fit. Lessons last an hour and are paid in time-bank credits instead of money: teaching an hour earns one credit, learning an hour spends one.

There are two clients, a mobile-first website and a native Android app. They share one server and one database, so an account, a booking or a review made on one appears on the other.

It began as a university course project (a database-backed website for a Big Data course) and was extended for a university hackathon. This page is about the product and how it is built, not about the competition.

## Problem

Students know useful things that other students want to learn, such as a language, a tool or an instrument. Paid tutoring prices many of them out, and informal favours are hard to arrange and easy to abandon. SkillSwap tests a simple idea: if time is the currency, anyone who can teach something can afford to learn something.

## Solution

- **Time bank.** One hour taught is one credit earned. Every change is written to a credit ledger.
- **Matching.** Search by skill, category or city. Two-way matches, where each person can teach the other, come first.
- **Swaps and lessons.** A direct swap (my skill for yours) has its own request flow and status history. A lesson is a one-hour slot booked with a credit.
- **Trust.** A lesson only counts once the learner enters the teacher's 4-digit check-in code (shown as a QR code in the app). Only a finished lesson can be rated, and only once.
- **Meeting.** Lessons can happen in person or in a video room built into the product.

## Product experience

These journeys are covered by the website's automated API tests or are visible in the shipped screens:

1. **Join.** Register with email and password, or continue with Google or Telegram. Set a name, city, bio, time zone and weekly availability.
2. **Say what you offer and what you want.** Add skills from a shared catalogue in both directions.
3. **Find someone.** Browse and search. On Android, swipe through a card deck, where a two-way match shows "It's a swap!".
4. **Swap.** Send a request. It can be accepted, declined, cancelled or marked done, and each change is logged. After a completed swap each side can leave one review.
5. **Book a lesson.** Teachers publish free slots. A learner books one for a credit, checks in with the teacher's code, meets in person or by video, and rates the lesson.
6. **Stay in touch.** Messages, notifications and a learning workspace with milestones. Credits and notifications update live.

## Technical architecture

<figure class="kb-diagram" aria-labelledby="ss-arch-cap">
<svg class="d-wide" viewBox="0 0 640 380" role="img" aria-labelledby="ss-arch-title ss-arch-desc" fill="none" stroke="currentColor" stroke-width="1" font-family="var(--font-mono)" font-size="12">
<title id="ss-arch-title">SkillSwap architecture</title>
<desc id="ss-arch-desc">A website and an Android app both call one Express server over HTTPS. The website uses a session cookie and the /api routes; the app uses a bearer token and the /api/mobile routes. The server reads and writes a PostgreSQL database hosted on Supabase, pushes live updates with server-sent events, relays WebRTC signalling, and optionally uses MongoDB, a Telegram bot and Cloudflare TURN. Video and audio flow directly between the two devices.</desc>
<rect x="20" y="20" width="200" height="92"/>
<text x="32" y="42" fill="currentColor" stroke="none" font-weight="600">WEBSITE</text>
<text x="32" y="62" fill="currentColor" stroke="none" opacity=".75">HTML · CSS · vanilla JS</text>
<text x="32" y="78" fill="currentColor" stroke="none" opacity=".75">20 pages, no framework</text>
<text x="32" y="98" fill="currentColor" stroke="none" opacity=".75">session cookie</text>
<rect x="420" y="20" width="200" height="92"/>
<text x="432" y="42" fill="currentColor" stroke="none" font-weight="600">ANDROID APP</text>
<text x="432" y="62" fill="currentColor" stroke="none" opacity=".75">Compose · MVVM · Room</text>
<text x="432" y="78" fill="currentColor" stroke="none" opacity=".75">HttpURLConnection</text>
<text x="432" y="98" fill="currentColor" stroke="none" opacity=".75">bearer token (Keystore)</text>
<path pathLength="1" d="M120 112 V160 H250"/>
<path pathLength="1" d="M520 112 V160 H390"/>
<text x="128" y="140" fill="currentColor" stroke="none" opacity=".75">/api</text>
<text x="512" y="140" text-anchor="end" fill="currentColor" stroke="none" opacity=".75">/api/mobile</text>
<rect x="220" y="140" width="200" height="104" stroke-width="1.5"/>
<text x="232" y="162" fill="currentColor" stroke="none" font-weight="600">EXPRESS SERVER</text>
<text x="232" y="182" fill="currentColor" stroke="none" opacity=".75">Node.js on Render</text>
<text x="232" y="198" fill="currentColor" stroke="none" opacity=".75">80 routes · validation</text>
<text x="232" y="214" fill="currentColor" stroke="none" opacity=".75">SSE live events</text>
<text x="232" y="230" fill="currentColor" stroke="none" opacity=".75">WebRTC signalling relay</text>
<path pathLength="1" d="M320 244 V290"/>
<rect x="200" y="290" width="240" height="70"/>
<text x="212" y="312" fill="currentColor" stroke="none" font-weight="600">POSTGRESQL · SUPABASE</text>
<text x="212" y="332" fill="currentColor" stroke="none" opacity=".75">27 tables · auto migrations</text>
<text x="212" y="348" fill="currentColor" stroke="none" opacity=".75">transactions, row locks</text>
<rect x="470" y="200" width="150" height="76" stroke-dasharray="3 3"/>
<text x="482" y="220" fill="currentColor" stroke="none" font-weight="600">OPTIONAL</text>
<text x="482" y="238" fill="currentColor" stroke="none" opacity=".75">MongoDB stats</text>
<text x="482" y="252" fill="currentColor" stroke="none" opacity=".75">Telegram bot</text>
<text x="482" y="266" fill="currentColor" stroke="none" opacity=".75">TURN · Claude API</text>
<path d="M420 230 H470" stroke-dasharray="3 3"/>
<path d="M60 112 V340 H180" stroke-dasharray="1 3"/>
<text x="28" y="372" fill="currentColor" stroke="none" opacity=".75">video: device to device (WebRTC)</text>
</svg>
<svg class="d-tall" viewBox="0 0 340 476" role="img" aria-labelledby="ss-arch-title-t ss-arch-desc-t" fill="none" stroke="currentColor" stroke-width="1" font-family="var(--font-mono)" font-size="11.5">
<title id="ss-arch-title-t">SkillSwap architecture</title>
<desc id="ss-arch-desc-t">A website and an Android app both call one Express server. The website uses a session cookie and the /api routes; the app uses a bearer token and the /api/mobile routes. The server reads and writes a PostgreSQL database hosted on Supabase, pushes live updates with server-sent events and relays WebRTC signalling. It optionally uses MongoDB, a Telegram bot, TURN and an AI API. Video flows directly between devices.</desc>
<rect x="8" y="8" width="158" height="84"/>
<text x="18" y="28" fill="currentColor" stroke="none" font-weight="600">WEBSITE</text>
<text x="18" y="48" fill="currentColor" stroke="none" opacity=".75">HTML, CSS, JS</text>
<text x="18" y="64" fill="currentColor" stroke="none" opacity=".75">20 pages</text>
<text x="18" y="80" fill="currentColor" stroke="none" opacity=".75">session cookie</text>
<rect x="174" y="8" width="158" height="84"/>
<text x="184" y="28" fill="currentColor" stroke="none" font-weight="600">ANDROID APP</text>
<text x="184" y="48" fill="currentColor" stroke="none" opacity=".75">Compose, Room</text>
<text x="184" y="64" fill="currentColor" stroke="none" opacity=".75">MVVM</text>
<text x="184" y="80" fill="currentColor" stroke="none" opacity=".75">bearer token</text>
<path pathLength="1" d="M87 92 V132"/><path pathLength="1" d="M253 92 V132"/>
<text x="95" y="118" fill="currentColor" stroke="none" opacity=".75">/api</text>
<text x="245" y="118" text-anchor="end" fill="currentColor" stroke="none" opacity=".75">/api/mobile</text>
<rect x="8" y="132" width="324" height="104" stroke-width="1.5"/>
<text x="18" y="154" fill="currentColor" stroke="none" font-weight="600">EXPRESS SERVER</text>
<text x="18" y="174" fill="currentColor" stroke="none" opacity=".75">Node.js on Render</text>
<text x="18" y="190" fill="currentColor" stroke="none" opacity=".75">80 routes, input validated</text>
<text x="18" y="206" fill="currentColor" stroke="none" opacity=".75">Live events (SSE)</text>
<text x="18" y="222" fill="currentColor" stroke="none" opacity=".75">WebRTC signalling relay</text>
<path pathLength="1" d="M150 236 V288"/>
<rect x="8" y="288" width="290" height="72"/>
<text x="18" y="310" fill="currentColor" stroke="none" font-weight="600">POSTGRESQL · SUPABASE</text>
<text x="18" y="330" fill="currentColor" stroke="none" opacity=".75">27 tables, auto migrations</text>
<text x="18" y="346" fill="currentColor" stroke="none" opacity=".75">transactions, row locks</text>
<path d="M316 236 V384" stroke-dasharray="3 3"/>
<rect x="8" y="384" width="324" height="64" stroke-dasharray="3 3"/>
<text x="18" y="404" fill="currentColor" stroke="none" font-weight="600">OPTIONAL</text>
<text x="18" y="424" fill="currentColor" stroke="none" opacity=".75">MongoDB stats, Telegram bot</text>
<text x="18" y="440" fill="currentColor" stroke="none" opacity=".75">TURN, Claude API</text>
<text x="8" y="468" fill="currentColor" stroke="none" opacity=".75">Video: device to device (WebRTC)</text>
</svg>
<figcaption id="ss-arch-cap">Both clients talk only to the server. Neither one holds database credentials.</figcaption>
</figure>

### How the two clients stay in sync

Both clients use the same accounts and the same `sessions` table. The website sends the token in an httpOnly cookie, and the app sends it as a bearer header. The app downloads a full snapshot (`GET /api/mobile/sync`) and writes it to Room in one transaction. Every change goes to the server first, then the app syncs again. Server-sent events tell the app when something changed.

## Implementation

### Website

Plain HTML, CSS and JavaScript pages served as static files by the same Express process, with no front-end framework and self-hosted fonts and icons. A strict Content-Security-Policy (`default-src 'self'`) is possible because nothing loads from a third party.

### Backend

A single Express server exposes 80 routes. 79 of them are under `/api`, and 34 of those are under `/api/mobile` for the app. Every input is validated on the server and every query is parameterised. Live updates (credits, notifications, the activity feed) use server-sent events. Video lessons use WebRTC: media goes directly between the two devices, while the server only relays the connection messages and hands out short-lived TURN credentials.

### Database

PostgreSQL hosted on Supabase and reached with the standard `pg` driver over TLS with certificate checking. The schema has 27 tables: a base schema plus 11 SQL migrations that run automatically when the server starts. Booking is a single transaction that locks the slot row (`SELECT … FOR UPDATE`), so two phones can never book the same hour.

### Android

Compose screens read state from a ViewModel (`StateFlow`), which goes through a repository to a Room cache of 7 entities. The network layer uses Android's built-in `HttpURLConnection` and `org.json`, with no extra networking library. The session token is encrypted with AES-GCM using a key in the Android Keystore. Video calls are driven by a pure state machine (`CallMachine`) with a foreground service, so a call survives rotation and the app going to the background. The interface is available in English, Uzbek and Russian.

### Technology

| Area | Used |
|---|---|
| Web front end | HTML, CSS, vanilla JavaScript, server-sent events, WebRTC (browser) |
| Backend | Node.js 20+, Express 4, bcrypt, `pg`, google-auth-library, Telegram Bot API |
| Android | Kotlin, Jetpack Compose (Material 3), Navigation Compose, Room, coroutines, Stream's WebRTC build, Android Keystore |
| Data and hosting | PostgreSQL on Supabase, Render (free tier), optional MongoDB Atlas, Cloudflare TURN |
| Testing | Node's built-in test runner (80 API and rules tests), optional Playwright browser check, JUnit (66 Android unit tests, counted but not run for this page), GitHub Actions build for the app |

## My contribution

SkillSwap was built by a team of three. Both repositories document the split:

- **Me:** the Android app (architecture, Room, networking, screens, the three languages, unit tests and the release APK) and the website's front end.
- **Team leader:** the backend (server, database, API, live events, Telegram bot and server tests).
- **Designer:** the brand, screens, icon set and motion.

Both repositories live on my GitHub account, and the commit history was recorded there. Much of the code was written in AI-assisted sessions, and those commits are attributed to Claude in the history. The history does not record who on the team wrote which part, so the split above rests on the team's own documentation.

## Challenges and lessons

- **One backend, two kinds of client.** A browser and a phone authenticate differently. Keeping one `sessions` table and accepting the token as either a cookie or a bearer header avoided two parallel auth systems.
- **Correctness under concurrency.** Double booking is a real risk when two people tap at once. The fix is in the database: a transaction with a row lock, not a check in the app.
- **Offline cache vs one source of truth.** The app started with a local-first cache, then moved to "online-only, with Room as a read cache" so the server stays the single source of truth. The trade-off is that the app needs a connection.
- **Video behind proxies.** WebRTC needs signalling and NAT traversal. Signalling runs over plain HTTPS (server-sent events plus small POSTs), so it passes through Render's proxy. TURN credentials are requested for each room and expire after a few hours, so the long-term key never leaves the server. A "renegotiate" signal handles network changes.
- **Ordinary phones.** Several commits deal with smooth scrolling, avoiding needless redraws during live sync, and animations that respect the phone's animation-scale setting.

## Current status

Each line says what was checked, and how. "Tested" means I ran the website's own test suite on 22 Nov 2026 against a fresh PostgreSQL 16 database. "Not verified" means I have no evidence either way.

| Area | Status | Basis |
|---|---|---|
| Website features: accounts, profiles, skills, matching, swaps and reviews, lessons and the time bank, check-in, chat, notifications, mobile API, video-room access rules, Google and Telegram sign-in | Working, tested | 80 of 80 automated tests passed |
| Live deployment on Render | Not verified | Documented as deployed on Render's free tier with the database on Supabase. I could not reach it from my test environment, so I have not checked it |
| Android app | Not verified | Described by the team as mostly working against the same backend. I have not built or run it. 66 unit tests exist; I counted them but did not run them |
| Video lessons | Partial | Needs TURN configured on the server |
| AI matchmaker | Partial | Falls back to keyword matching without an API key |
| MongoDB statistics | Optional | Not needed for the core product |
| Email verification and password reset | Not done | Not in the code |
| Login rate limiting | Not done | Only chat and video signalling are rate-limited |
| Hosting | Limitation | The free tier sleeps when idle, so the first request can take up to a minute |

All accounts and records in the demo are fictional. There are no real users.

## Future direction

1. Rate-limit login and registration, then add email verification and password reset.
2. Replace the full-snapshot sync with incremental changes, so the app moves less data as the community grows.
3. Move hosting off a sleeping free tier before inviting real students.
4. Run a small pilot with real students and measure whether credits actually circulate.
