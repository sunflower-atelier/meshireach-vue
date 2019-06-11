export default async function({store, redirect}){
  if(!store.getters.isAuthenticated){
    return redirect('/login');
  }
}