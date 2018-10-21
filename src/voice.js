window.onload = () => {

  const speech = new webkitSpeechRecognition();
  speech.lang = 'ja-JP';

  const btn = document.getElementById('video-button');
  const content = document.getElementById('video-content');

  btn.addEventListener('click', () => { speech.start() });

  speech.onresult = (e) => {
    speech.stop();
    if (e.results[0].isFinal) {
      const autotext = e.results[0][0].transcript;
      console.log(autotext);
      content.innerHTML += '<div>' + autotext + '</div>';
    }
  }

  speech.onend = () => { speech.start() };
}
