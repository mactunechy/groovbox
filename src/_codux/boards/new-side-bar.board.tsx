import React from 'react';
import { createBoard } from '@wixc3/react-board';
import { Sidebar } from '@components/new';

export default createBoard({
    name: 'New SideBar',
    Board: () => <Sidebar />,
    environmentProps: {
        windowHeight: 415
    }
});
