const Express = require('express')
const BodyParser = require('body-parser')
const Puppeteer = require('puppeteer')

const router = Express.Router()
const jsonParser = BodyParser.json()

router.get('/', (req, res) => {
    res.send('Site page GET request.')
})

router.post('/', jsonParser, async function(req, res) {
    const Browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] })
    const Page = await Browser.newPage()
    try {
        await Page.goto(req.body.url)
        await Page.screenshot({ path: __dirname+'/siteIMG/screenshot.png'})
    }
    catch(err) {
        res.send('ERROR!')
    }
    res.send('screenshot complete.')
    await Page.close()
    await Browser.close()
})

module.exports = router