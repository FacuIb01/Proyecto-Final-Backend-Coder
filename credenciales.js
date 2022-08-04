const transporter = nodemailer.createTransport({
    tls:{
        rejectUnauthorized: false
    },
    host: "smtp.gmail.com",
    port: 587,
    auth: {
        user: email,
        type: "OAuth2",
        clientId:"912496448996-bm6v3kosi39v6g4ip1p1vh7o89at99of.apps.googleusercontent.com",
        clientSecret: "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",
        refreshToken:"1//04aOYEDuhJMKxCgYIARAAGAQSNgF-L9IramQU0rE6JLNnjZ5YS7vPMpg_PnhP-E2nAA_ogjIkjwg1r8Bsp9SW4b3uT22Veq2PlQ",
        accessToken:"ya29.A0AVA9y1uSR8ckcFyWj6EQkH47zl607KQEq3Q4nVPCaQYb1VsinlHmPqkmY0MyeH_2I7UPkJWxpdfqVvy4EK8gWi9g5RKXvOAjUBBPhFpq-hwLyALWSV6EDGE202BxSeAvTttZPr3c8LBCVrxldvrj0fGm9AWAYUNnWUtBVEFTQVRBU0ZRRTY1ZHI4TllOWFJuQnZ0M1NJWFBQQVBuSnVfUQ0163"
    } 
})

const authToken = "d9c09cfb8b0e9d19f2cfc5d197cb5e42";
const accountSid = "AC87c21f570fdd185038bb64a2e8ce70d0"