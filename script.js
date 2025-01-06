const keywords = [
  "Comment sections",
  "Gossip",
  "Rage-baiting opinions",
  "Sensationalist news",
  "Clickbait headlines",
  "Unverified social media posts",
  "Viral content without credible sources",
  "Sensationalized tabloids",
  "Shock jock radio shows",
  "Conspiracy theories",
  '"Reality" TV',
  "Trash TV",
  "Sensational documentaries with little fact-checking",
  "Overly commercialized pop music with no artistic depth",
  "Low-effort music",
  "Mass-produced novelty art",
  "AI-written books",
  "Overly sentimental art",
  "Pornography",
];

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function isOverlapping(el1, el2) {
  const rect1 = el1.getBoundingClientRect();
  const rect2 = el2.getBoundingClientRect();

  return !(
    rect1.right < rect2.left ||
    rect1.left > rect2.right ||
    rect1.bottom < rect2.top ||
    rect1.top > rect2.bottom
  );
}

function getRandomPosition(container) {
  const containerWidth = container.offsetWidth;
  const containerHeight = container.offsetHeight;

  const randomX = Math.random() * (containerWidth - 150);
  const randomY = Math.random() * (containerHeight - 30);

  return { x: randomX, y: randomY };
}

function placeKeywordsWithoutOverlap(stage1Container, keywordsArray) {
  let retries = 0;
  let scaleDown = false;
  stage1Container.innerHTML = "";

  const placedKeywords = [];

  keywordsArray.forEach((keyword) => {
    const span = document.createElement("span");
    span.textContent = keyword;
    span.classList.add("keyword");
    if (keyword.length > 10) {
      span.classList.add("long");
    }

    let position;
    let overlaps;

    do {
      position = getRandomPosition(stage1Container);
      span.style.left = `${position.x}px`;
      span.style.top = `${position.y}px`;

      overlaps = placedKeywords.some((existingSpan) =>
        isOverlapping(span, existingSpan)
      );

      retries++;

      if (retries > 500) {
        scaleDown = true;
        break;
      }
    } while (overlaps);

    if (!overlaps) {
      stage1Container.appendChild(span);
      placedKeywords.push(span);
    }
  });

  if (scaleDown) {
    console.warn("Scaling down keywords to prevent overlap");
    stage1Container.classList.add("scaled");
  } else {
    stage1Container.classList.remove("scaled");
  }
}

function insertKeywords() {
  const stage1Container = document.querySelector(".stage-1");
  if (!stage1Container) {
    console.error("No element with class 'stage-1' found.");
    return;
  }

  shuffleArray(keywords);
  placeKeywordsWithoutOverlap(stage1Container, keywords);
}

document.addEventListener("DOMContentLoaded", insertKeywords);
