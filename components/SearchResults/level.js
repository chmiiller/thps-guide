import React from 'react';

import ListItemWithDetails from '../ListItemWithDetails';

const LevelResult = ({ item, onClick }) => {
    item.title = item.name;
    return <ListItemWithDetails item={item} onClick={onClick} />;
}

export default LevelResult;