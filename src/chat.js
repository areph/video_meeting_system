window.onload = () => {
  // Initialize Firebase
  const config = {
    apiKey: window.__FIREBASE_APIKEY__,
    authDomain: "chatapp-62d4d.firebaseapp.com",
    databaseURL: "https://chatapp-62d4d.firebaseio.com",
    projectId: "chatapp-62d4d",
    storageBucket: "chatapp-62d4d.appspot.com",
    messagingSenderId: "458150114815"
  };
  firebase.initializeApp(config);

  const firestore = firebase.firestore();
  const settings = {/* your settings... */ timestampsInSnapshots: true};
  firestore.settings(settings);

  const roomname = "room";

  const send = document.getElementById("send");
  const username = document.getElementById("username");
  const text = document.getElementById("text");
  const output = document.getElementById("output");

  const ref = firestore.collection(roomname);

  send.addEventListener('click', () => {
    // 書き込み処理
    ref.add({
      username: username.value,
      text: text.value,
      date: Date.now(),
    })
    .then((docRef) => {
      text.value = "";
    })
    .catch((error) => {
      output.innerHTML = 'ERROR!!';
    });
  })

  // 読み込み処理(監視付き)
  ref.orderBy('date').onSnapshot((querySnapshot) => {
    let outputHtml = "";
    querySnapshot.forEach((doc) => {
      outputHtml += '<div class="msgbox">';
      outputHtml += '  <div class="msg_left">';
      outputHtml += '    <i class="fas fa-user"></i>'
      outputHtml += '    <div class="name">' + doc.data().username + '</div>';
      outputHtml += '  </div>';
      outputHtml += '</div>';
      outputHtml += '<div class="msg_right">';
      outputHtml += '    <div class="text">' + doc.data().text + '</div>';
      outputHtml += '  <span class="date">' + new Date(doc.data().date) + '</span>';
      outputHtml += '</div>';
    });
    output.innerHTML = outputHtml;
  });
}
