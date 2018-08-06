'use strict';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { Document, DocumentStore} from './validation';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

    let icon = new Icon(context)
    setInterval(() => {
        icon.run()
    }, 1000)

    vscode.window.onDidChangeWindowState(icon.showTimer)

    context.subscriptions.push(icon);
}

class Icon {

    private icon = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right)
    private currentTime: number = 0
    private timer: NodeJS.Timer = setInterval(() => null, 0)
    public context: vscode.ExtensionContext

    constructor(context: vscode.ExtensionContext) {
        this.context = context

        this.showTimer()
    }

    public run() {
        this.showTimer()
        this.manageTime(this.context)
    }

    public showTimer() {

        let innerText = this.currentTime

        this.icon.text = innerText.toString()

        this.icon.show()
    }

    public manageTime(context: vscode.ExtensionContext) {
        
        let editor = vscode.window.activeTextEditor
        if(!editor) {
            return
        }

        let document: Document = {
            fileName: editor.document.fileName,
            languageId: editor.document.languageId,
            timer: 0
        }
        // console.log(document)
        let documents: DocumentStore | undefined = context.globalState.get('documents')
        if(!documents) {
            documents = {}
        }
        if(documents[document.fileName]) {
            document = documents[document.fileName]
        }

        document.timer += 1

        this.currentTime = document.timer

        documents[document.fileName] = document
        context.globalState.update('documents', documents)

    }
    

    dispose() {
        clearInterval(this.timer)
        this.icon.dispose()
    }

}

// this method is called when your extension is deactivated
export function deactivate() {
}