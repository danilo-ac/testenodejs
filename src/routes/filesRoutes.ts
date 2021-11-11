import express from 'express'
import filesController from '../controller/FilesController'
import { FILE_URI_PARAMS } from '../model/FileModel'

export const filesRoutes = express.Router()

filesRoutes.get(`/:${FILE_URI_PARAMS.FILE_NAME}`, filesController.downloadFile)