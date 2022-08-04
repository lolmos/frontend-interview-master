import { useEffect, useState } from "react";
import {
  startScan,
  stopScan,
  subscribe,
  WifiNetwork,
} from "../../service/wifi";
import "./index.css";

const WifiScreen = () => {
  const [wifiNetworks, setWifiNetworks] = useState<WifiNetwork[]>([]);
  const [selectedNetwork, setSelectedNetwork] = useState<WifiNetwork>();

  useEffect(() => {
    const callback = (wifiNetwork: WifiNetwork) => {
      setWifiNetworks(
        wifiNetworks.length > 0 ? [...wifiNetworks, wifiNetwork] : [wifiNetwork]
      );
    };
    subscribe(callback);

    startScan();
  }, []);

  useEffect(() => {
    if (wifiNetworks.length > 0) {
      console.log(wifiNetworks);
      stopScan();
    }
  }, [wifiNetworks]);

  const handleRefresh = (e: any) => {
    startScan();
  };

  const handleSelectChange = (e: any) => {
    console.log(e.target.value);
    setSelectedNetwork(e.target.value);
  };

  return (
    <>
      {selectedNetwork ? (
        <h4>Selected network: {selectedNetwork}</h4>
      ) : (
        <h4>Please select a network</h4>
      )}

      <br />
      <button onClick={handleRefresh}>Refresh Networks</button>
      <br />
      <select
        id="networks"
        onChange={handleSelectChange}
        value={selectedNetwork as unknown as string}
      >
        {wifiNetworks.length > 0 &&
          wifiNetworks.map((network) => {
            const { ssid, signalStrength } = network;
            return (
              <option value={ssid} key={ssid + signalStrength}>
                {ssid} - strength {signalStrength}
              </option>
            );
          })}
      </select>
    </>
  );
};

export default WifiScreen;
