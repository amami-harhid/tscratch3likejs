/**
 * Entity Image(イメージ)
 */
export interface IEntityImage {
    add(name: string): Promise<void>;
    names(): string[];
};