import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { useAuthState, useAuthStateMutators } from "./provider/auth";

function App() {
  const isAuthenticated = useAuthState();
  const { setAuthState } = useAuthStateMutators();

  const toggleAuth = () => {
    console.log("Current Auth State:", isAuthenticated); // ログを追加
    setAuthState(!isAuthenticated);
  };
  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <p>Logged in: {isAuthenticated ? "Yes" : "No"}</p>
      <button onClick={toggleAuth}>Toggle Login State</button>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
