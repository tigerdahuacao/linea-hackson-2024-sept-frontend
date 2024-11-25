import { VITE_ENV_NAME } from '@/config/env';
import { SIGNATURE_MESSAGE_KEY } from '@/constants';

import {
    SignatureMessageParams,
    SignatureMessageResult,
    LoginMutationData,
    LoginResponse,
    AuthError,
    LogoutMutationData,
    LogoutResponse,
} from '@/types/auth';

import { httpClient } from './http-client';

/**
 * Generates a signature message for authentication
 */
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

/**
 * API endpoint for user login
 */
const API_ENDPOINTS = {
    LOGIN: '/user/login',
    LOGOUT: '/user/logout',
} as const;

/**
 * Handles user login with signature verification
 */
export async function loginUser(data: LoginMutationData): Promise<LoginResponse> {
    try {
        if (VITE_ENV_NAME === 'mock') {
            return {
                success: true,
                message: 'Login successful',
                token: 'sample_token_12345',
            };
        }
        if (VITE_ENV_NAME === 'online') {
            const httpResponse = await httpClient.post<LoginResponse>(API_ENDPOINTS.LOGIN, data);
            return httpResponse.data;
        }
        throw new Error('Invalid environment');
    } catch (error) {
        const authError = new Error('Login failed') as AuthError;
        authError.code = 'AUTH_LOGIN_FAILED';
        authError.details = { originalError: error };
        throw authError;
    }
}

/**
 * Handles user logout
 */
export async function logoutUser({ token, user }: LogoutMutationData): Promise<LogoutResponse> {
    try {
        if (VITE_ENV_NAME === 'mock') {
            return {
                message: 'Logout successful',
            };
        }
        if (VITE_ENV_NAME === 'online') {
            const httpResponse = await httpClient.post<LoginResponse>(API_ENDPOINTS.LOGOUT, {
                token,
                user,
            });
            return httpResponse.data;
        }
        throw new Error('Invalid environment');
    } catch (error) {
        const authError = new Error('Logout failed') as AuthError;
        authError.code = 'AUTH_LOGOUT_FAILED';
        authError.details = { originalError: error };
        throw authError;
    }
}
