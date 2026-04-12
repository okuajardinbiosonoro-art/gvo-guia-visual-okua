import { Navigate, Route, Routes } from 'react-router-dom';
import { useJourney } from './state/JourneyProvider';
import { WelcomeScreen } from './screens/WelcomeScreen';
import { IntroScreen } from './screens/IntroScreen';
import { StationScreen } from './screens/StationScreen';
import { BlockedScreen } from './screens/BlockedScreen';
import { FinalScreen } from './screens/FinalScreen';
import { QrScreen } from './screens/QrScreen';
import { EntryScreen } from './screens/EntryScreen';

export default function App() {
  const { status, errorMessage } = useJourney();

  if (status === 'loading') {
    return (
      <div className="screen screen--standalone screen--centered">
        <p className="screen-text screen-text--muted">Iniciando sesión…</p>
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div className="screen screen--standalone screen--centered">
        <div className="screen-header">
          <h2 className="screen-title">Sin conexión</h2>
          <p className="screen-subtitle">{errorMessage}</p>
        </div>
      </div>
    );
  }

  return (
    <Routes>
      <Route path="/"            element={<WelcomeScreen />} />
      <Route path="/intro"       element={<IntroScreen />} />
      <Route path="/station/:id" element={<StationScreen />} />
      <Route path="/entry/:token" element={<EntryScreen />} />
      <Route path="/qr/:token"   element={<QrScreen />} />
      <Route path="/blocked"     element={<BlockedScreen />} />
      <Route path="/final"       element={<FinalScreen />} />
      <Route path="*"            element={<Navigate to="/" replace />} />
    </Routes>
  );
}
