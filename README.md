# Power Up your RPS Game

You've built a working version of RPS Mini, but now it's time to evolve it into a full-featured mini battle experience. You will:

- Add more **weapons**
- Introduce **random weapon sets**
- Track **scores**
- Use **Context + Reducer** to manage global game state
- Add a **loading state** (e.g., while waiting for API)

## Suggested Feature Areas

### Random Weapon Set per Round

- Instead of showing all weapons, show only 3-5 **random** choices each round
- Update UI so it changes every time

### Scoring System

- Add a score for Player and Computer (stored in Context)
- Show scoreboard at top
- Optional: Track win history or round count

### Global State with Context + Reducer

- Use Context to Store player and computer score, last results, weapons, etc.

### Loading State

- Add a short delay or spinner while waiting for the match result
- Display a "Fighting..." screen while waiting

### Asset & UI Upgrade

- Replace or expand `WeaponCard` visuals and updated images or icons
- Tailwind enhancements: transitions, hover effects, animated result message

### Bonus Optional Features

- "Game Over" after 5 rounds
- Let player **choose a weapon theme**
- Add background music or sound effects

## Submission Requirements (Customizable)

- Must use **Context API + Reducer** pattern
- Must include a **loading state** with visual feedback

## Installation

1. Clone the repository

```sh
git clone https://github.com/UCC-Batch-26/rps-mini.git
```

2. Navigate to the project

```sh
cd rps-mini
```

3. Install Dependencies

```sh
npm install
```

4. Run the App

```sh
npm run dev
```
