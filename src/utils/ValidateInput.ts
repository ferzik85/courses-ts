const emailRegex =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}(?:\.[0-9]{1,3}){3}\])|(([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}))$/;

const checkString = (str: unknown): str is string => 
	typeof str === 'string' && str.trim().length > 0;

const checkEmail = (email: string): boolean =>
	emailRegex.test(email.toLowerCase());

const checkPassword = (password: string): boolean => 
	password.length > 5;

export function validateInput(str: string): boolean {
	return checkString(str);
}

export function validateEmail(str: string): boolean {
	return checkString(str) && checkEmail(str);
}

export function validatePassword(str: string): boolean {
	return checkString(str) && checkPassword(str);
}
