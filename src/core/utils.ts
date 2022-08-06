export function setTitle(title: string) {
  document.title = `To Do - ${title || 'List'}`;
}