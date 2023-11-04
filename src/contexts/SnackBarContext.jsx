import { createContext, useEffect, useState } from "react";
import MySnackBar from "../components/MySnackBar.jsx";

export const SnackBarContext = createContext({});

export const SnackProvider = ({ children }) => {
  const [snackPack, setSnackPack] = useState([]);
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [messageInfo, setMessageInfo] = useState(undefined);

  useEffect(() => {
    if (snackPack.length && !messageInfo) {
      // Set a new snack when we don't have an active one
      setMessageInfo({ ...snackPack[0] });
      setSnackPack((prev) => prev.slice(1));
      setOpenSnackBar(true);
    } else if (snackPack.length && messageInfo && open) {
      // Close an active snack when a new one is added
      setOpenSnackBar(false);
    }
  }, [snackPack, messageInfo, openSnackBar]);

  function showHideSnackBar(message) {
    setSnackPack((prev) => [...prev, { message, key: new Date().getTime() }]);
  }
  return (
    <SnackBarContext.Provider value={{ showHideSnackBar }}>
      {children}
      <MySnackBar
        openSnackBar={openSnackBar}
        setOpenSnackBar={setOpenSnackBar}
        messageInfo={messageInfo}
        setMessageInfo={setMessageInfo}
      />
    </SnackBarContext.Provider>
  );
};
