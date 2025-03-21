import { create } from "zustand";
import { persist } from "zustand/middleware";

interface SettingsState {
  slippage: string;
  maxTicksSlippage: string;
  skipOrderConfirmation: boolean;
  setSlippage: (value: string) => void;
  setMaxTicksSlippage: (value: string) => void;
  setSkipOrderConfirmation: (value: boolean) => void;
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      slippage: "10",
      maxTicksSlippage: "100",
      skipOrderConfirmation: false,

      setSlippage: (value: string) => set({ slippage: value }),
      setMaxTicksSlippage: (value: string) => set({ maxTicksSlippage: value }),
      setSkipOrderConfirmation: (value: boolean) =>
        set({ skipOrderConfirmation: value }),
    }),
    {
      name: "trading-settings",
    }
  )
);
