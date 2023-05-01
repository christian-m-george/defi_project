import dotenv from 'dotenv';
dotenv.config()

export default {
  port: 3030,
  dbUri:
    "mongodb+srv://george72:dvBQ7CguvfLhq6y3@cluster0.kbt6yyp.mongodb.net/defi?retryWrites=true&w=majority",
  logLevel: "info",
  secret: "itsasecret",
  accessTokenPrivateKey: `${process.env.ACCESS_TOKEN_PRIVATE_KEY}`,
  refreshTokenPrivateKey: `${process.env.REFRESH_PRIVATE_KEY}`,
  smtp: {
    user: "hn6zu3vvto25fz26@ethereal.email",
    pass: "pt6VGzbVGsSHm1RHh6",
    host: "smtp.ethereal.email",
    port: 587,
    secure: false,
  },
};
