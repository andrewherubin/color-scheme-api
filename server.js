const Express = require('express')
const Cors = require('cors')

const app = Express()
const port = process.env.PORT || 3333

const cors = Cors()
const siteRouter = require('./routes/site')
const schemeRouter = require('./routes/scheme')

app.use(cors)
app.use('/site', siteRouter)
app.use('/scheme', schemeRouter)

app.listen(port, () => {
    console.log(`Server listening on port ${port}...`)
})