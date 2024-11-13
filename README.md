
# Pomodoro Timer

A simple, customizable Pomodoro Timer built using React (with Next.js) and TypeScript. The app follows the Pomodoro Technique to enhance productivity by dividing work into intervals, typically 25 minutes in length, separated by short breaks.

---

## Features

- **Customizable Timers**: Set your preferred work and break durations.
- **Session Tracking**: Tracks the number of Pomodoro sessions completed.
- **Local Storage**: Saves your timer settings (work and break durations) in local storage for persistent use.
- **Progress Bar**: Displays the progress of the current session (work/break) as a progress bar.
- **Timer Controls**: Start, pause, and reset the timer with intuitive controls.
- **Time Format**: Displays time in a `MM:SS` format for easy readability.
- **Statistics**: View your total work and break times, as well as Pomodoro count.

---

## Technologies Used

- **React** (Client-Side)
- **Next.js** (Server-Side)
- **TypeScript**
- **Tailwind CSS** (For styling)
- **Lucide Icons** (For UI icons)
- **LocalStorage** (For persistent user settings)

---

## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/pomodoro-timer.git
cd pomodoro-timer
```

### 2. Install Dependencies

Make sure you have [Node.js](https://nodejs.org/) installed, then run the following command to install the project dependencies:

```bash
npm install
```

### 3. Run the Development Server

Start the Next.js development server:

```bash
npm run dev
```

Now open your browser and navigate to `http://localhost:3000` to see the Pomodoro Timer in action.

---

## Usage

1. **Set Work and Break Durations**:
   - Adjust the work duration (default: 25 minutes) and break duration (default: 5 minutes) using the input fields. The settings are saved in `localStorage` for persistent use across sessions.

2. **Start/Stop Timer**:
   - Click the **Start** button to begin the countdown for the current session (either work or break). If the timer is running, it will switch to a **Pause** button to stop the timer.

3. **Reset Timer**:
   - Clicking the **Reset** button will reset the timer to the initial work duration and reset all statistics.

4. **Session Progress**:
   - A progress bar will show the remaining time for the current session. It fills up as you progress through the session and resets when switching between work and break sessions.

5. **Statistics**:
   - View the total work time, total break time, and the number of Pomodoro sessions completed so far.

---

## Component Overview

### `PomodoroTimer` Component

This is the main component for the Pomodoro Timer. It handles:

- State management for the timer, including work duration, break duration, remaining time, and session progress.
- Side-effects for saving and loading settings from `localStorage`.
- Timer logic for countdown, session transitions, and statistics tracking.
- Timer control functions: Start, Pause, and Reset.

---

## Handling Hydration Mismatch

This application is built with **React** and **Next.js**, which can cause **hydration mismatches** when certain client-side logic runs before the component is mounted. To address this issue, we use the `hasMounted` state, ensuring that client-only logic (like accessing `localStorage`) is only executed after the component has mounted.

---

## Future Enhancements

- Add a sound notification when a session ends.
- Provide an option for custom session times beyond just work and break (e.g., long break).
- Allow for session presets, e.g., different timer configurations for different tasks.
- Implement a dark/light mode toggle for better accessibility.

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## Contact

For any questions or feedback, feel free to contact me at **your-email@example.com** or visit my [LinkedIn Profile](https://www.linkedin.com/in/your-profile).

---

## Acknowledgements

- Inspired by the [Pomodoro Technique](https://en.wikipedia.org/wiki/Pomodoro_Technique).
- Icons provided by [Lucide Icons](https://lucide.dev/).
