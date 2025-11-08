export interface CompressionStrategy {
    compress(data: Uint8Array): Promise<Uint8Array>;
}