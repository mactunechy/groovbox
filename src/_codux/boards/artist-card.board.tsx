import React from 'react';
import { createBoard } from '@wixc3/react-board';
import { ArtistCard } from '@components/new';

export default createBoard({
    name: 'Artist Card',
    Board: () => <ArtistCard />,
    environmentProps: {
        canvasWidth: 352
    }
});
