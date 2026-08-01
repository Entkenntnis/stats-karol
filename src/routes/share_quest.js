export default (App) => {
  App.express.post('/quest_share', async (req, res) => {
    try {
      if (typeof req.body.content !== 'string') {
        res.status(400).send('invalid input')
        return
      }

      let publicId = generateFriendlyUrl()
      let tries = 0
      while ((await checkIfPublicIdExists(publicId)) && tries++ < 10) {
        publicId = generateFriendlyUrl()
      }
      if (tries == 10) {
        res.status(500).send('not able to generate unique id')
        return
      }

      await App.db.QuestShare.create({ publicId, content: req.body.content })
      res.send(publicId)
      return
    } catch (e) {
      console.log(e)
    }
    res.status(500).send('internal error')
  })

  async function checkIfPublicIdExists(publicId) {
    const count = await App.db.QuestShare.count({
      where: {
        publicId,
      },
    })
    return count > 0
  }
}

function generateFriendlyUrl() {
  const characters = 'ABCDEFGHJKMNPQRSTUVWXYZ23456789'
  let url = ''
  for (let i = 0; i < 4; i++) {
    url += characters.charAt(Math.floor(Math.random() * characters.length))
  }
  return url
}
