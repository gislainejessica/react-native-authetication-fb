## Authentication

### Configurar o Deep Link no react-native

- Permite o acesso à sua aplicação através de aplicações
de terceiros.
- E permite também que a sua aplicação tenha acesso a uma outra aplicação. 

Mas como assim? Isso tá parecendo meio confuso.
Funciona tipo a webview, mas em vez de abrir uma pagina web dentro do seu aplicativo, você consegue abrir um outro aplicativo, com alguma ação em seu app,
e vise e versa.

**Para configurar para android:**
1) Configurar o Android para permitir o deep link.
  - Abrir o arquivo : `android/app/src/main/AndroidManifest.xml`
  - Adicionar o código abaixo: 
    ```java
    <intent-filter>
      <action android:name="android.intent.action.VIEW"/>
      <category android:name="android.intent.category.DEFAULT" />
      <category android:name="android.intent.category.BROWSABLE" />
      <data android:scheme="authfb" android:host="authfb"/>
    </intent-filter>
    ```
    **"authfb"** deve definido para **host** e **scheme** com o mesmo nome, assim a URL do android ficara algo como: 
    `authfb://authfb/paginaqualquer/parametroqualquer`


### **Bibliotecas utilizadas**

  - Autenticação por Facebook: [react-native-fbsdk](https://github.com/facebook/react-native-fbsdk)
  
**Instalando a biblioteca no projeto**

- `yarn add react-native-fbsdk`

Na versão do **react-native > 0.6** as configurações de link, são feitas pelo autolink, mas é necessário dá um 
`react-native run-android` pra ele configurar essa biblioteca no projeto.

## Criando um app na conta no Facebook for developers
- Primeiramente: logar com uma conta do facebook no site:
[Facebook for Developers](https://developers.facebook.com) 
----
- **Criar Aplicativo**, seguindo os passos que a pagina vai guiar
- Como pra rodar essa aplicação já tenho instalado o **android sdk** e a versão do react-native usada suporta o **auto-link** pular etapa 1 e 2, para a criação do aplicativo.

#### Etapa 3 é que começa as configurações (Conte-nos sobre seu projeto para Android):
    - Ir lá no arquivo `android/app/src/main/AndroidManifest.xml` e bucar o nome do pacote (**com.mobileauth**).
        
    - Preenchido os campos certinho, clicar em *salvar*.

          Aqui ele vai da uma mensagem tipo essa:
          * Ocorreu um problema ao verificar o nome do pacote: com.mobileauth no Google Play. Verifique o nome do pacote e tente novamente.
          * Se o seu aplicativo ainda não estiver listado publicamente no Google Play, você pode ignorar essa mensagem

    Só clicar em **usar esse nome de pacote** sem problemas
    continue para a proxima etapa...

#### Etapa 4 (Adicione seu desenvolvimento e os hashes de chave de lançamento)
Gerar hash de desenvolviemento
Rodar esse comando, mesmo estando escrito MacOs em cima, funciona também para Linux:
`keytool -exportcert -alias androiddebugkey -keystore ~/.android/debug.keystore | openssl sha1 -binary | openssl base64`
Vai ser gerada uma chave que será preenchida em **Hashes de chave**, se depois precisar gerar um chave de produção só adicionar mais uma chave, rodando o comando de gerar chave para produção.

#### Etapa 5 (Ative o login único em seu aplicativo)
Só habilar 

#### Etapa 6 (Edite seus recursos e manifesto)
Seguir as etapas de **copiar** e **colar** nos arquivos indicados.

**As estapas seguintes indicadas no passo a passo, não são necessárias para essa 
aplicação**
----
#### Agora é mão na massa

Todas as configurações necessárias já foram feitas, só rodar um `react-native run-android` novamente, pra atualizar as configurações que tudo que é preciso pra logar com o facebook vai tá disponivel a aplicação utilizar.

*O botão pode ser customizado, mas para essa aplicação, não foi feita nenhuma costumização .* 
- Pra customizar você pode criar um botão com react-native e usar o **LoginManager** pra lidar com a interação com o facebook. (Verificar a prop styles do botão orignal, pra até onde podemos estilizar)
Se tu costomizar, seu botão vai ter que lidar com o seguinte fluxo: 
=> Enviar a requisição 
=> Pedir as permissões
=> Pegar o access Token
=> Pegar os dados
