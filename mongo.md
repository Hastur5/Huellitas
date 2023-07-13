Se instala npm init --y

Se instala express: npm i express --save

Se instala nodemon: npm i nodemon  o  Se instala node --watch (esto se pone el start en el package)

Se instala Mongoose: npm i mongoose -- save

Instalar mongo y conectar base. Se genera una nueva base de datos. Se elige servidor y todo gratuito.
después: npm i mongodb

"mongodb+srv://mgasca12:<password>@collection.sc5rfor.mongodb.net/?retryWrites=true&w=majority";


Se crea la carpeta src y se crea archivo index.js

se manda a llamar express, mongo y moongose para levantar el puerto.

Para conectar mongo con nuesta BD tenemos que crear un archivo .env Se pone la uri de mongo en este archivo.
Y se instala dotenv: npm i dotenv --save