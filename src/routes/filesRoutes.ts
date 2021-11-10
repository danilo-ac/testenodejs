import express from 'express'
import filesController from '../controller/FilesController'

export const filesRoutes = express.Router()

filesRoutes.get("/arquivo.xlsx",filesController.downloadExcelFile)