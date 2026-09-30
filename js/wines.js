const winesData = {
  2023: [
    {
      name: "Sparkling Rosé",
      grapes: "70% Pineau d'aunis, 25% Gamay, 5% Poulsard",
      description: `Co-fermented and left on the fine lees for eleven months. Re-fermented in bottle, without disgorgement. Redolent of light, bubbly blackcurrant juice.

Oh, and say 'Hello' to our resident Polled Dorsets, aka our landscaping and fertilising team!`,
      abv: "10%",
      photo: "FN23.png"
    },
    {
      name: "Skinsy White Blend",
      grapes: "50% Ortega, 27% Solaris, and a blend of Chardonnay, Bacchus, and Pinot blanc",
      description: "Harvested first, our Solaris and ripest Ortega were destemmed and left to macerate for one week. Two weeks later, the rest of the Ortega and other varieties in the blend followed with a day spent on skins. Blended before bottling after resting for 11 months on the fine lees.",
      abv: "10%",
      photo: "WB23.png"
    },
    {
      name: "Pink Blend",
      grapes: "A blend of Chardonnay, Bacchus, Ortega, Pineau d'aunis, Gamay, Pinot noir, Pinot blanc, Pinot gris, Pinot meunier, Auxerrois, Poulsard",
      description: `All varieties were de-stemmed, fermented and then left on the lees for 11 months. Our dark rosé is the result of blending red and white wines before bottling.

Teeming with notes of dark red fruits. Reminiscent of late English summers.`,
      abv: "10%",
      photo: "PB23.png"
    },
    {
      name: "Josephine Red Blend",
      grapes: "40% Pinot noir, 30% Pinot meunier, 30% Auxerrois",
      description: `After a gentle, seven day maceration, this cuvée was aged 11 months on the fine lees.

Terroir-driven and demonstrating that authentic still wines are possible which reflect the Essex countryside.

Our label displays a pargetting pattern originally created by working with a stamp unique to the farmhouse, and is illustrative of the local plasterwork style of the same name.

This cuveé is dedicated to the late Davies family matriach, Jo.`,
      abv: "11%",
      photo: "J23.png"
    }
  ],
  2024: [
    {
      name: "Sparkling Rosé",
      grapes: "A field blend of Ortega, Bacchus, Pinot noir, Pinot gris, Chardonnay, Auxerrois, Pinot blanc, and Pineau d'aunis",
      description: `The positive result of a very difficult vintage, in which tiny volumes required us to blend everything together to make a single cuvée.
Co-fermented and left on the fine lees for eleven months. Re-fermented in bottle, without disgorgement.

A light blush with added complexity and finesse due to the diverse blend of varieties.

Oh, and say 'Hello' to our resident Polled Dorsets, aka our landscaping and fertilising team!`,
      abv: "10.5%",
      photo: "FN24.png"
    }
  ],
  2025: [
    {
      name: "Pinot Meunier Piquette",
      grapes: "100% Pinot meunier",
      description: `Since Roman times, piquette has been quenching the thirst of labourers and vineyard workers.

Made from rehydrated Pinot meunier skins, then refermented in the bottle to produce a lively, low-ABV sparkling beverage.

Light on the palate, bursting with hedgerow fruits and freshness.`,
      abv: "7%",
      photo: "PQ25.png"
    }
  ]
};

function initWines() {
  const vintageMenu = document.getElementById('vintageMenu');
  const winesList = document.getElementById('winesList');
  let currentVintage = '2023';

  Object.keys(winesData).sort().forEach(year => {
    const li = document.createElement('li');
    const button = document.createElement('button');
    button.className = 'wines__year';
    button.textContent = year;
    button.setAttribute('data-year', year);

    if (year === currentVintage) {
      button.classList.add('wines__year--active');
    }

    button.addEventListener('click', () => {
      document.querySelectorAll('.wines__year').forEach(btn => {
        btn.classList.remove('wines__year--active');
      });
      button.classList.add('wines__year--active');
      currentVintage = year;
      renderWines(year);
    });

    li.appendChild(button);
    vintageMenu.appendChild(li);
  });

  renderWines(currentVintage);

  function renderWines(year) {
    winesList.innerHTML = '';
    const wines = winesData[year] || [];

    wines.forEach((wine) => {
      const wineDiv = document.createElement('div');
      wineDiv.className = 'wine-item';

      const photoFig = document.createElement('figure');
      photoFig.className = 'wine-item__figure';
      const img = document.createElement('img');
      img.className = 'wine-item__photo';
      img.src = `photos/Wines/${wine.photo}`;
      img.alt = wine.name;
      img.width = 2000;
      img.height = 3000;
      img.decoding = 'async';
      photoFig.appendChild(img);

      const textDiv = document.createElement('div');
      textDiv.className = 'wine-item__text';

      const namePara = document.createElement('p');
      namePara.className = 'wine-item__name';
      namePara.textContent = wine.name;
      textDiv.appendChild(namePara);

      const grapesPara = document.createElement('p');
      grapesPara.className = 'wine-item__grapes';
      grapesPara.textContent = wine.grapes;
      textDiv.appendChild(grapesPara);

      const descriptionParagraphs = wine.description.split('\n\n');
      descriptionParagraphs.forEach((para, index) => {
        const p = document.createElement('p');
        p.className = 'wine-item__description';
        p.textContent = para.trim();
        textDiv.appendChild(p);
      });

      const abvPara = document.createElement('p');
      abvPara.className = 'wine-item__description';
      abvPara.textContent = `ABV: ${wine.abv}`;
      textDiv.appendChild(abvPara);

      wineDiv.appendChild(photoFig);
      wineDiv.appendChild(textDiv);
      winesList.appendChild(wineDiv);
    });
  }
}

document.addEventListener('DOMContentLoaded', initWines);
