const nodemailer = require('nodemailer')

class MailService {

    constructor() {
        this.transporter = nodemailer.createTransport({
            service: process.env.MAIL_SERVICE,
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS
            }
        })
    }

    async sendMail(to, activationLink) {
        await this.transporter.sendMail(
            {
                from: process.env.MAIL_USER,
                to,
                subject: 'Активация аккаунта lifeAI',
                text: `http://${process.env.HOST}:${process.env.PORT}/api/activate/${activationLink}`
            },
            (err, info) => {
                if (err)
                    return console.log(err)
                console.log("Message sent " + info.response)
            }
        )
    }

}

module.exports = new MailService()