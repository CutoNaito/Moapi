import { writeFile } from 'fs';

export class Logger {
    path: string;

    constructor(path: string) {
        this.path = path;
    }

    log(input: string) {
        writeFile(this.path, input, (err) => {
            if (err) {
                console.log(err);
            }
        });
    }
}