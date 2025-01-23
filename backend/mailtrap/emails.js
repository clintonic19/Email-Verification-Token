const { VERIFICATION_EMAIL_TEMPLATE, PASSWORD_RESET_REQUEST_TEMPLATE, PASSWORD_RESET_SUCCESS_TEMPLATE } = require("./templates");

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
            subject: "Email Verification",
            // text: `Your verification code is ${verificationToken}`,
            html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", verificationToken), //HTML TEMPLATE, replace the placeholder verificationCode with the actual verificationToken from DB 
            category: "Email Verification",
        })
        console.log("verification Email Sent Successfully", res);
        
    } catch (error) {
        console.error("Error sending email", error);
        throw new error("Error sending verification email :" &{error});      
    }
}

//WELCOME EMAIL SET UP
const welcomeEmail = async(email, name ) => {
    const recipients = [
        {
            email,
        }
    ];
    
    // SEND EMAIL SET UP
    /**
     * 1. Send email to user
     * 2. Add email to queue
     * 
     */
    try {
        const res = await client.send({
            from: sender,
            to: recipients,
            // subject: "Welcome to Cli-Tech Hub",
            // text: `Welcome ${name}`,
            // category: "Welcome Email",
            template_uuid: "718ada08-bda6-4245-bc32-f9c5fd7899b4",
            template_variables: {
              "company_info_name": "Cli-Tech Hub",
              "name": name
            }
        })
        console.log("Welcome Email Sent Successfully", res);
        
    } catch (error) {
        console.error("Error sending email", error);
        throw new error("Error sending welcome email :" &{error});      
    };    
};

//PASSWORD RESET EMAIL SET UP
const passwordResetEmail = async(email, resetURL ) => {
    const recipients = [
        {
            email,
        }
    ];
    
    // SEND PASSWORD RESET EMAIL SET UP
    try {
        const res = await client.send({
            from: sender,
            to: recipients,
            subject: "Password Reset",
            html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetURL), //HTML TEMPLATE, replace the placeholder resetURL with the actual resetURL.
            category: "Password Reset",
        })
        console.log("Password Reset Email Sent Successfully", res);
        
    } catch (error) {
        console.error("Error sending email", error);
        throw new error("Error sending password reset email :" &{error});      
    }
}

//PASSWORD RESET SUCCESS EMAIL SET UP
passwordResetSuccessEmail = async(email) => {
    const recipients = [
        {
            email,
        }
    ];
    
    // SEND PASSWORD RESET EMAIL SET UP
    try {
        const res = await client.send({
            from: sender,
            to: recipients,
            subject: "Successful Password Reset",
            html: PASSWORD_RESET_SUCCESS_TEMPLATE, //HTML TEMPLATE, replace the placeholder resetURL with the actual resetURL.
            category: "Successful Password Reset",
        })
        console.log("Successful Password Reset Email Sent Successfully", res);
        
    } catch (error) {
        console.error("Error sending email", error);
        throw new error("Error sending successful password reset email :" &{error});      
    }

}

//
module.exports = {verificationEmail, welcomeEmail, passwordResetEmail, passwordResetSuccessEmail};
