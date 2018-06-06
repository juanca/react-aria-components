export default function debounce(funk) {
  let lastCalled = 0;

  return function debounced(...args) {
    const now = Date.now();
    const timeSinceLastCalled = now - lastCalled;
    if (timeSinceLastCalled >= 1000) {
      lastCalled = now;
      funk(...args);
    }
  }
}
