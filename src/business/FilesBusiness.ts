import path from 'path'

export default class FilesBusiness {
    
    public downloadExcelFile() {

        const excelFilePath = path.resolve('src', 'assets', 'tmp', 'arquivo.xlsx')

        return excelFilePath
    }

    public downloadPdfFile() {

        const pdfFilePath = path.resolve('src', 'assets', 'tmp', 'arquivo.pdf')

        return pdfFilePath
    }


}