let counter = 0;

export default function uniqueId() {
  counter++;
  return `$rac$${counter}`;
}
