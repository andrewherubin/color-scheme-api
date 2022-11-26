const Express = require('express')
const BodyParser = require('body-parser')
const Puppeteer = require('puppeteer')

const router = Express.Router()
const jsonParser = BodyParser.json()

router.get('/', (req, res) => {
    res.send('Site page GET request.')
})

router.post('/', jsonParser, async function(req, res) {
    try {
        const Browser = await Puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] })
        const Page = await Browser.newPage()
        await Page.goto(req.body.url)
        await Page.screenshot({ path: __dirname+'/siteIMG/screenshot.png'})
        await Page.close()
        await Browser.close()
        res.send('screenshot complete.')
    }
    catch(err) {
        res.send(err)
    }
})

module.exports = router