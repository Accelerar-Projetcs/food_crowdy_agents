import { toast } from 'react-toastify';

const statusCode = [422, 400, 403, 413];
export const errorHandler = (error) => {
	if (error.response === undefined) {
		return toast.error('Network  is not available', {
			toastId: 'Network  is not available'
		});
	}
	if (error.response) {
		if (error.response.status === 500) {
			toast.error('"Internal server error" Something went wrong ', {
				toastId: 'Something went wrong'
			});
		} else if (error.response.status === 404) {
			// toast.error(error.response.statusText, {
			// 	toastId: error.response.statusText
			// });
		} else if (statusCode.includes(error.response.status)) {
			toast.error(error.response.data.message, {
				toastId: error.response.data.message
			});
			return error.response.data.message;
		}
	}
};
