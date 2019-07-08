import auth from './auth'


const makeAuthHeaderBody = async function(){
  let user = await auth();
  let idToken = await user.getIdToken(/* forceRefresh */ false)
  let sendMsg = 'Bearer ' +idToken
  return {
    'Authorization': sendMsg,
  }
}

export default makeAuthHeaderBody
