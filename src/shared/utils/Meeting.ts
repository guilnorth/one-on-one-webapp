export function getLabelTag(meeting) {
    if (meeting?.isCompleted) return 'Concluída';
    if (meeting?.isStarted) return 'Em andamento';
    return 'Em planejamento';
}