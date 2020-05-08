const fs = require('fs')
fs.writeFileSync('./.env', `API_KEY=${process.env.API_KEY}\nPROXY=${process.env.PROXY}`)