export default (App) => {
  void (async function start() {
    await App.db.sync()
    App.server.listen(3006, () => {
      console.log("server started on port 3006")
    })
  })()
}
