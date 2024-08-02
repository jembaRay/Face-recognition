const jwt=require('jsonwebtoken')
const secrete='dcbajcwyuvccadjhbcdcbhjc432rf3ibjhbfbwdfcsjbdhcwdcwhdc'
module.exports={
    generate_token:(user)=>{
        if (!user||user==null) {
            console.log('provide user');
        }
        return jwt.sign({
            id:user.id,
            First_name:user.First_name,
            roleId:user.RoleId
        },secrete,{expiresIn:'1d'})
    },
    parse_auth:(token)=>{
        return token ? token.replace('Bearer ',''):null
    },

    getUserId:(tokene)=>{
        let Userid=-1
        let token=module.exports.parse_auth(tokene)
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
                return Userid.toString();
            }catch{

            }
        }else{
            console.log({err:"you are not authenticated bitch"})
        }
    },
    
    getRoleId:(tokene)=>{
        let roleid=-1
        let token=module.exports.parse_auth(tokene)
        console.log(token);
        if (token!=null) {
            try{
                jwt.verify(token,secrete,(err,good)=>{
                    if (good) {
                        return roleid=good.roleId
                    }
                })
                if (roleid==-1){
                    console.log("login back bitch token expired");
                }
                return roleid.toString();
            }catch{

            }
        }else{
            console.log({err:"you are not authenticated bitch"})
        }
    }
}