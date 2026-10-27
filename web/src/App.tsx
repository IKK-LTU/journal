import { Provider } from "react-redux";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";

import Router from "./router";
import { store } from "./store/store";
import { theme } from "../theme";

const App = () => {
  return (
    <Provider store={store}>
      {/* "system" = follow the phone/OS until the user picks Šviesi/Tamsi in Settings. */}
      <ThemeProvider theme={theme} defaultMode="system">
        <CssBaseline enableColorScheme />
        <Router />
      </ThemeProvider>
    </Provider>
  );
};

export default App;
