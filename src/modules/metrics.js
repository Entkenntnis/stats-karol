export default (App) => {
  App.metrics = {
    pageviewCounter: 0,
  }

  App.incrementPageview = () => {
    App.metrics.pageviewCounter += 1
  }
}
