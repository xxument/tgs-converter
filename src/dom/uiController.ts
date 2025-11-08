export class UIController {
    constructor(private readonly uploadButton: HTMLButtonElement) {}

    public onUploadRequest(callback: () => Promise<void>): void {
        this.uploadButton.addEventListener('click', async () => {
            this.setLoading(true);
            try {
                await callback();
            } finally {
                this.setLoading(false);
            }
        });
    }

    private setLoading(isLoading: boolean): void {
        this.uploadButton.disabled = isLoading;
        this.uploadButton.textContent = isLoading ? 'Обработка...' : 'Загрузить файл';
    }
}