export class AuthMiddleWare {

static ensureAuth(req : any, res : any, next : any) {
    if (req.isAuthenticated()) {
        console.log("yes authenticated")
        next()
    } else {
      console.log("not authenticated")
      res.json({
        "message" : "Not Authorized",
        "statusCode" : 403
      });
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