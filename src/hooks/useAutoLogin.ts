import { useMutation } from '@tanstack/react-query';
import { useEffect, useCallback } from 'react';
import { useAccount, useDisconnect, usePublicClient, useSignMessage } from 'wagmi';
import { useLocalStorage } from 'react-use';
import { STORAGE_KEYS } from '@/constants';
import { LoginMutationData, LoginResponse } from '../types/auth';
import { getSignatureMessage, loginUser, logoutUser } from '../utils/auth';

export function useAutoLogin() {
    const { address, chain, isConnected } = useAccount();
    const publicClient = usePublicClient();
    const { signMessageAsync } = useSignMessage();
    const { disconnect } = useDisconnect();
    const [isLoggedIn, setIsLoggedIn] = useLocalStorage(STORAGE_KEYS.LOGIN_STATUS, false);
    const [authToken, setAuthToken] = useLocalStorage<string | null>(STORAGE_KEYS.AUTH_TOKEN, null);

    const loginMutation = useMutation<LoginResponse, Error, LoginMutationData>({
        mutationFn: loginUser,
        onSuccess: (data) => {
            if (data.success && data.token) {
                setIsLoggedIn(true);
                setAuthToken(data.token);
            }
        },
        onError: (error) => {
            console.error('Login error:', error);
            handleLogout();
        },
    });

    const logoutMutation = useMutation<LoginResponse, Error, string>({
        mutationFn: logoutUser,
        onSettled: handleLogout,
    });

    function handleLogout() {
        disconnect();
        setIsLoggedIn(false);
        setAuthToken(null);
    }

    const logout = useCallback(() => {
        if (authToken) {
            logoutMutation.mutate(authToken);
        } else {
            handleLogout();
        }
    }, [authToken, logoutMutation]);

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
