"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
const vscode = require("vscode");
let path = require('path');
function activate(context) {
    let disposable = vscode.commands.registerCommand('open-new-window', async () => {
        // //右クリックから指定したファイル/フォルダ
        // let explorerClickPath = vscode.Uri.file(context?.path || "");
        // //開いてるファイル
        // let activeFile = vscode.Uri.file(vscode.window.activeTextEditor?.document.uri.path || "");
        const originalClipboard = await vscode.env.clipboard.readText();
        await vscode.commands.executeCommand('copyFilePath');
        let copyTxt = await vscode.env.clipboard.readText();
        let copyUri = vscode.Uri.file(copyTxt);
        try {
            await vscode.workspace.fs.stat(copyUri);
            vscode.commands.executeCommand("vscode.openFolder", copyUri, true);
            vscode.window.showInformationMessage(path.basename(copyTxt) + " を新規ウィンドウで開きます。");
        }
        catch {
            vscode.window.showErrorMessage("フォルダまたはファイルを選択してください。");
        }
        await vscode.env.clipboard.writeText(originalClipboard);
    });
    context.subscriptions.push(disposable);
}
exports.activate = activate;
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map