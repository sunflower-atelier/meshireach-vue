import auth from '../plugins/auth'

export default async function ({ route, redirect }) {

  let firebaseUser = await auth();
  if(!firebaseUser){
    return redirect('/login')
  }

  let storedUserInfo = null;
  // storeからユーザ情報を取得する関数
  // storedUserInfo = getUserFromStore()
  if(!storedUserInfo){
    // apiサーバーからユーザを取得する関数
    // storedUserInfo = getUserFromServer()
  }

  // profile登録が済んでいない場合はprofileページに飛ぶ
  if(!storedUserInfo && route.name != 'profile'){
    return redirect('/profile')
  }

  // profile登録が済んでいる時はprofileページに飛べない
  if(storedUserInfo && route.name == 'profile'){
    return redirect('/')
  }
}
