import type { Server as HTTPServer } from 'node:http'
import type { Server as IOServer } from 'socket.io'
import type { Express } from 'express'
import {
  Model,
  type CreationOptional,
  type InferAttributes,
  type InferCreationAttributes,
  type ModelStatic,
  type Op,
  type Sequelize,
} from 'sequelize'

class QuestShare extends Model<
  InferAttributes<QuestShare>,
  InferCreationAttributes<QuestShare>
> {
  declare id: CreationOptional<number>
  declare publicId: string
  declare content: string
}

export class LegacyShare extends Model<
  InferAttributes<LegacyShare>,
  InferCreationAttributes<LegacyShare>
> {
  declare id: CreationOptional<number>
  declare publicId: string
  declare content: string
}

export class PersistentEvent extends Model<
  InferAttributes<PersistentEvent>,
  InferCreationAttributes<PersistentEvent>
> {
  declare id: CreationOptional<number>
  declare key: string
  declare value: string
}

export class ExperimentEvent extends Model<
  InferAttributes<ExperimentEvent>,
  InferCreationAttributes<ExperimentEvent>
> {
  declare id: string
  declare event: string
}

export interface App {
  db: {
    Op: typeof Op
    Sequelize: Sequelize
    QuestShare: ModelStatic<QuestShare>
    LegacyShare: ModelStatic<LegacyShare>
    PersistentEvent: ModelStatic<PersistentEvent>
    ExperimentEvent: ModelStatic<ExperimentEvent>
  }
  server: HTTPServer
  secrets: {
    db_password: string
    backend_password: string
  }
  express: Express
  io: IOServer
  metrics: {
    pageviewCounter: number
    heartsCounter: number
    incrementPageview: () => void
    incrementHearts: () => void
  }
}
