import auth from './auth'


async function getIdToken(){
  let user = await auth();
  let idToken = await user.getIdToken(/* forceRefresh */ false)
  return idToken
}

export default getIdToken
