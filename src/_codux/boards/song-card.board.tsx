import React from 'react';
import { createBoard } from '@wixc3/react-board';
import SongCard from '@components/new/SongCard';

export default createBoard({
    name: 'SongCard',
    Board: () => <SongCard />,
    environmentProps: {
        canvasWidth: 327
    }
});
