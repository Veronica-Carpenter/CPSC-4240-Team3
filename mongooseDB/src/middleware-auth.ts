export class AuthMiddleWare {
// if user is authenticated the redirected to next page else redirect to login page
static ensureAuth(req : any, res : any, next : any){
    if (req.isAuthenticated()) {
        console.log("yes authenticated")
        next()
    } else {
        console.log("not authenticated")
      res.redirect('/')

    }
  }
static ensureGuest(req, res, next){
    if (!req.isAuthenticated()) {
        console.log("not authenticated")
        next()
    } else {
      res.redirect('/')
    }
  }
}