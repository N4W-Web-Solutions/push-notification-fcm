# README
Projeto de exemplo de como usar push notification usando o serviço de Cloud Messaging do Firebase.

## Configuração

Crie um projeto no [Firebase](https://console.firebase.google.com/).

Acesse o arquivo /src/init.js e insira o messagingSenderId (Google Firebase -> configurações do projeto -> Cloud Messaging -> Código do Remetente):
```javascript
const config = {
  messagingSenderId: "<MESSAGING_SENDER_ID>" 
}
```
Já no arquivo notification.js a chave do servidor (Google Firebase -> configurações do projeto -> Cloud Messaging -> Chave herdade do servidor):
```javascript
headers: {
  Authorization: "key=<CHAVE_SERVIDOR>"
}
```
Para configuração de "para quem irá enviar", na função "getNotificationData" dentro do arquivo notification.js, escolha como será o parâmetro "to": unitário (token do usuário) ou para um tópico (/topic/tokec_name), onde todos que estiverem cadastrados no tópico, receberão a mensagem:
```javascript
    to: txtToken.val()

    OU
    
    to: `/topics/${TOPIC_NAME}`
```

## Execução
É preciso rodar a página em um servidor para funcionar aqui tem algumas opções:

 * [Web Server for Chrome](https://chrome.google.com/webstore/detail/web-server-for-chrome/ofhbbkphhbklhfoeikjpcbhemlocgigb/related)
 * [Atom Live Server](https://atom.io/packages/atom-live-server)
 * [Live Server (VS Code)](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer)
