export default function () {
    return new Promise((resolve, reject) => {
      returnAuthUser((user) => {
        resolve(user || false)
      })
    })
}

// firebaseの認証に変える
// @see https://qiita.com/potato4d/items/cfddeb8732fec63cb29c
function returnAuthUser(callback){
    callback(false)
}
