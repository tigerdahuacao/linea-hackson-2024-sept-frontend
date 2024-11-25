import { useMutation } from '@tanstack/react-query';
import { useEffect, useCallback } from 'react';
import { useLocalStorage } from 'react-use';
import { Address } from 'viem';
import { useAccount, useDisconnect, usePublicClient, useSignMessage } from 'wagmi';

import { STORAGE_KEYS } from '@/constants';

import {
    LoginMutationData,
    LoginResponse,
    AuthError,
    LogoutResponse,
    LogoutMutationData,
} from '@/types/auth';
import { getSignatureMessage, loginUser, logoutUser } from '@/utils/auth';

export function useAutoLogin() {
    const { address, chain, isConnected } = useAccount();
    const publicClient = usePublicClient();
    const { signMessageAsync } = useSignMessage();
    const { disconnect } = useDisconnect();
    const [isLoggedIn, setIsLoggedIn] = useLocalStorage(STORAGE_KEYS.LOGIN_STATUS, false);
    const [authToken, setAuthToken] = useLocalStorage<string | null>(STORAGE_KEYS.AUTH_TOKEN, null);
    const [storedAddress, setStoredAddress] = useLocalStorage<Address>(
        STORAGE_KEYS.USER_ADDRESS,
        null,
    );

    const loginMutation = useMutation<LoginResponse, AuthError, LoginMutationData>({
        mutationFn: loginUser,
        onSuccess: (response) => {
            if (response.token) {
                setIsLoggedIn(true);
                setAuthToken(response.token);
                setStoredAddress(address);
            }
        },
        onError: (error) => {
            console.error('Login error:', error);
            handleLogout();
        },
    });

    const logoutMutation = useMutation<LogoutResponse, AuthError, LogoutMutationData>({
        mutationFn: logoutUser,
        onSettled: handleLogout,
    });

    function handleLogout() {
        disconnect();
        setIsLoggedIn(false);
        setAuthToken(null);
        setStoredAddress(null);
    }

    const logout = useCallback(() => {
        if (authToken) {
            logoutMutation.mutate({
                token: authToken,
                user: storedAddress,
            });
        } else {
            handleLogout();
        }
    }, [authToken, logoutMutation, storedAddress]);

    const connectSuccess = useCallback(async () => {
        if (!address || !chain) {
            console.error('Missing required connection details');
            return;
        }

        try {
            const nonce = await publicClient.getTransactionCount({ address });
            const { message, config } = getSignatureMessage({ address, chain, nonce });
            const signature = await signMessageAsync({ message, account: address });

            loginMutation.mutate({ signature, message: config });
        } catch (error) {
            console.error('Connection error:', error);
            logout();
        }
    }, [address, chain, publicClient, signMessageAsync, loginMutation, logout]);

    useEffect(() => {
        if (isConnected && address && chain) {
            if (!isLoggedIn || !authToken) {
                connectSuccess();
            }
        } else if (isLoggedIn || authToken) {
            logout();
        }
    }, [isConnected, address, chain, isLoggedIn, authToken]);

    return {
        isLoggedIn,
        isLoading: loginMutation.isPending || logoutMutation.isPending,
        error: loginMutation.error || logoutMutation.error,
        logout,
        token: authToken,
    };
}
