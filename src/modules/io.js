const io = require('socket.io')

module.exports = (App) => {
  App.io = io(App.server, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST'],
    },
  })

  const sockets = new Map()

  // Cleanup interval to check for inactive sockets every minute
  setInterval(() => {
    const now = Date.now()
    for (const [userId, entry] of sockets.entries()) {
      if (now - entry.lastActive > 180000) {
        // 3 minutes in milliseconds
        // console.log(`Disconnecting inactive user ${userId}`)
        entry.socket.disconnect()
      }
    }
  }, 60000)

  App.io.on('connection', (socket) => {
    const userId = socket.handshake.auth.userId
    if (!userId) {
      // console.error('User ID is required for socket connection')
      socket.disconnect()
      return
    }

    // Update lastActive on any socket event
    const updateLastActive = () => {
      const entry = sockets.get(userId)
      if (entry) entry.lastActive = Date.now()
    }

    // Initialize entry with current time and socket reference
    const newEntry = {
      socket,
      lastActive: Date.now(),
    }

    if (sockets.has(userId)) {
      sockets.get(userId).socket.disconnect()
    }

    sockets.set(userId, newEntry)
    console.log(`User ${userId} connected, total online: ${sockets.size}`)

    // Listen to all events to update lastActive
    socket.onAny(updateLastActive)

    // Update online count
    App.io.emit('updateOnlineCount', sockets.size)

    socket.on('spawnHeart', () => {
      App.io.volatile.emit('spawnHeart')
    })

    socket.on('disconnect', () => {
      sockets.delete(userId)
      App.io.emit('updateOnlineCount', sockets.size)
      console.log(`User ${userId} disconnected, total online: ${sockets.size}`)
    })

    App.io.on('connection_error', (err) => {
      console.log(err.code) // 3
      console.log(err.message) // "Bad request"
      console.log(err.context) // { name: 'TRANSPORT_MISMATCH', transport: 'websocket', previousTransport: 'polling' }
    })
  })
}
