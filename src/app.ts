import { UIController } from './dom/uiController';
import { FileHandler } from './files/fileHandler';
import { FileSaver } from './files/fileSaver';
import { CompressionStrategy } from './compression/compressionStrategy';
import { ErrorHandler } from './utils/errorHandler';
import { TARGET_FILE_EXTENSION } from './utils/constants';

export class App {
    constructor(
        private readonly uiController: UIController,
        private readonly fileHandler: FileHandler,
        private readonly fileSaver: FileSaver,
        private readonly compressionStrategy: CompressionStrategy
    ) {}

    public initialize(): void {
        this.uiController.onUploadRequest(() => this.processFile());
    }

    private async processFile(): Promise<void> {
        try {
            const fileData = await this.fileHandler.selectAndReadFile();
            if (!fileData) {
                return;
            }

            const { name, content } = fileData;
            const compressedContent = await this.compressionStrategy.compress(content);
            const newFileName = this.generateNewFileName(name);
            this.fileSaver.save(compressedContent, newFileName);
        } catch (error) {
            ErrorHandler.handle(error, 'Произошла ошибка при обработке файла.');
        }
    }

    private generateNewFileName(originalName: string): string {
        const lastDotIndex = originalName.lastIndexOf('.');
        const baseName = lastDotIndex > 0 ? originalName.substring(0, lastDotIndex) : originalName;
        return `${baseName}${TARGET_FILE_EXTENSION}`;
    }
}