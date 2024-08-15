---
title: Japanese Conversation Bot
technologies:
  - Django
  - JavaScript
  - Docker
id: japanese-conversation-bot
featured: true
og: https://na-406607901.imgix.net/japanese-conversation-bot/japanese-conversation-bot.png
date: 2023-04-01
---

This is a project that I worked on when OpenAI API first became publicly available. The aim of the project is to have a Japanese tutor who can converse with the user in Japanese, correct the user's errors, and encourage the user to become more proficient in speaking Japanese as they converse with the chatbot.

## Overview

The ideal flow of the project is: user presses the "speak" button and speaks in Japanese -> Whisper transcribes text, transcribed text appears in the text area, users may manually correct any mistakes by typing -> submit user message -> user message sent to OpenAI API, the API returns a response -> response as a piece of text is displayed on the web app -> response as a piece of text is sent to VoiceVox, which performs text to speech.

![](https://na-406607901.imgix.net/japanese-conversation-bot/flowchart.png)

This project uses Flask and HTML, Tailwind CSS, JavaScript.

## Capture User Audio

A `POST` request is sent from my web app's root route to `/transcribe`. In there, I captured a blob of audio, saved it, and sent it to Whisper via `openai`, a Python wrapper of the OpenAI API.

```python
blob = request.files['blob'].read()
with open('blob.wav', 'wb') as f:
    f.write(blob)
audio_file = open('blob.wav', "rb")
openai.api_key = config.OPENAI_API_KEY
transcript = openai.Audio.transcribe("whisper-1", audio_file)["text"]
return jsonify({'output': transcript})
```

## Choosing good Text to Speech API

I have actually compared different TTS options available to me.

SpeechCloud API was too expensive, it was priced at around 0.01 Euro per word/character. Coqui seems doable, but currently stuck with some character parsing issues. Voicevox proves to be very useful. I downloaded it locally, which also started a local at the same time. I wrote a script that performs audio query and synthesizes the query into an audio file. I was also able to parse the returned JSON from get_speakers() method to have a clearer manual on speaker selection.

## VoiceVox in Docker

At the beginning, I made use of VoiceVox by actually downloading the software and opening it locally. To make it simpler for the user, I used the following code snippet to run a Docker container version of the VoiceVox server.

```python
import docker

client = docker.from_env()

# Pull the Docker image
client.images.pull('voicevox/voicevox_engine:cpu-ubuntu20.04-latest')

# Run the Docker container
container = client.containers.run(
    'voicevox/voicevox_engine:cpu-ubuntu20.04-latest',
    detach=True,
    ports={'50021/tcp': ('127.0.0.1', 50021)},
    remove=True,
    tty=True
)

# Print the container logs
print(container.logs(follow=True))
```

Also, stop the Docker container that contains the VoiceVox image on exit using the atexit library.

```python
def OnExitApp():
    tts.stop_voicevox()

atexit.register(OnExitApp)
```

## UI

The UI looks like this:

![](https://na-406607901.imgix.net/japanese-conversation-bot/japanese-conversation-bot.png)

Before that, I have also made a prototype using Gradio.

![](https://na-406607901.imgix.net/japanese-conversation-bot/gradio.png)

## Closing Notes

Going further, I may be able to improve the UI, incorporate more features such as displaying Furigana, bookmarking good conversations, and so on. Overall, it was very fun working on this project. I got to practice a lot about how to leverage existing solutions to build something that I wish existed.
