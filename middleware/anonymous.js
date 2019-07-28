import auth from '../plugins/auth'

export default async function ({ redirect }) {

  let user = await auth()
  if(user){
    return redirect('/')
  }
}
