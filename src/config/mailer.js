import nodemailer from 'nodemailer'
const transporter = nodemailer.createTransport({
    service : 'gmail',
    auth : {
        user : process.env.EMAIL,
        pass : process.env.PASS
    }
})


export default transporter