/**
 * Kenum - A utility for creating enum-like objects with namespaced keys
 *
 * Creates objects where keys are prefixed with a namespace, supporting both
 * simple key mapping and value assignment syntax.
 */
export interface KenumResult {
    [key: string]: string;
}
export interface KenumFunction {
    (strings: TemplateStringsArray, ...expressions: unknown[]): KenumResult;
}
export interface Kenum {
    [namespace: string]: KenumFunction;
}
/**
 * Main kenum proxy that intercepts property access to create namespaced enum functions
 */
declare const kenum: Kenum;
export default kenum;
//# sourceMappingURL=index.d.ts.map