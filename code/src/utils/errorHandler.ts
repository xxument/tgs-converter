export class ErrorHandler {
    public static handle(error: unknown, userMessage: string): void {
        console.error(userMessage, error);
        alert(userMessage);
    }
}