import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from "react";

/** Contextの作成 */
const AuthContext = createContext({
  isAuthenticated: false,
  setAuthState: (value: boolean) => {},
});

/** localStorageのキー */
const AUTH_STATE_KEY = "authState";

/** Contextのプロバイダー */
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    // 初期値をlocalStorageから取得
    const savedState = localStorage.getItem(AUTH_STATE_KEY);
    return savedState ? JSON.parse(savedState) : false;
  });

  const setAuthState = useCallback((value: boolean) => {
    setIsAuthenticated(value);
    localStorage.setItem(AUTH_STATE_KEY, JSON.stringify(value));
  }, []);

  useEffect(() => {
    // 初回マウント時に状態を同期
    const savedState = localStorage.getItem(AUTH_STATE_KEY);
    if (savedState) {
      setIsAuthenticated(JSON.parse(savedState));
    }
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, setAuthState }}>
      {children}
    </AuthContext.Provider>
  );
};

/** 現在のログイン状態の読み取り専用Hooks */
export const useAuthState = (): boolean => {
  const { isAuthenticated } = useContext(AuthContext);
  return isAuthenticated;
};

/** 現在のログイン状態の書き込み専用Hooks */
export const useAuthStateMutators = (): {
  setAuthState: (value: boolean) => void;
} => {
  const { setAuthState } = useContext(AuthContext);
  return { setAuthState };
};
