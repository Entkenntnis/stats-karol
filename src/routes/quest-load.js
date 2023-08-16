module.exports = (App) => {
  App.express.get('/quest/load/:id', async (req, res) => {
    try {
      const publicId = req.params.id
      const entry = await App.db.QuestShare.findOne({ where: { publicId } })
      res.send(entry.content)
      return
    } catch (e) {
      console.log(e)
    }
    res.send('bad')
  })
}
