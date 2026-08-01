export default (App) => {
  App.express.post('/quest_share', async (req, res) => {
    try {
      let publicId = generateFriendlyUrl()
      let tries = 0
      while ((await checkIfPublicIdExists(publicId)) && tries++ < 10) {
        publicId = generateFriendlyUrl()
      }
      if (tries == 10) {
        res.send('not able to generate unique id')
        return
      }

      await App.db.QuestShare.create({
        publicId,
        content: typeof req.body.content === 'string' ? req.body.content : '',
      })
      res.send(publicId)
      return
    } catch (e) {
      console.log(e)
    }
    res.send('bad')
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
