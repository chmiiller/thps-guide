import { createClient } from '@supabase/supabase-js'

const supabase = createClient();

let currentId = 2054;

export const addGoals = async (goal) => {
    let dataToAdd = [];

    dataToAdd.map((g) => {
        currentId++;
        g.id = currentId;
    });
    
    // try {
    //     let toAdd = await supabase
    //     .from('goals')
    //     .insert(dataToAdd);
    //     console.log(' >>>>>>>>>>>>>>>>>>>>>>>>>>>>> toAdd: ' + JSON.stringify(toAdd,null,'    '));
    //     return toAdd;
    // } catch (error) {
    //     console.log('error', error)
    // }
}

export const createLevels = async () => {
    try {
      let levels = await supabase
        .from('levels')
        .insert([
            { id: 100, game_id: 1, image: '', name: 'Warehouse', subtitle: '', searchable: 'warehouse' },
        ]);
      return levels;
    } catch (error) {
      console.log('Error: ', error)
    }
}

export const updateGameName = async () => {
    try {
        let updates = await supabase
            .from('games')
            .update({ title: "Tony Hawk's Pro Skater 2" })
            .match({ id: 2 });
      return updates;
    } catch (error) {
      console.log('Error: ', error)
    }
}

export const getAvailableGames = async () => {
    try {
        const { body } = await supabase
            .from('games')
            .select('*')
            .order('id', 'sortAscending')
            .filter('available', 'eq', 1);
        return body;
    } catch (error) {
        console.log('error', error);
    }
}

export const getSettings = async () => {
    try {
        const { body } = await supabase
            .from('settings')
            .select('*')
            .order('id', 'sortAscending');
        return body;
    } catch (error) {
        console.log('error', error);
    }
}

export const getLevelsByGameId = async (gameId) => {
    try {
        const { body } = await supabase
            .from('levels')
            .select('*')
            .order('id', 'sortAscending')
            .filter('game_id', 'eq', gameId);
        return body;
    } catch (error) {
        console.log('error', error);
    }
}

export const getGoalsByLevelId = async (levelId) => {
    try {
        const { body } = await supabase
            .from('goals')
            .select('*')
            .order('id', 'sortAscending')
            .filter('level_id', 'eq', levelId);
        return body;
    } catch (error) {
        console.log('error', error);
    }
}
