# MIDDLEWARE

This directory contains your Application Middleware.
The middleware lets you define custom function to be ran before rendering a page or a group of pages (layouts).

More information about the usage of this directory in the documentation:
https://nuxtjs.org/guide/routing#middleware

**This directory is not required, you can delete it if you don't want to use it.**


##  firebase configiurationの設定

firebaseのconfigurationは環境変数にして取り込むようにします.

### 手順

1. .env　ファイルをリポジトリ直下に配置
2. 以下のように.envに記載, 右辺はjsonのkeyが対応する

```
FIREBASE_API_KEY=apiKey
FIREBASE_AUTH_DOMAIN=authDomain
FIREBASE_DATABASE_URL=databaseURL
FIREBASE_PROJECT_ID=projectId
FIREBASE_STORAGE_BUKET=storageBucket
FIREBASE_MESSAGING_SENDERID=messagingSenderId
```

