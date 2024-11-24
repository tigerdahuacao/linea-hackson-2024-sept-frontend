import { SIGNATURE_MESSAGE_KEY } from '@/constants';
import {
    LoginMutationData,
    LoginResponse,
    SignatureMessageParams,
    SignatureMessageResult,
} from '@/types/auth';

export function getSignatureMessage({
    address,
    chain,
    nonce,
}: SignatureMessageParams): SignatureMessageResult {
    const timestamp = Date.now();
    const domain = window.location.hostname;
    const type = SIGNATURE_MESSAGE_KEY.TYPE;
    const statement = SIGNATURE_MESSAGE_KEY.STATEMENT;
    const message = `${domain}${address}${statement}${type}${chain.id}${nonce}${timestamp}`;

    return {
        message,
        config: {
            type,
            domain,
            address,
            statement,
            timestamp: String(timestamp),
            nonce: String(nonce),
            chainId: String(chain.id),
        },
    };
}

export async function loginUser(data: LoginMutationData): Promise<LoginResponse> {
    console.log('loginUser', data);

    debugger;
    const envName = import.meta.env.VITE_ENV_NAME;
    if (envName === 'mock') {
        // 模拟 API 调用，返回一个 token
        return new Promise((resolve) => {
            resolve({ success: true, message: 'Login successful', token: 'sample_token_12345' });
        });
    } else if (envName === 'online') {
        const data = await fetch(`${import.meta.env.VITE_SERVER_ENDPOINT_URL}/user/login`, {
            method: 'POST',
        });
        return data.json();
    }
}

export async function logoutUser(token: string): Promise<LoginResponse> {
    console.log('logoutUser', { token });
    // 模拟 API 调用，使用 token
    return new Promise((resolve) => {
        resolve({ success: true, message: 'Logout successful' });
    });
}
