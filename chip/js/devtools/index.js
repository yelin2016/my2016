import React from 'react';
import { createDevTools } from 'redux-devtools';
import LogMonitor from 'redux-devtools-log-monitor';
import DockMonitor from 'redux-devtools-dock-monitor';

const DevTools = createDevTools(
  <DockMonitor defaultIsVisible={false} toggleVisibilityKey="ctrl-alt-e"
               changePositionKey="ctrl-alt-p">
    <LogMonitor theme='tomorrow' />
  </DockMonitor>
);

export default DevTools;
