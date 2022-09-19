import React from 'react';

const ACCESS_TOKEN_LOCALSTORAGE_KEY = 'msadoc--access-token';
const REFRESH_TOKEN_LOCALSTORAGE_KEY = 'msadoc--refresh-token';

interface AccessAndRefreshToken {
  accessToken: string;
  refreshToken: string;
}

interface State {
  accessAndRefreshToken: AccessAndRefreshToken | undefined;
}
interface AuthDataService {
  state: State;

  /**
   * Update the Access and Refresh Token.
   * This will not only update our State, but also store these tokens in LocalStorage.
   */
  setAccessAndRefreshToken: (newTokens: AccessAndRefreshToken) => void;
  /**
   * Delete the Access and Refresh Token.
   * This will not only update our State, but also delete these tokens from LocalStorage.
   */
  deleteAccessAndRefreshToken: () => void;
}
function useAuthDataService(): AuthDataService {
  const [state, setState] = React.useState<State>((): State => {
    const accessToken = localStorage.getItem(ACCESS_TOKEN_LOCALSTORAGE_KEY);
    const refreshToken = localStorage.getItem(REFRESH_TOKEN_LOCALSTORAGE_KEY);
    if (accessToken == null || refreshToken == null) {
      return {
        accessAndRefreshToken: undefined,
      };
    }

    return {
      accessAndRefreshToken: {
        accessToken: accessToken,
        refreshToken: refreshToken,
      },
    };
  });

  return {
    state: state,

    setAccessAndRefreshToken: (newTokens): void => {
      setState((state) => ({ ...state, accessAndRefreshToken: newTokens }));

      localStorage.setItem(
        ACCESS_TOKEN_LOCALSTORAGE_KEY,
        newTokens.accessToken,
      );
      localStorage.setItem(
        REFRESH_TOKEN_LOCALSTORAGE_KEY,
        newTokens.refreshToken,
      );
    },

    deleteAccessAndRefreshToken: (): void => {
      setState((state) => ({ ...state, accessAndRefreshToken: undefined }));

      localStorage.removeItem(ACCESS_TOKEN_LOCALSTORAGE_KEY);
      localStorage.removeItem(REFRESH_TOKEN_LOCALSTORAGE_KEY);
    },
  };
}

const AuthDataServiceContext = React.createContext<AuthDataService | undefined>(
  undefined,
);

interface Props {
  children?: React.ReactNode;
}
export const AuthDataServiceContextProvider: React.FC<Props> = (props) => {
  const kernelService = useAuthDataService();

  return (
    <AuthDataServiceContext.Provider value={kernelService}>
      {props.children}
    </AuthDataServiceContext.Provider>
  );
};

export const useAuthDataServiceContext = (): AuthDataService => {
  const context = React.useContext(AuthDataServiceContext);
  if (!context) {
    throw Error(
      'Your component does not seem to be part of the AuthDataServiceContext!',
    );
  }

  return context;
};