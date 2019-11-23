# WebSockets + Node.js 🤝 💪
## Neste repositório irei mostrar a simplicidade da criação de um canal de comunicação REAL TIME utilizando WebSocket.io + Node.js
### 1 - O que é ? e para que serve ? 🤷‍ 
#### Bom primeiro de tudo devemos saber o que é o websocket e para que utilizamos. OK! WebSocket é uma tecnologia que permite a comunicação bidirecional por canais full-duplex, isto é, pense em um tunel de comunicação interligados um no outro, ao invés de termos requisições HTTP a cada segundo no qual as mesmas, buscam e trazem uma resposta, com WebSocket temos um único canal de comunicação. Ex.:
<img src="https://thumbs.gfycat.com/LikableFarCusimanse-size_restricted.gif">

#### Utilizamos ele para a criação de aplicações que exige alterações em tempo real exemplo, como por exemplo um simples CHAT💬 sem dúvida utilizaremos o websocket.

### 2 - "Codando" 💻
#### Para começarmos, suponho que você tenha um conhecimento básico em NODE.JS. <br> Se sim, então borá criar um exemplo prático, bom primeiro vamos criar nosso servidor NODE começando com o primeiro comando. 
##### Passo 1° - `npm init -y `
##### Passo 2° - `npm install --save`
##### Passo 3° - `npm install http --save`
##### Passo 4° - `npm install socket.io --save`
##### Passo 5° Criando nosso arquivo servidor.js 
  ``` 
const server = require('http').createServer();
const io = require('socket.io')(server);
io.on('connection', srv => {
  srv.on('ENVIA-MSG', data => {  
    srv.broadcast.emit('RECEBE-MSG', data);
  });
});
server.listen(3000, () => {
  console.log("Servidor online.");
});
  ```
##### Passo 6° Criando nossos paginas cliente1.html e cliente2.html, o código para as duas é o mesmo, então vou inserir somente um.
``` 
<!DOCTYPE html>
 <html>
  <head>
   <title> Cliente 1 Socket </title>
   <script src="https://code.jquery.com/jquery-3.4.1.min.js"></script>
   <script src="https://cdnjs.cloudflare.com/ajax/libs/socket.io/2.3.0/socket.io.dev.js"></script>
  </head>
  <body>
    <div>
      <div id="recebe-msg"> </div>	
      <input type="text" placeholder="Digite uma mensagem...">
      <button type="button">Enviar</button>
    </div>	

   <script>
    let socket = io.connect("http://localhost:3000");

    $("button").click( () => {
      let msg = $('input').val();
      socket.emit('ENVIA-MSG', msg);
      ImprimeMsg ( msg );
    })

    socket.on( 'RECEBE-MSG' , msg  => {
      ImprimeMsg ( msg );
    })

    function ImprimeMsg ( msg )
    {
      $('#recebe-msg').html(`<h1> ${msg} <h1><br>`);
    }
  </script>

</body>
</html> 
```

### 3 - Explicando alguns passos 🚶‍
##### No passo 5° criamos nosso servidor node com algumas dependencias. Dentro do nosso code *servidor.js* temos a funcao :
```
io.on('connection', srv => {
  /* */
});
```
##### que possui a finalidade de estabelcer uma conexão do socket para as funcões internas dele. Dentro dela temos a seguinte função:
```
srv.on('ENVIA-MSG', data => {  
  srv.broadcast.emit('RECEBE-MSG', data);
});
```
##### ja essa tem a finalidade de ouvir as chamadas externas, que é dentro de uma das paginas *cliente.html* ex.:  `socket.emit('ENVIA-MSG', msg);` . 

##### No passo 6° temos as paginas *cliente.html* & *cliente2.html* no qual enviará mensagens e recebera as msg's,
###### *Enviando* ✈️
  ```
socket.on( 'RECEBE-MSG' , msg  => {
    ImprimeMsg ( msg );
})
    
   ```
   
###### *Recebando* ✈️
  ```
socket.on( 'RECEBE-MSG' , msg  => {
    ImprimeMsg ( msg );
})
    
   ```
