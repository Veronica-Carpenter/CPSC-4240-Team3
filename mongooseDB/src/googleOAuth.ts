
const dotenv = require('dotenv');
dotenv.config();

class googleOAuth {
    static id: string = process.env.googleId;
    static secret:string = process.env.googleSecret;    
}
export default googleOAuth;