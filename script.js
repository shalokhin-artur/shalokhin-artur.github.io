'use strict';
const worlds = [
  ['basement', 'Подвал', 'Хомяк в подвале, среди деревянных платформ и игровых препятствий'],
  ['kitchen', 'Кухня', 'Кухонный уровень с лазерами, платформами и светящимися желудями'],
  ['living', 'Гостиная', 'Игровой мир гостиной с домашними предметами и препятствиями'],
  ['attic', 'Чердак', 'Приключение на чердаке среди деревянных конструкций'],
  ['roof', 'Крыша', 'Ночная крыша в мире Morph Mouse'],
  ['rocket', 'Ракета', 'Хомяк внутри ракеты на пути к Луне'],
  ['moon', 'Луна', 'Лунный уровень с хомяком и игровыми платформами']
];
let worldIndex = 1;
function selectWorld(index) {
  worldIndex = (index + worlds.length) % worlds.length;
  const [file, title, alt] = worlds[worldIndex];
  const image = document.getElementById('world-image');
  image.src = `assets/${file}.webp`;
  image.alt = alt;
  document.getElementById('world-name').textContent = title;
  document.getElementById('world-count').textContent = `МИР ${String(worldIndex + 1).padStart(2, '0')} / 07`;
  document.getElementById('world-status').textContent = `Мир ${worldIndex + 1} из 7: ${title}`;
  document.querySelectorAll('[data-world]').forEach(button => button.setAttribute('aria-pressed', String(Number(button.dataset.world) === worldIndex)));
  const active = document.querySelector(`[data-world="${worldIndex}"]`);
  const strip = active.parentElement;
  strip.scrollTo({left: active.offsetLeft - strip.offsetLeft - (strip.clientWidth - active.clientWidth) / 2, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth'});
}
document.querySelectorAll('[data-world]').forEach(button => button.addEventListener('click', () => selectWorld(Number(button.dataset.world))));
document.getElementById('world-prev')?.addEventListener('click', () => selectWorld(worldIndex - 1));
document.getElementById('world-next')?.addEventListener('click', () => selectWorld(worldIndex + 1));
const looks = {
  astronaut: ['Хомяк в скафандре и космическом шлеме', 'Готов к невесомости. Наряд из игровой коллекции.'],
  pirate: ['Хомяк в пиратской шляпе и повязке на глазу', 'За сокровищами! Наряд из игровой коллекции.'],
  shark: ['Хомяк в костюме акулы с зубастой улыбкой', 'Маленькая, но зубастая. Подарочный наряд за покупку.']
};
document.querySelectorAll('[data-outfit]').forEach(button => button.addEventListener('click', () => {
  const look = button.dataset.outfit;
  const image = document.getElementById('outfit-image');
  image.src = `assets/${look}.webp`;
  image.alt = looks[look][0];
  document.getElementById('outfit-note').textContent = looks[look][1];
  document.querySelectorAll('[data-outfit]').forEach(other => other.setAttribute('aria-pressed', String(other === button)));
}));
let lastPet = 0;
document.getElementById('pet')?.addEventListener('click', () => {
  const now = performance.now();
  if (now - lastPet < 500) return;
  lastPet = now;
  const pet = document.getElementById('pet');
  pet.classList.remove('squish');
  void pet.offsetWidth;
  pet.classList.add('squish');
  window.setTimeout(() => pet.classList.remove('squish'), 560);
  document.getElementById('pet-status').textContent = 'Хомяк рад твоей заботе!';
  for (let i = 0; i < 5; i++) {
    const heart = document.createElement('span');
    heart.className = 'heart-float';
    heart.textContent = '♥';
    heart.style.setProperty('--dx', `${(i - 2) * 35}px`);
    heart.style.setProperty('--rot', `${(i - 2) * 17}deg`);
    heart.style.animationDelay = `${i * .06}s`;
    document.getElementById('hearts').append(heart);
    window.setTimeout(() => heart.remove(), 1700);
  }
});
