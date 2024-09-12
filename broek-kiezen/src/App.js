import React, { useState, useEffect } from "react";
import nee from "./img/nee.png";
import ja from "./img/kortebroek.jpeg";

const API_KEY = "522d7e11c611492291583303241109";

function App() {
  const [temperatuur, setTemperatuur] = useState(null);
  const [laden, setLaden] = useState(true);
  const [precipitation, setPrecipitation] = useState(null);
  const [fout, setFout] = useState(null);
  const today = new Date().toLocaleDateString("nl-NL", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  useEffect(() => {
    const weerOphalen = async () => {
      try {
        const response = await fetch(
          `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=Amsterdam&aqi=no`
        );
        if (!response.ok) {
          throw new Error("Er ging iets mis met het ophalen van het weer.");
        }
        const data = await response.json();
        setTemperatuur(data.current.temp_c);
        setPrecipitation(data.current.precip_mm);
        setLaden(false);
      } catch (error) {
        setFout(error.message);
        setLaden(false);
      }
    };

    weerOphalen();
  }, []);

  const korteBroekAdvies = () => {
    if (temperatuur >= 18) {
      return <img src={ja} alt="ja" />;
    } else {
      return <img src={nee} alt="nee" />;
    }
  };

  const achtergrondKleur = (temp) => {
    if (temp < 18) {
      return "rgba(212,226,239,255)";
    } else {
      return "rgba(253,226,192,255)";
    }
  };
  const kleur = (temp) => {
    if (temp < 18) {
      return "rgba(23,95,130,255)";
    } else {
      return "#ea682b";
    }
  };
  const regenkans = () => {
    if (precipitation === 0) {
      return "Geen kans op regen vandaag!";
    } else if (precipitation > 0 && precipitation <= 2) {
      return "Lichte kans op regen, neem een paraplu mee!";
    } else {
      return "Hoge kans op regen, korte broek is misschien niet verstandig.";
    }
  };
  return (
    <div
      style={{
        textAlign: "center",
        padding: "50px",
        backgroundColor:
          temperatuur !== null ? achtergrondKleur(temperatuur) : "#fff",
        color: temperatuur !== null ? kleur(temperatuur) : "#fff",
        minHeight: "80vh",
      }}
    >
      <h1>Kan ik vandaag een korte broek aan?</h1>
      {laden && <p>Weerdata wordt geladen...</p>}
      {fout && <p>Fout bij het ophalen van weergegevens: {fout}</p>}
      {temperatuur !== null && (
        <div>
          <p className="temperatuur">De temperatuur is: {temperatuur}°C</p>
          <p className="date">{today}</p>
          <p>{regenkans()}</p>
          <p>{korteBroekAdvies()}</p>
        </div>
      )}
    </div>
  );
}

export default App;
