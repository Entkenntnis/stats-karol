import { Server } from 'socket.io'

export default (App) => {
  App.io = new Server(App.server, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST'],
    },
  })

  const sockets = new Map()

  // Cleanup interval to check for inactive sockets every minute
  setInterval(() => {
    const now = Date.now()
    for (const entry of sockets.values()) {
      if (now - entry.lastActive > 180000) {
        // 3 minutes in milliseconds
        // console.log(`Disconnecting inactive user ${userId}`)
        entry.socket.disconnect()
      }
    }
  }, 60000)

  App.io.on('connection', (socket) => {
    const id = socket.id

    // Update lastActive on any socket event
    const updateLastActive = () => {
      const entry = sockets.get(id)
      if (entry) entry.lastActive = Date.now()
    }

    sockets.set(id, { socket, lastActive: Date.now() })
    // console.log(`User ${userId} connected, total online: ${sockets.size}`)

    // Listen to all events to update lastActive
    socket.onAny(updateLastActive)

    // Update online count
    App.io.emit('updateOnlineCount', sockets.size)

    socket.on('spawnHeart', () => {
      App.io.volatile.emit('spawnHeart')
    })

    socket.on('disconnect', () => {
      sockets.delete(id)
      App.io.emit('updateOnlineCount', sockets.size)
      // console.log(`User ${userId} disconnected, total online: ${sockets.size}`)
    })
  })
}
