import React, { useState } from "react";
import Title from "../components/Title";
import Deauth from "./Deauth";
import Capture from "./Capture";
import Analysis from "./Analysis";
export default function NetworkInfo() {
  const [selectedCard, setSelectedCard] = useState("");
  const [stations, setStations] = useState([]);
  const [client, setClient] = useState([]);

  const handleCardChange = (e) => {
    setSelectedCard(e);
  };
  const handlePacketChange = (e) => {
    setStations(e.stations);
    setClient(e.clients);
  };

  return (
    <div>
      <Title name="Network Info" />
      <div className="networkInfo">
        <Capture
          selectedCard={selectedCard}
          devisceChangeCB={handleCardChange}
        />
        <Analysis packetAnalysedCB={handlePacketChange} />
        <Deauth wifiCard={selectedCard} stations={stations} clients={client} />
      </div>
    </div>
  );
}
