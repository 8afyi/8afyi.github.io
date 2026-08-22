(function () {
  var root = document.getElementById('fom');
  var dataEl = document.getElementById('fom-data');
  if (!root || !dataEl) return;

  var config;
  try {
    config = JSON.parse(dataEl.textContent);
  } catch (err) {
    return;
  }

  var pool = [];
  (config.fonts || []).forEach(function (name) {
    pool.push({ answer: 'font', name: name });
  });
  (config.microbrands || []).forEach(function (name) {
    pool.push({ answer: 'microbrand', name: name });
  });
  if (!pool.length) return;

  var roundSize = Math.min(config.roundSize || 20, pool.length);

  var positionEl = document.getElementById('fom-position');
  var scoreEl = document.getElementById('fom-score');
  var streakEl = document.getElementById('fom-streak');
  var promptEl = document.getElementById('fom-prompt');
  var guessEl = document.getElementById('fom-guess');
  var resultEl = document.getElementById('fom-result');
  var verdictEl = document.getElementById('fom-verdict');
  var nextEl = document.getElementById('fom-next');

  var deck = [];
  var index = 0;
  var answered = 0;
  var score = 0;
  var streak = 0;
  var bestStreak = 0;
  var round = 0;
  var roundOver = false;

  var STREAK_TARGET = 5;

  function shuffled(items) {
    var copy = items.slice();
    for (var i = copy.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var tmp = copy[i];
      copy[i] = copy[j];
      copy[j] = tmp;
    }
    return copy;
  }

  function label(answer) {
    return answer === 'font' ? 'font' : 'microbrand';
  }

  function renderStreak() {
    streakEl.value = Math.min(streak, STREAK_TARGET);
  }

  function renderScore() {
    scoreEl.textContent = score + ' / ' + answered +
      (bestStreak ? '   best streak ' + bestStreak : '');
  }

  function startRound() {
    deck = shuffled(pool).slice(0, roundSize);
    index = 0;
    answered = 0;
    score = 0;
    streak = 0;
    roundOver = false;
    round++;
    nextEl.textContent = 'next (space)';
    renderScore();
    renderStreak();
    draw();
  }

  function draw() {
    var card = deck[index];
    positionEl.textContent = (index + 1) + ' of ' + roundSize + '   round ' + round;
    promptEl.textContent = card.name;
    resultEl.hidden = true;
    guessEl.hidden = false;
  }

  function guess(answer) {
    if (!resultEl.hidden || roundOver) return;

    var card = deck[index];
    var correct = answer === card.answer;

    answered++;
    if (correct) {
      score++;
      streak++;
      if (streak > bestStreak) bestStreak = streak;
    } else {
      streak = 0;
    }

    verdictEl.innerHTML = (correct ? '<ins>correct</ins>' : '<del>nope</del>') +
      ' — ' + label(card.answer);

    renderScore();
    renderStreak();

    guessEl.hidden = true;
    resultEl.hidden = false;
    nextEl.focus();
  }

  function finishRound() {
    roundOver = true;

    var ratio = score / roundSize;
    var grade = ratio > 0.8 ? 'sharp' : ratio > 0.55 ? 'not bad' : 'ouch';

    positionEl.textContent = 'round ' + round + ' complete';
    promptEl.textContent = score + '/' + roundSize;

    verdictEl.textContent = grade + '. longest streak ' + bestStreak;

    guessEl.hidden = true;
    resultEl.hidden = false;
    nextEl.textContent = 'new round of ' + roundSize;
    nextEl.focus();
  }

  function next() {
    if (roundOver) return startRound();
    index++;
    if (index < deck.length) return draw();
    finishRound();
  }

  guessEl.addEventListener('click', function (event) {
    var button = event.target.closest('[data-answer]');
    if (button) guess(button.getAttribute('data-answer'));
  });

  nextEl.addEventListener('click', next);

  document.addEventListener('keydown', function (event) {
    if (event.metaKey || event.ctrlKey || event.altKey) return;

    var key = event.key.toLowerCase();
    if (key === 'f') return guess('font');
    if (key === 'm') return guess('microbrand');

    if (event.code === 'Space' && !resultEl.hidden) {
      event.preventDefault();
      next();
    }
  });

  startRound();
}());
