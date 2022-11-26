const Express = require('express')

const app = Express()
const port = process.env.PORT || 3333

const siteRouter = require('./routes/site')

app.use('/site', siteRouter)

app.listen(port, () => {
    console.log(`Server listening on port ${port}...`)
})