const nodemailer = require('nodemailer')
const transporter = nodemailer.createTransport(
    {
        service: 'gmail',
        auth: {
            user: 'shaileshvpatel18@gmail.com',
            pass: 'xtwy elkm rjqr xgcl'
        }
    }
)

async function sendMailer(to,subject,html){
    const option = {
        from:'shaileshvpatel18@gmail.com',
        to:to, 
        subject:subject,
        html:html
    }
   await transporter.sendMail(option,(err, info)=>{
        if(err){
            console.log(err)
        }else{
            console.log(info)
        }
    })
}

module.exports = sendMailer