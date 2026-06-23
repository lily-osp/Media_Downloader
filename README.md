# Media Downloader

Single-page web application to download video and audio from YouTube, Facebook, Instagram, TikTok, X, and Threads.

## Architecture

- **Frontend:** Vanilla HTML5, CSS3, and JavaScript. Supports dark/light mode toggle and input clearing.
- **Backend:** Express.js server (`server.js`) executing `yt-dlp` in a local Python virtual environment.
- **Dependencies:** Node.js (version 20+), Python (version 3.10+), and ffmpeg.

## Prerequisites

Ensure `ffmpeg` is installed on the host system.

### Ubuntu/Debian
```bash
sudo apt update && sudo apt install -y ffmpeg
```

### macOS
```bash
brew install ffmpeg
```

## Local Installation

1. Install Node.js dependencies:
   ```bash
   npm install
   ```

2. Create a local Python virtual environment and install/upgrade `yt-dlp`:
   ```bash
   python3 -m venv venv
   ./venv/bin/pip install --upgrade yt-dlp
   ```

3. Start the Express server:
   ```bash
   npm start
   ```
   The application runs at `http://localhost:3300`.

## Docker Deployment

Build and run the application using the provided Dockerfile.

1. Build the Docker image:
   ```bash
   docker build -t media-downloader .
   ```

2. Run the container:
   ```bash
   docker run -d -p 3300:3300 --name media-downloader media-downloader
   ```

## Design Details

- **Theme Persistence:** Stores light/dark selection in localStorage.
- **Signature Decryption:** Uses node.js runtime with `--remote-components ejs:github` challenge solver to handle YouTube signature decryption.
- **Format Fallback:** Uses `format_id+bestaudio/format_id/best` format selector to download requested resolution with best audio, falling back to standalone format if needed.
