export function calculateCaretPosition(
  currentPosition: number,
  localContent: string,
  serverContent: any
) {
  const beforeCaret = localContent.substring(0, currentPosition);
  const newBeforeCaret = serverContent.substring(0, currentPosition);

  if (beforeCaret !== newBeforeCaret) {
    currentPosition += serverContent.length - localContent.length;
  }

  return currentPosition;
}
