interface NetworkProps {
  onMessage: (m: string) => void;
}

export class Network {
  constructor({ onMessage }: NetworkProps) {
    var connection = new WebSocket("ws://localhost:5001");

    connection.onopen = function () {
      console.log("Connected!");
      connection.send("Ping"); // Send the message 'Ping' to the server
    };

    // Log errors
    connection.onerror = function (error) {
      console.log("WebSocket Error " + error);
    };

    // Log messages from the server
    connection.onmessage = function (e) {
      console.log("Server: " + e.data);
      onMessage(e.data);
    };
  }
}
