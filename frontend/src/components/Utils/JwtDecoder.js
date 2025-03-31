export function decodeJWT(token) {
    const parts = token.split('.');
    if (parts.length !== 3) {
        throw new Error('Invalid token');
    }

    const payload = parts[1]; // The second part is the payload
    const decodedPayload = atob(payload.replace(/-/g, '+').replace(/_/g, '/')); // Base64 URL-decoding
    return JSON.parse(decodedPayload); // Convert the decoded string into an object
}