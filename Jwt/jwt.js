const jwt=require('jsonwebtoken')
const secrete='dcbajcwyuvccadjhbcdcbhjc432rf3ibjhbfbwdfcsjbdhcwdcwhdc'
module.exports={
    generate_token:(user)=>{
        if (!user||user==null) {
            console.log('provide user');
        }
        return jwt.sign({
            id:user.id,
            First_name:user.First_name
        },secrete,{expiresIn:'1d'})
    },
    parse_auth:(token)=>{
        return token ? token.replace('Bearer ',''):null
    },

    getUserId:(token)=>{
        let Userid=-1
        let token=module.exports.parse_auth(token)
        console.log(token);
        if (token!=null) {
            try{
                jwt.verify(token,secrete,(err,good)=>{
                    if (good) {
                        return Userid=good.id
                    }
                })
                if (Userid==-1){
                    console.log("login back bitch token expired");
                }
                return userid;
            }catch{

            }
        }else{
            console.log({err:"you are not authenticated bitch"})
        }
    }
}