// This file has 4 functions related to scanning for WiFi networks

// 1) subscribe - register a callback to get notifications when WiFi networks are found
// 2) startScan - start scanning for WiFi networks, registered callbacks will be notified of wifi networks as they are discovered
// 3) stopScan - stop scanning for WiFi networks
// 4) unsubscribe - remove a callback from the list of subscribers

// You do not need to read how the functions work to solve the problem
// Ask any questions

const subscribers = [];
let timeout = undefined;

/*
    callback is a function like this:
    callback: (wifiNetwork: WifiNetwork) => void

    interface WifiNetwork {
        ssid: string;
        signalStrength: number; // higher is stronger signal
    }
*/
export function subscribe(callback) {
  subscribers.push(callback);
}

export function startScan() {
  if (timeout) {
    return;
  }

  if (subscribers.length === 0) {
    throw new Error("No subscribers");
  }

  const discover = () => {
    const network = {
      ssid: `ssid-${Math.ceil(Math.random() * 20)}`,
      signalStrength: Math.random()
    };
    subscribers.forEach(callback => callback(network));
    timeout = setTimeout(discover, 200);
  };

  timeout = setTimeout(discover, 1000);
}

export function stopScan() {
  clearTimeout(timeout);
  timeout = undefined;
}

export function unsubscribe(callback) {
  subscribers.filter(cb => cb !== callback);
}
