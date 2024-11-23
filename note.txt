#intallasi pada project

- express (libs project)
- cors (handle cors)
- prisma (orm)
- nodemon (auto update)
- dotenv (env config reader)

command : 
1. npm install express cors prisma nodemon dotenv

2. npm init (ikuti langkah)

3. npx prisma init --datasource-provider postgresql

#instruksi konfigurasi prisma
untuk membuat multi schema pada postgresql di prisma kita harus menginisialisasi setiap schema
sebagai contoh membuat : 
- DATABASE_URL_PUBLIC (UNTUK SHCEMA PUBLIC)
- DATABASE_URL_MASTER (UNTUK SCHEMA MASTER)

#tambahkan pada bagian script di package.json untuk generate prisma client untuk setiap schema (digunakan)
"generate:master": "prisma generate --schema=./prisma/schema_master.prisma",
"generate:public": "prisma generate --schema=./prisma/schema_public.prisma",
"generate:all": "npm run generate:master && npm run generate:public",
"dev": "nodemon src/index.js"

#jika generate prisma tanpa multi schema 
npx prisma generate

#sebelum melakukan generate pastikan bahwa client yang ada disetiap file diberikan output untuk setiap schema & file
generator client {
  provider = "prisma-client-js"
  output   = "./generated/public"
}

generator client {
  provider = "prisma-client-js"
  output   = "./generated/master"
}

#kemudian untuk import client 
const {PrismaClient: PrismaMasterClient} = require('../prisma/generated/master');
const {PrismaClient: PrismaPublicClient} = require('../prisma/generated/public');

#jika import client tanpa multi schema
const {PrismaClient} = require('@prisma/client')

#kemudian untuk mengupload / menghubungkan menggunakan 
- command : npx prisma db push --schema=./prisma/schema_public.prisma (untuk public)
- command : npx prisma db push --schema=./prisma/schema_master.prisma (untuk master)

#jika upload db tanpa multi schema
npx prisma db push

#apabila ingin membuka prisma studio saat kita menggunakan multi schema, maka kita harus membukanya dengan file & komen terpisah
- command : npx prisma studio --schema=./prisma/schema_public.prisma (untuk public)
- command : npx prisma studio --schema=./prisma/schema_master.prisma (untuk master)

#jika ingin membuka editor viewer prisma tanpa multi schema
npx prisma studio

#layered architecture (service respository)
- controller : handle request & response
- service : logic bisnis tambahan
- repository : data access yang berkaitan dengan database
