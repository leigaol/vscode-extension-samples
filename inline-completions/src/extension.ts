import * as vscode from 'vscode';

// Try it out in `playground.js`

export function activate(context: vscode.ExtensionContext) {
	const disposable = vscode.commands.registerCommand(
		'extension.inline-completion-settings',
		() => {
			vscode.window.showInformationMessage('Show settings');
		}
	);

	context.subscriptions.push(disposable);
	let someTrackingIdCounter = 0;
	const l = [`print('Hello World')`];

	function delay(ms: number) {
		return new Promise(resolve => setTimeout(resolve, ms));
	}



	const provider: vscode.InlineCompletionItemProvider = {
		provideInlineCompletionItems: async (document, position, context, token) => {
			console.log(`provideInlineCompletionItems triggered kind = ${context.triggerKind}`);

			if (position.line < 0) {
				return;
			}
			const start = position;
			const end = position;
			const items = l.map(i => {
				return {
					insertText: i,
					range: new vscode.Range(start, end),
					someTrackingId: someTrackingIdCounter++,
				};
			});
			console.log(`# of reco is ${l.length}`);

			return items as MyInlineCompletionItem[];

		},
	};

	const pagination = async () => {
		for (let i = 0; i < 100; i++) {
			l.push('recommendation #' + i.toString());
			await delay(2000);
			console.log(`Get ${i} th paginated response`);
			const editor = vscode.window.activeTextEditor;
			const w = new vscode.CancellationTokenSource;
			if (editor) {
				//provider.provideInlineCompletionItems(editor.document, editor?.selection.active, { triggerKind: 1, selectedCompletionInfo: undefined }, w.token);
			}

		}
	};

	pagination();

	vscode.languages.registerInlineCompletionItemProvider({ pattern: '**' }, provider);

}

interface MyInlineCompletionItem extends vscode.InlineCompletionItem {
	someTrackingId: number;
}
