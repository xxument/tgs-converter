interface FileData {
    name: string;
    content: Uint8Array;
}

export class FileHandler {
    private readonly input: HTMLInputElement;

    constructor() {
        this.input = document.createElement('input');
        this.input.type = 'file';
    }

    public selectAndReadFile(): Promise<FileData | null> {
        return new Promise((resolve, reject) => {
            const handleFileSelect = () => {
                if (this.input.files && this.input.files.length > 0) {
                    const file = this.input.files[0];
                    this.readFileContent(file).then(resolve).catch(reject);
                } else {
                    resolve(null);
                }
                this.input.removeEventListener('change', handleFileSelect);
                this.input.value = '';
            };

            this.input.addEventListener('change', handleFileSelect, { once: true });
            this.input.click();
        });
    }

    private readFileContent(file: File): Promise<FileData> {
        const reader = new FileReader();
        return new Promise((resolve, reject) => {
            reader.onload = () => {
                resolve({
                    name: file.name,
                    content: new Uint8Array(reader.result as ArrayBuffer),
                });
            };
            reader.onerror = () => reject(new Error('Не удалось прочитать файл.'));
            reader.readAsArrayBuffer(file);
        });
    }
}