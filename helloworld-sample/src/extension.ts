// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

export interface Customization {
    arn: string;
    name?: string;
    description?: string;
}
export type Customizations = Customization[];

interface AwsToolkitApi {
	setCustomization(customization: Customization): boolean
	listAvailableCustomizations(): Customizations
}

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "helloworld-sample" is now active!');




	const ext = vscode.extensions.getExtension<AwsToolkitApi>('amazonwebservices.aws-toolkit-vscode');
	const api = ext?.exports;

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	const disposable = vscode.commands.registerCommand('extension.list', async () => {
		// The code you place here will be executed every time your command is executed

		// Display a message box to the user
		const r = await api?.listAvailableCustomizations();
		console.log(r);
	});

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	const disposable2 = vscode.commands.registerCommand('extension.select', async () => {
		// The code you place here will be executed every time your command is executed
		const r = await api?.listAvailableCustomizations();
		if (r && r[2]){
			console.log(`Selecting ${r[2].arn}`);
			await api?.setCustomization(r[2]);
		}
	});
	context.subscriptions.push(disposable2);
}
