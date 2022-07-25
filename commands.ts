const commands = {
    "login": () => 'Welcome to the Terminal. Type "help" for a list of commands.',
    "help": () => 'Available Commands: '+Object.keys(commands).join(", "),
    "test": () => "test",
}

export default function handleCommand(command: string): Promise<Answer> {
    return new Promise((resolve) => {
        Object.entries(commands).forEach(([key, value]) => {
            if (command.startsWith(key)) {
                resolve({type: 'text', content: value()})
            }
        });
    });
}

type Answer = {
    type: 'text';
    content: string;
}