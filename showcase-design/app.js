// Educational, in-browser LIS demonstration; does not execute repository C++.
const form = document.getElementById('sequence-form');
const input = document.getElementById('numbers');
const error = document.getElementById('sequence-error');
const viz = document.getElementById('viz');
function draw(values) {
  const lengthAt = values.map(() => 1);
  const previous = values.map(() => -1);
  for (let i = 0; i < values.length; i++) {
    for (let j = 0; j < i; j++) {
      if (values[i] > values[j] && lengthAt[j] + 1 > lengthAt[i]) {
        lengthAt[i] = lengthAt[j] + 1;
        previous[i] = j;
      }
    }
  }
  let best = lengthAt.indexOf(Math.max(...lengthAt));
  const selected = new Set();
  while (best !== -1) { selected.add(best); best = previous[best]; }
  const min = Math.min(...values), max = Math.max(...values);
  viz.replaceChildren();
  values.forEach((value, index) => {
    const bar = document.createElement('div');
    bar.className = `bar${selected.has(index) ? ' selected' : ''}`;
    bar.style.setProperty('--height', `${22 + ((value - min) / (max - min || 1)) * 72}%`);
    bar.textContent = value;
    bar.setAttribute('title', `${value}${selected.has(index) ? ', selected in an increasing subsequence' : ''}`);
    viz.append(bar);
  });
  const length = Math.max(...lengthAt);
  document.getElementById('length').textContent = String(length);
  document.getElementById('explainer').textContent = `One longest rising subsequence contains ${length} value${length === 1 ? '' : 's'} (highlighted). Other numbers remain visible for context.`;
}
form.addEventListener('submit', event => {
  event.preventDefault();
  const parts = input.value.split(',').map(part => part.trim());
  if (parts.length < 1 || parts.length > 14 || parts.some(part => !/^-?\d+$/.test(part) || !Number.isSafeInteger(Number(part)))) {
    error.textContent = 'Enter 1–14 whole numbers separated by commas.'; error.hidden = false; return;
  }
  error.hidden = true;
  draw(parts.map(Number));
});
form.requestSubmit();
