import axios, { AxiosResponse, AxiosError } from "axios";
import { TOKEN, baseUrl } from "../Constants/constant";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useToastService } from "../Contexts/ToastContext";
import { ROUTERS } from "../Constants/Routes";

let token = localStorage.getItem(TOKEN);
const apiInstance = axios.create({
  baseURL: baseUrl,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  },
  withCredentials: true,
});

export const Api: React.FC = () => {
  const { showAlertMessage } = useToastService(); // Destructure showAlertMessage from useToastService
  const navigate = useNavigate();

  useEffect(() => {
    const requestInterceptor = apiInstance.interceptors.request.use(
      (config: any) => config,
      (error: AxiosError) => Promise.reject(error)
    );

    const responseInterceptor = apiInstance.interceptors.response.use(
      (response: AxiosResponse) => {
        if (response.data && response.data.message) {
          showAlertMessage(response.data.message, 'success'); // Call showAlertMessage correctly
        }
        return response;
      },
      (error: AxiosError) => {
        if (error.response) {
          const { status, data }:any = error.response;
          if (status === 400) {
            showAlertMessage(data.message, 'error'); // Call showAlertMessage correctly
          } else if (status === 401 || status === 403) {
            showAlertMessage('Unauthorized: Please log in.', 'error'); // Call showAlertMessage correctly
            navigate(ROUTERS.LOGIN_ROUTER);
          } else if (status === 404) {
            showAlertMessage('Resource not found.', 'error'); // Call showAlertMessage correctly
            console.error(error);
          } else if (status === 500) {
            showAlertMessage('Internal Server Error: Please try again later.', 'error'); // Call showAlertMessage correctly
          } else {
            showAlertMessage(`HTTP error ${status}: ${data.message}`, 'error'); // Call showAlertMessage correctly
          }
        } else if (error.request) {
          console.error('No response received from the server.');
          showAlertMessage('No response received from the server.', 'error'); // Call showAlertMessage correctly
        } else {
          console.error('Error during request setup:', error.message);
          showAlertMessage(`Error during request setup: ${error.message}`, 'error'); // Call showAlertMessage correctly
        }
        return Promise.reject(error);
      }
    );

    // Clean up interceptors on unmount
    return () => {
      apiInstance.interceptors.request.eject(requestInterceptor);
      apiInstance.interceptors.response.eject(responseInterceptor);
    };
  }, [showAlertMessage, navigate]);

  return null;
};

export default apiInstance;
