export default (App) => {
  App.express.get('/load/:id', async (req, res) => {
    try {
      const publicId = req.params.id
      const entry = await App.db.LegacyShare.findOne({ where: { publicId } })
      if (entry) {
        res.send(entry.content)
        return
      }
      res.status(404).send('not found')
      return
    } catch (e) {
      console.log(e)
    }
    res.status(500).send('internal error')
  })
}
