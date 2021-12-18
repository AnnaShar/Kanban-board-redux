export const selectTasksByColumn = columnID => state => {
    return state.board.columns[columnID].tasks.map(taskID => state.board.tasks[taskID])
}