import pako from 'pako';
import { CompressionStrategy } from './compressionStrategy';

export class GzipCompressionStrategy implements CompressionStrategy {
    public async compress(data: Uint8Array): Promise<Uint8Array> {
        try {
            return pako.gzip(data);
        } catch (error) {
            throw new Error('Gzip compression failed');
        }
    }
}