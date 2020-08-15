export const SERVER_HOST_NAME = process.env.NODE_ENV === 'development' ? "api.taskorganiser-dev.com" : "api.scribblelabs.tech";
console.log(SERVER_HOST_NAME)
export const API_BASE_URL = `http://${SERVER_HOST_NAME}/api`;

export const PASSPORT_CLIENT_ID = "1";
export const PASSPORT_CLIENT_SECRET = "gGtByV9BXHc7XvJjUPXHmpi0sHDrtpwfv8j6nPkE";

export const PUSHER_KEY = "abcdefg";
