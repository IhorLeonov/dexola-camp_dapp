import styles from "./Header.module.scss";
import { Icon } from "../../helpers/IconSelector";

import { useConnect } from "wagmi";

export const Header = () => {
  const { connect, connectors, error, isLoading, pendingConnector } =
    useConnect();

  return (
    <header className={styles.header}>
      <div className={styles.header_container}>
        <a href="https://dexola.com/" target="_blank" rel="noreferrer">
          <Icon id="logo" />
        </a>
        {/* <button className={styles.header_btn} type="button">
          Connect wallet
        </button> */}
        <div>
          {connectors.map((connector) => (
            <button
              style={{ color: "aqua" }}
              disabled={!connector.ready}
              key={connector.id}
              onClick={() => connect({ connector })}
            >
              {connector.name}
              {!connector.ready && " (unsupported)"}
              {isLoading &&
                connector.id === pendingConnector?.id &&
                " (connecting)"}
            </button>
          ))}

          {error && <div>{error.message}</div>}
        </div>
      </div>
    </header>
  );
};
