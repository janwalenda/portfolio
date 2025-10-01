export function getCSSVar(varName: string) {
  return window.getComputedStyle(document.documentElement).getPropertyValue(varName);
}
