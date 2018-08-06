
interface Document {
    fileName: string,
    languageId: string,
    timer: number

}

interface DocumentStore {
    [key: string]: Document
}

export {Document, DocumentStore}