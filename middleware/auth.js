//Trigger before the page loads
export default function ({ app, redirect, route }) {
  if(route.path !== '/login' && route.path !== '/register' && route.path !== '/forgetPassword') {
    //we are on a protected route
    if(!app.$fire.auth.currentUser) {
      //take them to sign in page
      return redirect('/login')
  }
  } else if(route.path === '/login') {
    if(!app.$fire.auth.currentUser) {
      //leave them on the sign in page
    }else {
      return redirect('/')
    }
}

}

