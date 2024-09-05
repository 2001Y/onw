"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
const vscode = require("vscode");
let path = require('path');
function localize(key, defaultText) {
    return vscode.l10n.t(key, defaultText);
}
function activate(context) {
    let disposable = vscode.commands.registerCommand('open-new-window', async () => {
        const originalClipboard = await vscode.env.clipboard.readText();
        await vscode.commands.executeCommand('copyFilePath');
        let copyTxt = await vscode.env.clipboard.readText();
        let copyUri = vscode.Uri.file(copyTxt);
        try {
            await vscode.workspace.fs.stat(copyUri);
            vscode.commands.executeCommand("vscode.openFolder", copyUri, true);
            vscode.window.showInformationMessage(localize('openNewWindow.success', '{0} を新規ウィンドウで開きます。').replace('{0}', path.basename(copyTxt)));
        }
        catch {
            vscode.window.showErrorMessage(localize('openNewWindow.error', 'フォルダまたはファイルを選択してください。'));
            vscode.window.showErrorMessage(localize('openNewWindow.error', 'フォルダまたはファイルを選択してください。'));
        }
        await vscode.env.clipboard.writeText(originalClipboard);
    });
    context.subscriptions.push(disposable);
    let onw = vscode.commands.registerCommand('ONW-open-file-window', async () => {
        try {
            const options = {
                title: localize('openFileWindow.dialogTitle', 'ファイルを新規ウィンドウで開く'),
                canSelectMany: false,
                canSelectFolders: true
            };
            const result = await vscode.window.showOpenDialog(options);
            if (!result) {
                return;
            }
            const selectedFile = result[0];
            console.log(selectedFile);
            vscode.commands.executeCommand("vscode.openFolder", selectedFile);
            vscode.window.showInformationMessage(localize('openFileWindow.success', '{0} を新規ウィンドウで開きます。').replace('{0}', path.basename(selectedFile.fsPath)));
        }
        catch {
            vscode.window.showErrorMessage(localize('openFileWindow.error', 'フォルダまたはファイルを選択してください。'));
        }
    });
    context.subscriptions.push(onw);
}
exports.activate = activate;
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map