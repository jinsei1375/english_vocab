import { Dispatch, SetStateAction } from 'react';

export const showFlashMessage = (
	message: string,
	setFlashMessage: Dispatch<SetStateAction<string | null>>
) => {
	setFlashMessage(message);
};
