import { Address, Chain } from 'viem';

export interface LoginResponse {
    success: boolean;
    message: string;
    token?: string;
}

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

export interface SignatureMessageParams {
    address: Address;
    chain: Chain;
    nonce: number;
}

export interface SignatureMessageResult {
    config: LoginMutationData['message'];
    message: string;
}
