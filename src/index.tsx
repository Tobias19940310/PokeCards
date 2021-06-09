import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

// KNOWN BUGS
// - Zu schnelles Klicken auf die Evolutions Chips kann zu unvollständigen API-Requests führen
// - Probleme, bei (sehr) wenigen Entwicklungs-API-Calls - dürfte mit Namen der Species zusammenhängen
// - Evoli (oder mehrere Pokemon) haben komplexe Evolutionsketten, die noch nicht vollständig dargestellt werden

// ADDITIONAL FEATURES
// -Suchfunktion mit Name oder ID
// -Anzahl angezeigter Pokemon vom User veränderbar
// -Custom Scrollbar, die nicht über die NavBar geht

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

