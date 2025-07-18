"use strict";
/**
 * Kenum - A utility for creating enum-like objects with namespaced keys
 *
 * Creates objects where keys are prefixed with a namespace, supporting both
 * simple key mapping and value assignment syntax.
 */
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Parses template literal content into individual tokens
 * Handles both interpolated expressions and whitespace properly
 * Preserves assignment syntax (KEY=value) as single tokens
 */
function parseTemplateContent(strings, expressions) {
    // Interweave strings and expressions
    const parts = [];
    for (let i = 0; i < strings.length; i++) {
        parts.push(strings[i]);
        if (i < expressions.length) {
            parts.push(String(expressions[i]));
        }
    }
    // Join all parts to get the complete text
    const fullText = parts.join('');
    // Split into lines and process each line
    const lines = fullText.split(/\n/);
    const tokens = [];
    for (const line of lines) {
        const trimmedLine = line.trim();
        if (!trimmedLine)
            continue;
        // Check if this line contains an assignment
        const assignmentMatch = trimmedLine.match(/^(\S+)\s*=\s*(.+)$/);
        if (assignmentMatch) {
            // This is a full assignment on one line: "KEY = value"
            tokens.push(`${assignmentMatch[1]}=${assignmentMatch[2]}`);
        }
        else if (trimmedLine.includes('=')) {
            // This might be a partial assignment due to interpolation
            // Split on whitespace and let the assignment parser handle it later
            tokens.push(...trimmedLine.split(/\s+/).filter(part => part.length > 0));
        }
        else {
            // Regular tokens, split on whitespace
            tokens.push(...trimmedLine.split(/\s+/).filter(part => part.length > 0));
        }
    }
    return tokens;
}
/**
 * Parses a key-value assignment in the format "KEY=value" or "KEY = value"
 * Returns null if no assignment syntax is found
 */
function parseAssignment(token) {
    const assignmentMatch = token.match(/^([^=]+?)=(.+)$/);
    if (!assignmentMatch)
        return null;
    return {
        key: assignmentMatch[1].trim(),
        value: assignmentMatch[2].trim()
    };
}
/**
 * Creates a kenum function for a given namespace
 */
function createKenumFunction(namespace) {
    return (strings, ...expressions) => {
        // Handle case where called as function instead of template literal
        if (strings === undefined) {
            console.warn('kenum should be used with template literals, not as a function call');
            return {};
        }
        const tokens = parseTemplateContent(strings, expressions);
        const result = {};
        for (const token of tokens) {
            const assignment = parseAssignment(token);
            if (assignment) {
                // Handle assignment syntax: KEY=value -> "namespace/KEY:value"
                result[assignment.key] = `${namespace}/${assignment.key}:${assignment.value}`;
            }
            else {
                // Handle simple key: KEY -> "namespace/KEY"
                result[token] = `${namespace}/${token}`;
            }
        }
        return result;
    };
}
/**
 * Main kenum proxy that intercepts property access to create namespaced enum functions
 */
const kenum = new Proxy({}, {
    get(_target, namespace) {
        if (typeof namespace !== 'string') {
            throw new Error('Kenum namespace must be a string');
        }
        return createKenumFunction(namespace);
    }
});
exports.default = kenum;
module.exports = kenum;
module.exports.default = kenum;
//# sourceMappingURL=index.js.map