import auth from '../plugins/auth'

export default async function ({ store, route, redirect }) {

  const firebaseUser = await auth()
  if(!firebaseUser){
    return redirect('/login')
  }

  let storedUserInfo = null
  // storeからprofileを取得
  storedUserInfo = store.getters['profile/getCurrentUser']
  // storedUserInfo = true
  if(!storedUserInfo){
    // apiサーバーからprofileを取得
    await store.dispatch('profile/fetchUserFromAPIServer')
    storedUserInfo = store.getters['profile/getCurrentUser']
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
