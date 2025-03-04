import { Command } from 'ckeditor5';
export default class InsertHighlightCommand extends Command {
    value: boolean;
    execute({ value }: {
        value: string;
    }): void;
    refresh(): void;
}
