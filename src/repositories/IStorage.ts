// Generic file storage interface
export interface IStorage {
    save<T>(data: T[]): void;
    load<T>(): T[];
}
