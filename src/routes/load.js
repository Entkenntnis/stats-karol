export default (App) => {
  App.express.get('/load/:id', async (req, res) => {
    try {
      const publicId = req.params.id
      const entry = await App.db.LegacyShare.findOne({ where: { publicId } })
      res.send(entry.content)
      return
    } catch (e) {
      console.log(e)
    }
    res.send('bad')
  })
}
