const { VERIFICATION_EMAIL_TEMPLATE } = require("./templates");

const { client, sender } = require("./mailtrapConfig");

//EMAIL VERIFICATION SET UP 
const  verificationEmail = async(email, verificationToken) => {
    const recipients = [
        {
            email,
        }
    ];
    
    // SEND EMAIL SET UP
    try {
        const res = await client.send({
            from: sender,
            to: recipients,
            subject: "Verify your Email",
            // text: `Your verification code is ${verificationToken}`,
            html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", verificationToken),
            category: "Email Verification",
        })
        console.log("Email sent successfully", res);
        
    } catch (error) {
        console.error("Error sending email", error);
        throw new error("Error sending verification email :" &{error});      
    }
}

const welcomeEmail = async(email, name ) => {
    const recipients = [
        {
            email,
        }
    ];
    
    // SEND EMAIL SET UP
    try {
        const res = await client.send({
            from: sender,
            to: recipients,
            subject: "Welcome to Cli-Tech Hub",
            text: `Welcome ${name}`,
            category: "Welcome Email",
        })
        console.log("Email sent successfully", res);
        
    } catch (error) {
        console.error("Error sending email", error);
        throw new error("Error sending welcome email :" &{error});      
    };    
};

module.exports = {verificationEmail, welcomeEmail};