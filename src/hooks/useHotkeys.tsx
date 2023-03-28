import { useEffect } from "react";

type Key = "ctrl" | "shift" | "alt" | string;

export const useHotkeys = (keys: Key[], callback: () => void) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (
        keys.every(
          (key) =>
            (key === "ctrl" && event.ctrlKey) ||
            (key === "shift" && event.shiftKey) ||
            (key === "alt" && event.altKey) ||
            (typeof key === "string" && event.key.toLowerCase() === key)
        )
      ) {
        callback();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [keys, callback]);
};

// CUSTOM USAGE //

// import { useHotkeys } from "../hooks/useHotkeys";

// const App = () => {
//   const handleSaveFile = () => {
//     // Code to save the file
//   };

//   useHotkeys(["ctrl", "s"], handleSaveFile);

//   // ...
// };
