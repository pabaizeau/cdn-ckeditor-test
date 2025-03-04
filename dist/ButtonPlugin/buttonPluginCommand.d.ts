import type { ButtonPluginResponse } from '../types/buttonPlugin.js';
import { Command } from 'ckeditor5';
interface PropsCommand {
    href: string;
    title: string;
}
declare class ButtonPluginCommand extends Command {
    execute(data: PropsCommand): void;
    fetchLinkData(href: string, title: string): Promise<ButtonPluginResponse | null>;
    insertLinkData(editor: any, fetchedData: ButtonPluginResponse | null): void;
}
export default ButtonPluginCommand;
