/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter } from 'react-router-dom';
import { ClickSpark } from './components/reactbits';
import { CustomCursor } from './components/ui/CustomCursor';
import { DeepTimePreloader } from './components/ui/DeepTimePreloader';
import { PageWipeTransition } from './components/ui/PageWipeTransition';
import { SoundToggleBlock } from './components/ui/SoundToggleBlock';
import { AppRoutes } from './routes';

export default function App() {
  return (
    <BrowserRouter>
      <ClickSpark sparkColor="#FFD400" sparkRadius={26} sparkSize={11} sparkCount={8}>
        <DeepTimePreloader />
        <PageWipeTransition />
        <SoundToggleBlock />
        <CustomCursor />
        <AppRoutes />
      </ClickSpark>
    </BrowserRouter>
  );
}
