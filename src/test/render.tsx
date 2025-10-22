// ./testing/render.tsx
import { Provider as ChakraProvider } from "../components/ui/provider";
import { Provider as ReduxProvider } from "react-redux";
import { RenderOptions, render as rtlRender } from "@testing-library/react";
import  { setupStore, AppStore, RootState } from "../store/index";
import { PropsWithChildren } from "react";

interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  preloadedState?: Partial<RootState>
  store?: AppStore
}

export function renderWithProviders(
  ui: React.ReactElement,
  extendedRenderOptions: ExtendedRenderOptions = {}
) {
  const {
    preloadedState = {},
    // Automatically create a store instance if no store was passed in
    store = setupStore(preloadedState),
    ...renderOptions
  } = extendedRenderOptions

  const Wrapper = ({ children }: PropsWithChildren) => (
    <ReduxProvider store={store}>
      <ChakraProvider>
        {children}
      </ChakraProvider>
    </ReduxProvider>
  )

  // Return an object with the store and all of RTL's query functions
  return {
    store,
    ...rtlRender(ui, { wrapper: Wrapper, ...renderOptions })
  }
}


