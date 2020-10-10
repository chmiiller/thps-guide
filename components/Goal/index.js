import React from 'react';

import { ATOM_BLUE } from '../../constants/colors';
import ListItemWithDetails from '../ListItemWithDetails';

const Goal = ({ item, onClick, completed = false }) => {
    const icon = (!completed) ? null : { name: 'check-bold', size: 22, color: ATOM_BLUE };
    return <ListItemWithDetails item={item} onClick={onClick} icon={icon} />;
}

export default Goal;
