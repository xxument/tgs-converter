import { App } from './app';
import { GzipCompressionStrategy } from './compression/gzipCompressionStrategy';
import { UIController } from './dom/uiController';
import { FileHandler } from './files/fileHandler';
import { FileSaver } from './files/fileSaver';

function bootstrap() {
    const uploadButton = document.getElementById('uploadButton') as HTMLButtonElement | null;

    if (!uploadButton) {
        console.error('Кнопка загрузки не найдена.');
        return;
    }

    const uiController = new UIController(uploadButton);
    const fileHandler = new FileHandler();
    const fileSaver = new FileSaver();
    const compressionStrategy = new GzipCompressionStrategy();

    const app = new App(
        uiController,
        fileHandler,
        fileSaver,
        compressionStrategy
    );
    
    app.initialize();
}

bootstrap();