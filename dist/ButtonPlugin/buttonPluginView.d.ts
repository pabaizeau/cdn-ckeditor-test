import type { Locale } from 'ckeditor5';
import { View, LabeledFieldView, ButtonView } from 'ckeditor5';
import './buttonPlugin.css';
export default class ButtonPluginFormView extends View {
    urlInputView: LabeledFieldView;
    titleInputView: LabeledFieldView;
    saveButtonView: ButtonView;
    cancelButtonView: ButtonView;
    childViews: any;
    constructor(locale: Locale);
    render(): void;
    focus(): void;
    _createInput(label: string): LabeledFieldView<import("ckeditor5").InputTextView>;
    _createButton(label: string, icon: string, className: string): ButtonView;
}
