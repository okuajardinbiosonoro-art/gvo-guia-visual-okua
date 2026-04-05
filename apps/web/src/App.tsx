import { Navigate, Route, Routes } from 'react-router-dom';
import { WelcomeScreen } from './screens/WelcomeScreen';
import { GuideSelectionScreen } from './screens/GuideSelectionScreen';
import { IntroScreen } from './screens/IntroScreen';
import { StationScreen } from './screens/StationScreen';
import { BlockedScreen } from './screens/BlockedScreen';
import { FinalScreen } from './screens/FinalScreen';

export default function App() {
  return (
    <Routes>
      <Route path="/"            element={<WelcomeScreen />} />
      <Route path="/guide"       element={<GuideSelectionScreen />} />
      <Route path="/intro"       element={<IntroScreen />} />
      <Route path="/station/:id" element={<StationScreen />} />
      <Route path="/blocked"     element={<BlockedScreen />} />
      <Route path="/final"       element={<FinalScreen />} />
      <Route path="*"            element={<Navigate to="/" replace />} />
    </Routes>
  );
}
