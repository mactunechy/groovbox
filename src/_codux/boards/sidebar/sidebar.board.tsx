import React from 'react';
import { createBoard } from '@wixc3/react-board';
import { Sidebar } from '@components';

export default createBoard({
  name: 'Sidebar',
  Board: () => <Sidebar />,
  environmentProps: {
    canvasHeight: 832,
  },
});
