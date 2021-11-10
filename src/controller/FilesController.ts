import FilesBusiness from "../business/FilesBusiness";
import { Request, Response } from "express";


export class FilesController {

    constructor(
        private filesBusiness: FilesBusiness
    ) { }


    public async downloadExcelFile(req: Request, res: Response): Promise<any> {

        try {

            const filePath = filesBusiness.downloadExcelFile()

            res
                .status(200)
                .set({ 'Content-Disposition': `attachment; filename=arquivo.xlsx`, 'Content-Type': 'xlsx' })
                .download(filePath)

        } catch (error: any) {
            res
                .status(error.code || 500)
                .send(error.message || "Internal Error")
                .end()
        }
    }


}

const filesBusiness = new FilesBusiness();
const filesController = new FilesController(filesBusiness);

export default filesController;