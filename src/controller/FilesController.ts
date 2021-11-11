import FilesBusiness from "../business/FilesBusiness";
import { Request, Response } from "express";
import { FILE_URI_PARAMS } from "../model/FileModel";


export class FilesController {

    constructor(
        private filesBusiness: FilesBusiness
    ) { }


    public async downloadFile(req: Request, res: Response): Promise<any> {

        if (req.params[FILE_URI_PARAMS.FILE_NAME] === "arquivo.xlsx") {

            try {

                const filePath = filesBusiness.downloadExcelFile()

                res
                    .status(200)
                    .download(filePath)

            } catch (error: any) {
                res
                    .status(error.code || 500)
                    .send(error.message || "Internal Error")
                    .end()
            }
        }


        if (req.params[FILE_URI_PARAMS.FILE_NAME] === "arquivo.pdf") {

            try {

                const filePath = filesBusiness.downloadPdfFile()

                res
                    .status(200)
                    .download(filePath)

            } catch (error: any) {
                res
                    .status(error.code || 500)
                    .send(error.message || "Internal Error")
                    .end()
            }
        }
    }

}

const filesBusiness = new FilesBusiness();
const filesController = new FilesController(filesBusiness);

export default filesController;