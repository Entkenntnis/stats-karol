export default (App) => {
  App.express.post('/persistent_event', async (req, res) => {
    try {
      const { key, value } = req.body

      if (
        typeof key !== 'string' ||
        key.length === 0 ||
        key.length > 256 ||
        typeof value !== 'string'
      ) {
        res.status(400).send('invalid input')
        return
      }

      await App.db.PersistentEvent.create({ key, value })
      res.status(201).send('ok')
      return
    } catch (e) {
      console.log(e)
    }
    res.status(500).send('internal error')
  })
}
