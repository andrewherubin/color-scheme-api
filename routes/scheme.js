const Express = require('express')
const Image = require('image-js')

const router = Express.Router()

router.get('/', async function(req, res) {
    const image = await Image.Image.load(__dirname+'/siteIMG/screenshot.png')
    const colors = [[],[]]
    for (let i = 0; i < image.data.length; i+=4) {
        const color = {
            r: image.data[i],
            g: image.data[i+1],
            b: image.data[i+2]
        }
        processColor(color, colors)
    }
    colors.sort((a,b)=>{return a[1]-b[1]})
    const len = colors[0].length > 8 ? 8 : colors[0].length
    const target = []
    colors[0].splice(0, len).forEach((color) => {
        let hex = '#'
        hex += formatHex(color.r)
        hex += formatHex(color.g)
        hex += formatHex(color.b)
        target.push(hex)
    })
    console.log(`Color scheme found: ${target}`)
    res.json({ colors: target })
})

module.exports = router

function processColor(color, colors) {
    for (let i = 0; i < colors[0].length; ++i) {
        if ((Math.abs(color.r-colors[0][i].r)+Math.abs(color.g-colors[0][i].g)+Math.abs(color.b-colors[0][i].b)) < 75) {
            ++colors[1][i]
            return true
        }
    }
    colors[0].push(color)
    colors[1].push(1)
    return false
}

function formatHex(num) {
    const hex = num.toString(16)
    return hex.length === 1 ? '0'+hex : hex
}