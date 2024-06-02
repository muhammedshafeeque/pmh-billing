import React, { useState, useEffect, createContext, useContext, ReactNode } from "react";
import "./Toast.scss";

// Define types for the context and components
interface ToastContextProps {
  showAlertMessage: (message: string, status: string) => void;
}

interface CustomToastProps {
  show: boolean;
  status: string;
  message: string;
  onClose: () => void;
}

interface ToastServiceProps {
  children: ReactNode;
}

const ToastServiceContext = createContext<ToastContextProps | undefined>(undefined);

export const useToastService = (): ToastContextProps => {
  const context = useContext(ToastServiceContext);
  if (!context) {
    throw new Error("useToastService must be used within a ToastServiceProvider");
  }
  return context;
};

const CustomToast: React.FC<CustomToastProps> = ({ show, status, message, onClose }) => {
  const [isVisible, setIsVisible] = useState(show);

  useEffect(() => {
    setIsVisible(show);
  }, [show]);

  const handleAnimationEnd = () => {
    if (!isVisible) {
      onClose(); // Ensure onClose is called to remove the toast from the list
    }
  };

  const handleClose = () => {
    setIsVisible(false);
  };

  return (
    <div
      className={`custom-toast ${status} ${isVisible ? "" : "hide"}`}
      onAnimationEnd={handleAnimationEnd}
    >
      <div className="alert">
        <div className="toast-content">
          {message}
          <button className="close-button" onClick={handleClose}>
            &times;
          </button>
        </div>
      </div>
    </div>
  );
};

const ToastService: React.FC<ToastServiceProps> = ({ children }) => {
  const [alerts, setAlerts] = useState<{ message: string; status: string; id: number }[]>([]);

  useEffect(() => {
    if (alerts.length > 0) {
      const timer = setTimeout(() => {
        setAlerts(prevAlerts => prevAlerts.slice(1));
      }, 3000); // Adjust the duration as needed
      return () => clearTimeout(timer);
    }
  }, [alerts]);

  const showAlertMessage = (message: string, status: string) => {
    const newAlert = { message, status, id: Date.now() };
    setAlerts(prevAlerts => [...prevAlerts, newAlert]);
  };

  const hideAlert = (id: number) => {
    setAlerts(prevAlerts => prevAlerts.filter(alert => alert.id !== id));
  };

  return (
    <ToastServiceContext.Provider value={{ showAlertMessage }}>
      {children}
      <div className="toast-container">
        {alerts.map(alert => (
          <CustomToast
            key={alert.id}
            show={true}
            status={alert.status}
            message={alert.message}
            onClose={() => hideAlert(alert.id)}
          />
        ))}
      </div>
    </ToastServiceContext.Provider>
  );
};

export default ToastService;
