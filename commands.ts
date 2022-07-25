export default class CommandHandler {
    commands = {
        "login": () => 'Welcome to the Terminal. Type "help" for a list of commands.',
        "help": () => 'Available Commands: ' + Object.keys(this.commands).join(", "),
        "test": () => "test",
    }

    // Commands that aren't listed when executing help
    secretcommands = {
        "secret": () => "Woo hoo, you found a secret command!",
    }

    // Commands that aren't pushed to github
    topsecretcommands = {}

    setup() {
        Deno.readFile("./secrets.json").then(data => {
            const decoder = new TextDecoder("utf-8");
            const secrets = JSON.parse(decoder.decode(data));
            console.log(secrets);
            Object.entries(secrets).forEach(([key, value]) => {
                (this.topsecretcommands as any)[key] = () => eval(value as string);
            });
        }, _error => {})
    }

    handleCommand(command: string): Promise<Answer> {
        return new Promise((resolve) => {
            const allcommands = {...this.commands, ...this.secretcommands, ...this.topsecretcommands};
            Object.entries(allcommands).forEach(([key, value]) => {
                if (command.startsWith(key)) {
                    resolve({ type: 'text', content: value() })
                }
            });
        });
    }
}

type Answer = {
    type: 'text';
    content: string;
}