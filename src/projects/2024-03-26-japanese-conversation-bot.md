---
title: Japanese Conversation Bot
technologies: Django, JavaScript, Docker
id: japanese-conversation-bot
featured: true
og: /japanese-conversation-bot.png
---
This is a project that I worked on when OpenAI API first became publicly available. The aim of the project is to have a Japanese tutor who can converse with the user in Japanese, and correct the user's errors, encourage the user to become more proficient in speaking Japanese as they converse with the chat bot.

## Overview

The ideal flow of the project is: user presses "speak" button and speaks in Japanese -> Whisper transcribes text, transcribed text appears in text area, users may manually correct any mistakes by typing -> submit user message -> user message sent to OpenAI API, the API returns a response -> response as a piece of text is displayed on the web app -> response as a piece of text is sent to VoiceVox, which performs text to speech.

![](/japanese-conversation-bot/flowchart.png)

This project uses Flask and HTML, Tailwind CSS, JavaScript.

## Choosing good Text to Speech API

SpeechCloud API too expensive, 0.01 Euro per word/character. Coqui seems doable, but currently stuck with some character parsing things. Voicevox proves to be very useful. I downloaded locally, which also started a local at the same time. I wrote a script that performs audio query and synthesize the query into audio file. I wish to parse the returned json from `get_speakers()` method to have a more clear manual on speaker selection.

MediaRecorder API is such a pain in the ass, took me 5 hours and I didn't get shit.

## Web App

### Flask

### Prototype with Record/Stop button

The first prototype uses a button to record/stop the audio.

`app.py`

```python
@app.route('/process', methods=['POST'])
def process():
    # remove older output.wav, if possible
    if (os.path.exists('static/output.wav')):
        os.remove('static/output.wav')

    # get the user input
    userInput = request.get_json()['input']

    # generate the audio output file
    outputText = gpt.generate_response(userInput)
    tts.text_to_speech(23, outputText, "static/output.wav")

    # Wait for the audio file to be generated
    while not os.path.exists('static/output.wav'):
        time.sleep(1)

    # return the function output as a JSON object
    return jsonify({'output': outputText})

@app.route('/wave')
def get_wave():
    return send_from_directory('static', 'output.wav')
```

`app.js`

```js
window.addEventListener("load", function () {
  // get stuff from DOM
  record = document.getElementById("record");
  submit = document.getElementById("submit");
  messageInput = document.getElementById("message-input");
  chatBox = document.getElementById("chat-box");

  // create a SpeechRecognition object
  SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = new SpeechRecognition();

  // set the language to Japanese
  recognition.lang = "ja-JP";
  recognition.continuous = true;

  // add event listener to the record button
  record.addEventListener("click", () => {
    console.log("reached!");
    if (record.value === "Record") {
      // start recording
      console.log("start recording");
      recognition.start();
      record.value = "Stop";
    } else {
      // stop recording
      console.log("stop recording");
      recognition.stop();
      record.value = "Record";
    }
  });

  // add event listener to the recognition object
  recognition.addEventListener("result", event => {
    // get the converted text
    const text = event.results[0][0].transcript;

    // display the text on the text field
    messageInput.value = text;
  });

  // add event listener to the submit button
  submit.addEventListener("click", () => {
    // get the user input text
    const userInput = messageInput.value;

    // send the user input to the Python function via AJAX
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "/process");
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onload = () => {
      // get the function output
      const functionOutput = JSON.parse(xhr.responseText).output;

      // display the user input and function output on the web app
      // const chatBox = document.querySelector('#chat-box');
      chatBox.innerHTML =
        chatBox.innerHTML +
        `<p>User: ${userInput}</p><p>GPT: ${functionOutput}</p>`;

      // clear the text field
      messageInput.value = "";

      // fetch audio
      audio = this.document.getElementById("audio");
      audio.src = "/wave?" + new Date().getTime(); // to prevent cache
      audio.load();
      audio.play();
    };
    xhr.send(JSON.stringify({ input: userInput }));
  });
});
```

`fetch` is newer than `XMLHttpRequest`, and better.

`response => response.json()` and `response => {response.json();}` are different. Took me 2 hours to realize that.

bootstrap icon is a good icon library

## VoiceVox in Docker

Thus far, I've been using VoiceVox's server started locally by actually opening the software. To make it simpler for the user, I used the following code snippet to run a Docker container version of VoiceVox server.

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

Also, stop the Docker container that contains VoiceVox image on exit using the `atexit` library.

```python
def OnExitApp():
    tts.stop_voicevox()

atexit.register(OnExitApp)
```