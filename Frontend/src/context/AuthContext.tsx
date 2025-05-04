import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import axios from "axios";

interface AuthProviderProps {
  children: ReactNode;
}

interface AuthContextType {
  user: User | null;
  isLogin: boolean;
  isLoading: boolean;
  getAuthentication: () => Promise<void>;
}
interface User {
  id: number;
  studentId: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  role: string;
  createdAt: string;
  updatedAt: string;
}
export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const getAuthentication = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/authentication`,
        {
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        setUser(response.data.user);
        setIsLogin(response.data.Login);
      } else if(response.status === 401) {
        setUser(null);
        setIsLogin(false);
      }
    } catch (error) {
      setUser(null);
      setIsLogin(false);
    } finally {
      setIsLoading(false); 
    }
  };

  useEffect(() => {
    getAuthentication();
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, isLogin, isLoading, getAuthentication }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
