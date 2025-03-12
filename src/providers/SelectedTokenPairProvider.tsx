import { supportedTokenPairs, Token } from "@/lib/tokens";
import {
  createContext,
  useContext,
  ReactNode,
  useState,
  Dispatch,
  SetStateAction,
} from "react";

interface TokenPriceContextType {
  selectedTokenPair: Token[];
  setSelectedTokenPair: Dispatch<SetStateAction<Token[]>>;
}

const SelectedTokenPairContext = createContext<
  TokenPriceContextType | undefined
>(undefined);

export function SelectedTokenPairProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [selectedTokenPair, setSelectedTokenPair] = useState(
    supportedTokenPairs[0],
  );

  return (
    <SelectedTokenPairContext.Provider
      value={{
        selectedTokenPair,
        setSelectedTokenPair,
      }}
    >
      {children}
    </SelectedTokenPairContext.Provider>
  );
}

export function useSelectedTokenPair() {
  const context = useContext(SelectedTokenPairContext);
  if (context === undefined) {
    throw new Error(
      "useSelectedTokenPair must be used within a SelectedTokenPairProvider",
    );
  }
  return context;
}
