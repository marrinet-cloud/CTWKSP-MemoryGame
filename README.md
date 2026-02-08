# Memory Card Game

A browser-based Memory Card Game built with vanilla HTML, CSS, and JavaScript.  
Players flip two cards at a time to find matching pairs while tracking moves and time.

This project was created as part of a workshop focused on DOM manipulation, game logic, and state management.

---

## Features

- Dynamic card generation
- Multiple difficulty levels (Easy, Medium, Hard)
- Two-card flip restriction
- Match detection logic
- Moves counter
- Timer
- Win message when all pairs are matched
- Card flip animations using CSS transforms
- Optional sound effects with on/off toggle
- Restart and replay functionality

---

## Technologies Used

- HTML – structure and layout
- CSS – grid layout, flip animations, visual feedback
- JavaScript – game logic, DOM manipulation, state tracking

No external libraries or frameworks are used.

---

## How the Game Works

1. Cards are generated dynamically from a shuffled array.
2. Each symbol appears exactly twice to form pairs.
3. The player flips two cards per turn.
4. If the cards match:
   - They remain visible.
   - The matched pairs counter increases.
5. If the cards do not match:
   - They flip back after a short delay.
6. The game ends when all pairs are matched.

---

## Difficulty Levels

| Difficulty | Grid Size | Number of Pairs |
|-----------|----------|-----------------|
| Easy      | 3 × 4    | 6               |
| Medium    | 4 × 4    | 8               |
| Hard      | 4 × 6    | 12              |

Changing the difficulty resets the game.

---

## Project Structure
memory-game/
├── index.html
├── style.css
└── script.js


---

## How to Run Locally

1. Clone or download this repository.
2. Open the project folder.
3. Double-click `index.html`.

The game will run directly in your web browser.  
No installation or server setup is required.

---

## Optional: Run with Live Server (VS Code)

1. Open the folder in Visual Studio Code.
2. Install the **Live Server** extension.
3. Right-click `index.html`.
4. Select **Open with Live Server**.

---

## Learning Outcomes

This project demonstrates:

- Dynamic DOM creation
- Event-driven programming
- Game state management
- Preventing invalid user interactions
- CSS-based animations
- Clean separation of concerns

---

## Future Improvements

- Save best times using `localStorage`
- Add keyboard accessibility
- Improve mobile responsiveness
- Add score history or statistics
- Add themes or visual customization
