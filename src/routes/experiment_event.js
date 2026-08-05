export default (App) => {
  App.express.post("/experiment_event", async (req, res) => {
    try {
      const { id, event } = req.body

      if (
        typeof id !== "string" ||
        id.length === 0 ||
        id.length > 21 ||
        typeof event !== "string" ||
        event.length === 0 ||
        event.length > 256
      ) {
        res.status(400).send("invalid input")
        return
      }

      await App.db.ExperimentEvent.findOrCreate({
        where: { id },
        defaults: { id, event },
      })
      res.status(201).send("ok")
      return
    } catch (e) {
      console.log(e)
    }
    res.status(500).send("internal error")
  })
}
