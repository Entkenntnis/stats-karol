export default (App) => {
  App.express.post("/pageview", (req, res) => {
    App.incrementPageview()
    res.send("ok")
  })

  App.express.get("/metrics", (req, res) => {
    res.set("Content-Type", "text/plain; version=0.0.4; charset=utf-8")
    res.send(renderMetrics())
  })

  function renderMetrics() {
    const lines = []
    lines.push("# HELP pageview_total Total number of pageviews")
    lines.push("# TYPE pageview_total counter")
    lines.push(`pageview_total ${App.metrics.pageviewCounter}`)
    return lines.join("\n") + "\n"
  }
}
