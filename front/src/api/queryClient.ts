import {QueryClient} from '@tanstack/react-query';

const queryClient = new QueryClient({

	defaultOptions:{
		queries:{
		//요청 실패하면 기본적으로 3번 재요청함 이를 false 처리
			retry : false,
		},
	
		mutations:{
			retry : false,
		},
	
	},


});

export default queryClient;