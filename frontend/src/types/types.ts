export interface WinItem {
    id: string;
    text: string;
    date: string;
}

export interface InputFormProps {
    onAddItem: (newItem: string) => void;
}