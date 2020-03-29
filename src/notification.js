const txtToken        = $("#token");
const txtTitle        = $("#title");
const txtMessage      = $("#message");
const btnSend         = $("#send");
const btnNotificacao  = $("#notificacao");
const txtTopic        = $("#topic")
const messaging       = firebase.messaging();
const SERVER_KEY      = "<YOUR_SERVER_LEGACY_KEY>"
let USER_TOKEN        = ""
let TOPIC_NAME        = "notices"

$('topic-text').text(TOPIC_NAME)

function showToken() {
  txtToken.val(USER_TOKEN);
  txtTopic.val(`/topic/${TOPIC_NAME}`);
  btnNotificacao.text("Notificações Habilitadas");
  btnNotificacao.attr("disabled", true);
  btnSend.attr("disabled", false);
}

function hideToken() {
  txtToken.val("Nenhum token encontrado");
  btnNotificacao.attr("disabled", false);
  btnNotificacao.text("Habilitar Notificações");
  btnSend.attr("disabled", true);
}

function getNotificationData() {
  return {
    // to: txtToken.val(),
    to: `/topics/${TOPIC_NAME}`,
    data: {
      notification: {
        title: txtTitle.val(),
        body: txtMessage.val(),
        click_action: window.location.origin,
        icon: window.location.origin + "/img/icon.png"
      }
    }
  };
}

function requestToken() {
  messaging.getToken().then(function(token) {
    USER_TOKEN = token
    registerClient();
  }).catch(function(error) {
    console.error("Um erro ocorreu ao recuperar o token:", error);
  });
}

function requestPermission() {
  messaging.requestPermission().then(function() {
    requestToken();
  }).catch(function(error) {
    console.error("Ocorreu um erro ao solicitar permissão:", error);
  });
}

function registerClient() {
  $.ajax({
    type: "POST",
    url: `https://iid.googleapis.com/iid/v1/${USER_TOKEN}/rel/topics/${TOPIC_NAME}`,
    headers: {
      Authorization: `key=${SERVER_KEY}`
    },
    contentType: 'application/json',
    dataType: 'json',
    success: function () {
      showToken();
      // alert('Registrado')
    },
    error: function(xhr, status, error) {
      console.error("Error status:", status, xhr.error);
    }
  });
}

function sendMessage() {
  $.ajax({
    type: "POST",
    url: "https://fcm.googleapis.com/fcm/send",
    headers: {
      Authorization: `key=${SERVER_KEY}`
    },
    contentType: 'application/json',
    dataType: 'json',
    data: JSON.stringify(getNotificationData()),
    success: function () {
      txtTitle.val("");
      txtMessage.val("");
    },
    error: function(xhr, status, error) {
      alert("Houve um erro ao enviar a mensagem!");
      console.error("Status:", status, xhr.error);
    }
  });
}

messaging.onMessage(function(payload) {
  const data = JSON.parse(payload.data.notification);
  const notification = new Notification(data.title, data);

  notification.onclick = function(event) {
    event.preventDefault();
    window.open(data.click_action, "_blank");
    this.close();
  }
});
