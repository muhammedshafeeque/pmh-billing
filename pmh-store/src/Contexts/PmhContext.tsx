import {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useReducer,
    ReactNode,
    Dispatch,
  } from "react";
  
  import { useLocation, useNavigate } from "react-router-dom";
  import axios from "../Api/Api";
  import { ROUTERS } from "../Constants/Routes";
  import { TOKEN } from "../Constants/constant";
  
  // Action Types
  const LOGIN = "LOGIN";
  const LOGOUT = "LOGOUT";
  const UPDATE_USER = "UPDATE_USER";
  const ADD_NEW_KEY_VALUE = "SET_VALUE";
  
  // Define User and State Types
  interface User {
    userType: string;
    [key: string]: any;
  }
  
  interface State {
    user: User | null;
    isLoggedIn: boolean;
    [key: string]: any;
  }
  
  interface Action {
    type: string;
    payload?: any;
    key?: string;
    value?: any;
  }
  
  // Define the Pmh Context
  interface PmhContextType extends State {
    login: (userData: any) => void;
    logout: () => void;
    updateUser: (userData: any) => void;
    addNewKeyValue: (key: string, value: any) => void;
    dispatch: Dispatch<Action>;
  }
  
  const PmhReducer = (state: State, action: Action): State => {
    switch (action.type) {
      case LOGIN:
        return { ...state, user: action.payload, isLoggedIn: true };
      case LOGOUT:
        return { ...state, user: null, isLoggedIn: false };
      case UPDATE_USER:
        return { ...state, user: action.payload };
      case ADD_NEW_KEY_VALUE:
        return { ...state, [action.key!]: action.value };
      default:
        return state;
    }
  };
  
  const PmhContext = createContext<PmhContextType | undefined>(undefined);
  
  export const PmhProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [state, dispatch] = useReducer(PmhReducer, {
      user: null,
      isLoggedIn: false,
    });
  
    const navigate = useNavigate();
    const location = useLocation();
  
    const login = (userData: any) => {
      localStorage.setItem(TOKEN, userData.token);
      dispatch({
        type: LOGIN,
        payload: { ...userData.userData, isLoggedIn: true },
      });
      window.location.reload()
    };
  
    const navigator = useCallback(
      () => {
        navigate(ROUTERS.HOME_ROUTER);
      },
      [navigate]
    );
  
    const logout = useCallback(() => {
      localStorage.clear();
      dispatch({ type: LOGOUT });
      navigate(ROUTERS.LOGIN_ROUTER);
    }, [navigate]);
  
    const updateUser = (userData: any) => {
      dispatch({ type: UPDATE_USER, payload: userData });
    };
  
    const addNewKeyValue = (key: string, value: any) => {
      dispatch({ type: ADD_NEW_KEY_VALUE, key, value });
    };
  
    const getUserDetailsOnReload = useCallback(async () => {
      const storedToken = localStorage.getItem(TOKEN);
  
      if (storedToken) {
        try {
          let { data } = await axios.get("auth/get-req-user");
  
          localStorage.setItem(TOKEN, data.token);
          dispatch({
            type: LOGIN,
            payload: { ...data.userData, isLoggedIn: true },
          });
  
          const common = [
            ROUTERS.LOGIN_ROUTER,
            ROUTERS.HOME_ROUTER,
          ];
          const co = common.find((c) => c === location.pathname);
          if (co) {
            navigator();
          }
        } catch (error) {
          // Handle error if necessary
        }
      } else {
        logout();
      }
    }, [logout, navigator, location]);
  
    useEffect(() => {
      getUserDetailsOnReload();
    }, []);
  
    return (
      <PmhContext.Provider
        value={{ ...state, login, logout, updateUser, addNewKeyValue, dispatch }}
      >
        {children}
      </PmhContext.Provider>
    );
  };
  
  export const usePmh = (): PmhContextType => {
    const context = useContext(PmhContext);
    if (!context) {
      throw new Error("usePmh must be used within a PmhProvider");
    }
    return context;
  };
  