import { Address } from 'viem';

// Environment name
export const VITE_ENV_NAME = import.meta.env.VITE_ENV_NAME as string;

// API endpoint
export const VITE_SERVER_ENDPOINT_URL = import.meta.env.VITE_SERVER_ENDPOINT_URL as string;

// Contract address
export const VITE_CONTRACT_ADDRESS = import.meta.env.VITE_CONTRACT_ADDRESS as Address;

// RPC URL
export const VITE_RPC_URL = import.meta.env.VITE_RPC_URL as string;
