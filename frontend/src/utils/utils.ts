export function handleLongtext(text: string, maxLength: number = 300): string {
    if (text.length <= maxLength) {
        return text;
    }
    return text.substring(0, maxLength) + '...';
}