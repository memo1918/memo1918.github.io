document.addEventListener('DOMContentLoaded', function() {
    const gameList = document.getElementById('game-list');
    const gameDetails = document.getElementById('game-details');
    const gameIframe = document.getElementById('game-iframe');
    const leftBox = document.getElementById('left-box');
    const rightBox = document.getElementById('right-box');
    const bottomBox = document.getElementById('bottom-box');

    let games = {};

    function loadGames() {
        fetch('../data/games.json')
            .then(response => response.json())
            .then(data => {
                games = data.games;
                initializePage();
            })
            .catch(error => console.error('Error loading games json:', error));
    }
    

    // loads the project details based on the project id
    function loadGameDetails(gameId) {
        const game = games[gameId];
        if (game) {
            if (game.iframe) {
                const iframe = game.iframe.replace('width=""', `width="100%"`)
                .replace('height=""', `height="100%"`);
                gameIframe.innerHTML = `<div class="iframe-container">${iframe}</div>`;
                leftBox.innerHTML += `<h3>Rules</h3> <p class="side-box">${game.rules}</p>`;
                leftBox.style.display = 'block';

                rightBox.innerHTML += `<h3>How to Play</h3> <p class="side-box">${game.howto}</p>`;
                rightBox.style.display = 'block';
            }
            
            let detailsContent = '';
            if (game.details && game.details.endsWith('.html')) {
                fetch(game.details)
                    .then(response => response.text())
                    .then(htmlContent => {
                        detailsContent = htmlContent;
                        updateGameContent(game, detailsContent);
                    })
                    .catch(error => {
                        console.error('Error loading game details:', error);
                    });
            } else {
                detailsContent = `<p>${game.details}</p>`;
                updateGameContent(game, detailsContent);
            }
        }
    }

    function updateGameContent(game, detailsContent) {
        bottomBox.innerHTML = `
            <h2>${game.title}</h2>
            <br>
            <div class="text">${detailsContent}
            <a href="${game.link}" target="_blank" rel="noopener noreferrer" style="bottom:0px;">Game Link</a></div>
        `;
        gameList.style.display = 'none';
        gameDetails.style.display = 'block';
    }

    // takes back to the project list
    function showGameList() {
        gameList.style.display = 'block';
        gameDetails.style.display = 'none';
    }

    function createGameCard(index, game) {
        let title = game.title;
        if (game.iframe){
            title = `${game.title} <br><small style=\"font-style:italic;\">Play in browser</small>`;
        }

        return `
            <a class="box-link"  href="#${index}">
            <div class="compact-box d-flex align-items-center mt-3"">
                <!-- <div class="compact-image">
                    <img src="${game.image}" alt="Placeholder Image" "> </div> -->
                <div class="compact-text ms-3">
                    <h3 class="header-with-line projeButton">${title}</h3>
                    <p>${game.description}</p> </div>
            </div>
            </a>`;
    }

    function initializePage() {
        window.addEventListener('hashchange', function() {
            const hash = window.location.hash.substring(1);
            if (hash && games[hash]) {
                loadGameDetails(hash);
            } else {
                showGameList();
            }
        });


        const initialHash = window.location.hash.substring(1);
        if (initialHash && games[initialHash]) {
            loadGameDetails(initialHash);
        } else {
            showGameList();
        }

        games.forEach((game, index) => {
            gameList.innerHTML += createGameCard(index, game);
        });
    }

    loadGames();

});