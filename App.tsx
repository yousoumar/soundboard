import { Provider } from "react-redux";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import { store } from "./src/app/store";
import SoundContextProvider from "./src/features/soundboard/soundContext";
import AppNavigator from "./src/navigators/AppNavigator";

const persistor = persistStore(store);

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SoundContextProvider>
          <AppNavigator />
        </SoundContextProvider>
      </PersistGate>
    </Provider>
  );
}
