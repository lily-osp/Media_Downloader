FROM node:20-bookworm-slim

RUN apt-get update && apt-get install -y --no-install-recommends \
    python3 \
    python3-venv \
    ffmpeg \
    ca-certificates \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .

RUN python3 -m venv venv && \
    ./venv/bin/pip install --no-cache-dir --upgrade yt-dlp

EXPOSE 3300

ENV PORT=3300
ENV NODE_ENV=production

CMD ["node", "server.js"]
