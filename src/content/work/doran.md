---
number: 102
title: Doran
summary: An Android app for learning Korean, from Hangul to everyday exchange-student life. It runs fully offline, including pronunciation scoring.
type: app
year: 2026
status: in-progress
featured: true
order: 2
role: Solo project
timeline: Started 19 Nov 2026 (commit history)
stack:
  - Kotlin
  - Jetpack Compose
  - sherpa-onnx (offline speech recognition)
  - Python (course and audio tooling)
  - GitHub Actions
links:
  - label: Source
    href: https://github.com/kubrobe/doran
gallery:
  - src: ../../assets/work/doran/learn-path.png
    alt: Doran lesson path showing Hangul unit 1, Vowels 1, with a start node and locked lessons below.
    caption: Lesson path
  - src: ../../assets/work/doran/match-pairs.png
    alt: Doran exercise asking the learner to tap matching pairs of Korean vowels and their romanisation.
    caption: Match pairs
  - src: ../../assets/work/doran/build-korean.png
    alt: Doran exercise where the learner builds a Korean sentence from a word bank.
    caption: Build the sentence
presentation: devices
gallerySource: Screenshots captured automatically by the project's Android 14 emulator test run.
facts:
  - value: "26"
    label: Units
    note: Six of them teach Hangul
  - value: "12"
    label: Exercise types
    note: From new letters to speaking aloud
  - value: Offline
    label: After install
    note: No account, no connection needed
  - value: 19 Nov
    label: First commit, 2026
    note: Rebuilt in phases on 22 Nov
detail:
  overview: A Korean course for Android, aimed at the language an exchange student actually needs. It runs entirely on the phone, with no account and no internet connection after install, including pronunciation scoring.
  audience: Learners of Korean, from their first Hangul letter to everyday exchange-student life on campus, in a dorm, at a part-time job or on transport.
  responsibilities:
    - Course design and the content pipeline
    - The Kotlin and Jetpack Compose app
    - Offline speech recognition for pronunciation feedback
    - Unit tests and emulator tests in CI
  process: The whole course is written in one plain-text file and compiled to JSON by a Python script, which also generates the audio and checks every clip with the speech recogniser. Lesson generation, answer checking and scoring live in a plain Kotlin core package. First commit 19 Nov 2026; the interface was rebuilt in phases on 22 Nov 2026.
  features:
    - title: Lesson path
      text: 26 units, six for Hangul, then Basics, Everyday and Exchange life.
    - title: 12 exercise types
      text: From new letters and matching pairs to building sentences from a word bank, filling blanks and speaking aloud.
    - title: Audio everywhere
      text: Bundled Korean audio for every word and sentence, at normal and slow speed.
    - title: Offline pronunciation
      text: Your voice is checked on the phone by a Korean sherpa-onnx model, syllable by syllable.
    - title: A routine
      text: Hearts, XP, a daily goal, a streak, a placement test, practice sessions and a word list.
  decisions:
    - Offline first, including speech recognition, so the course keeps working with no connection after install.
    - Course content as data compiled from text, so lessons can grow without touching app code.
    - Testing by generation. Unit tests build every lesson of every unit with 40 random seeds and check each can be answered; device tests make 2,000 random taps to look for crashes.
  challenges:
    - Pronunciation scoring has only been checked against the bundled audio in CI. The emulator has no real microphone, so real voices still need testing on phones.
  results: In active development. The tests are configured in CI but were not re-run for this page.
  related:
    - skillswap
---

## What it is

Doran is a Korean course for Android, aimed at the language an exchange student actually needs. It runs entirely on the phone, with no account and no internet connection after install.

## What you can do in it

- **Follow a lesson path.** 26 units: six for Hangul, then Basics, Everyday and Exchange life (campus, dorm, part-time work, transport, health, polite speech).
- **Practise in 12 ways.** Exercises run from learning new letters and matching pairs to building sentences from a word bank in both directions, filling blanks and speaking a sentence aloud.
- **Hear every word.** Korean audio is bundled for every word and sentence, at normal and slow speed. A script generates it, and each clip is checked by the speech recogniser.
- **Get pronunciation feedback without a connection.** Your voice is recorded and checked on the phone by a Korean speech recognition model (sherpa-onnx), and you see which syllables were heard well.
- **Keep a routine.** Hearts, XP, a daily goal, a streak, a placement test, practice sessions and a word list.

## How it is built

The course content is written in one plain-text file and compiled to JSON by a Python script. Lesson generation, answer checking and scoring live in a plain Kotlin `core` package that is unit tested. Unit tests generate every lesson of every unit with 40 random seeds and check that each one can be answered. Device tests run on Android 14 and Android 8 emulators in CI, play complete lessons through the real interface, and make 2,000 random taps to check for crashes.

## Current status

Doran is in active development. I have not run its tests for this page. The descriptions above come from reading the repository, and the screenshots come from its CI emulator run.

| Area | Status | Basis |
|---|---|---|
| Lesson path, 12 exercise types, bundled audio, learning loop | Built | In the repository, with the CI screenshots shown above |
| Automated tests | Set up, not re-checked | Unit tests and emulator tests are configured in CI. I did not run them or confirm their results for this page |
| Offline pronunciation scoring | Partial | Only checked against the bundled audio in CI. The emulator has no real microphone, so scoring a real voice still needs testing on phones |
| Interface | Being rebuilt | First commit 19 Nov 2026, rebuilt in phases on 22 Nov 2026 |
