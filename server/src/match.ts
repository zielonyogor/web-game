import crypto, { randomBytes } from 'crypto';

export function generateMatchID() : string {
    return crypto.randomBytes(6).toString("base64url");
}

export function handleConnection() {
    
}