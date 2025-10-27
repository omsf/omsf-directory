export function filterToggle(tag: string, list: Array<string>) {
  if (list.includes(tag)) {
    const index = list.indexOf(tag);
    list.splice(index, 1);
  } else {
    list.push(tag);
  }
}

export function isMobileWidth(width: number): boolean {
  return width < 768;
}
