import auth from './auth'


const makeAuthHeaderBody = async function(){
  const  user = await auth();
  const idToken = await user.getIdToken(/* forceRefresh */ false)
  const sendMsg = 'Bearer ' +idToken
  return {
    'Authorization': sendMsg,
  }
}

export default makeAuthHeaderBody
