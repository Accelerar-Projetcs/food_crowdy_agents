import { toast } from 'react-toastify';

export const errorHandler = (error) => {
	if (error.response === undefined) {
		return toast.error('Network  is not available', {
			toastId: 'Network  is not available'
		});
	}
	if (error.response) {
		if (error.response.status === 500) {
			toast.error('Something went wrong', {
				toastId: 'Something went wrong'
			});
		} else if (error.response.status === 404) {
			toast.error(error.response.statusText, {
				toastId: error.response.statusText
			});
		} else {
			toast.error(error.response.data, {
				toastId: error.response.data
			});
		}
	}
};
