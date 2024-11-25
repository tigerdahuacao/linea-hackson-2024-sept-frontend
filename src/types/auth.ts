import { Address, Chain } from 'viem';

// API Response Types
export interface LoginResponse {
    success: boolean;
    message: string;
    token: string;
}

// API Request Types
export interface LoginMutationData {
    message: {
        domain: string;
        address: Address;
        statement: string;
        type: string;
        chainId: string;
        nonce: string;
        timestamp: string;
    };
    signature: string;
}

export interface LogoutResponse {
    message: string;
}

export interface LogoutMutationData {
    user: Address;
    token: string;
}

// Utility Types
export interface SignatureMessageParams {
    address: Address;
    chain: Chain;
    nonce: number;
}

export interface SignatureMessageResult {
    config: LoginMutationData['message'];
    message: string;
}

// Error Types
export interface AuthError extends Error {
    code?: string;
    details?: Record<string, any>;
}
