import {queryOptions, useMutation, useQuery,UseQueryOptions} from '@tanstack/react-query';
import {getAccessToken, getProfile, logout, postLogin, postSignup} from '@/api/auth';
import {removeEncryptStorage, setEncryptStorage} from '@/utils';
import {UseMutationCustomOptions,UseQueryCustomOptions} from '@/types/common';
import {removeHeader, setHeader} from '@/utils/header'
import {queryKeys, storageKeys} from '@/constants/index'
import queryClient from '@/api/queryClient';
import { useEffect } from 'react';
import { numbers } from '@/constants';

function useSignup(mutationOptions ?: UseMutationCustomOptions){

	return useMutation({
		mutationFn: postSignup,
	    ...mutationOptions,
	});

}

function useLogin(mutationOptions?: UseMutationCustomOptions){
	

	return useMutation({
		mutationFn: postLogin,
		onSuccess:({accessToken, refreshToken}) => {
			
			console.log("✅ 로그인 성공:", accessToken);
			setEncryptStorage(storageKeys.REFRESH_TOKEN, refreshToken);
			setHeader(`Authorization`, `Bearer ${accessToken}`);
		},
		onError: (err) => {
			console.log("❌ 로그인 실패:", err);
		},
		onSettled: () => {
			console.log("🔁 로그인 요청 완료 후 쿼리 invalidate");
		//성공실패관계없이 진행
			queryClient.refetchQueries({queryKey: [queryKeys.AUTH, queryKeys.GET_ACCESS_TOKEN]});
			queryClient.invalidateQueries({queryKey: [queryKeys.AUTH, queryKeys.GET_PROFILE]}); //훅 무효화
		},
		...mutationOptions
	});

}

function useGetRefreshToken(){
	const {isSuccess, data, isError} = useQuery({
		queryKey: [queryKeys.AUTH, queryKeys.GET_ACCESS_TOKEN],
		queryFn: getAccessToken,
		staleTime: numbers.ACCESS_TOKEN_REFRESH_TIME, //27분
		refetchInterval:  numbers.ACCESS_TOKEN_REFRESH_TIME, //27분
		refetchOnReconnect: true, //앱종료안하고 다시 돌아와도 ㅇㅇ
		refetchIntervalInBackground: true,//다시 연결되도 ㅇㅇ
	});

	useEffect(()=>{
		if(isSuccess){
			setHeader(`Authorization`, `Bearer ${data.accessToken}`);
			setEncryptStorage(storageKeys.REFRESH_TOKEN, data.refreshToken);
		}
	}, [isSuccess]);
	
	useEffect(()=>{
		if(isError){
			removeHeader(`Authorization`);
			removeEncryptStorage(storageKeys.REFRESH_TOKEN);
		}
	}, [isError]);
	
	return {isSuccess, isError};
}



function useGetProfile(queryOptions?:UseQueryCustomOptions){

	return useQuery({
		queryKey: [queryKeys.AUTH, queryKeys.GET_PROFILE],
		queryFn: getProfile,
		enabled: false,
		...queryOptions,
	});
}


function useLogout(mutationOptions?: UseMutationCustomOptions){

	return useMutation({
		mutationFn: logout,
		onSuccess:() => {

            console.log('로그아웃 성공!');
			removeHeader('Authorization');
            removeEncryptStorage(storageKeys.REFRESH_TOKEN);
		},
        onError: (err) => {
            console.log('로그아웃 실패:', err);
        },
		onSettled: ()=>{
			console.log('로그아웃 완료!');
			queryClient.invalidateQueries({queryKey: [queryKeys.AUTH]}); 
		},
		...mutationOptions
	});

}

function useAuth(){
	const signupMutation = useSignup();
	const refreshTokenQuery = useGetRefreshToken();
	const getProfileQuery = useGetProfile();
	const loginMutation = useLogin();
	const logoutMutation = useLogout();
	const isLogin = getProfileQuery.isSuccess;

	useEffect(() => {
		console.log('🌀 refreshTokenQuery:', refreshTokenQuery);
		console.log('📡 getProfileQuery:', getProfileQuery);
	
		if (refreshTokenQuery.isSuccess) {
		  getProfileQuery.refetch(); // 수동으로 프로필 가져오기
		}
	  }, [refreshTokenQuery.isSuccess]);
	
	
	return {signupMutation, loginMutation, logoutMutation, isLogin, getProfileQuery};

}

export default useAuth;