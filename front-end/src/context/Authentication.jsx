import { readStorage, updateStorage } from "@/utils/authentication";
import { createContext, useContext, useEffect, useState } from "react";

export const AuthenticationContext = createContext({
  token: null,
  onLoginSuccess: () => {},
});

export default function AuthenticationProvider({ children }) {
  const [token, setToken] = useState(readStorage());

  useEffect(() => {
    // Função para atualizar o estado de autenticação baseado na presença do token
    const handleStorageChange = () => {
      const updatedToken = readStorage();
      setToken(updatedToken);
    };

    // Adicionando ouvinte para mudanças no localStorage
    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  function onLoginSuccess(token) {
    updateStorage(token);
    setToken(token);
  }

  return (
    <AuthenticationContext.Provider value={{ token, onLoginSuccess }}>
      {children}
    </AuthenticationContext.Provider>
  );
}

export const useAuthentication = () => {
  const context = useContext(AuthenticationContext);
  if (!context) {
    throw new Error("useAuthentication must be used within a AuthenticationProvider");
  }
  return context;
};
