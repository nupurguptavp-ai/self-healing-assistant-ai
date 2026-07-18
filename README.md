# AI Self-Healing Developer Assistant

This project demonstrates an AI-powered workflow that automatically detects runtime errors, generates fixes using Gemini AI, commits the changes, and creates a GitHub Pull Request.

## Project Structure

The project contains two applications:

### App 1 – Runtime Error Generator

A simple Express application used to simulate runtime errors.

* Generates runtime exceptions
* Logs errors using Pino
* Writes logs to `logs/error.log`

### App 2 – AI Self-Healing Developer Assistant

Monitors the log file and automatically performs the following steps:

* Watches for new runtime errors
* Reads the latest error log
* Parses the stack trace
* Identifies the affected source file
* Generates a fix using Gemini AI
* Applies the fix
* Creates a new Git branch
* Commits and pushes the changes
* Creates a GitHub Pull Request

## Tech Stack

* Node.js
* TypeScript
* Express.js
* Gemini AI
* Pino
* Chokidar
* simple-git
* Octokit (GitHub API)

## Setup

Install dependencies:

```bash
npm install
```

Configure the required environment variables:

```env
GEMINI_API_KEY=
LOG_FILE_PATH=
GITHUB_TOKEN=
GITHUB_OWNER=
GITHUB_REPO=
GITHUB_BASE_BRANCH=dev
```

## Run

Start **App 1** to generate runtime errors.

```bash
npm run dev
```

Start **App 2** to monitor logs and trigger the AI self-healing workflow.

```bash
npm run dev
```
