document.addEventListener('DOMContentLoaded', function() {
    const gameList = document.getElementById('game-list');
    const gameDetails = document.getElementById('game-details');
    const gameIframe = document.getElementById('game-iframe');
    const leftBox = document.getElementById('left-box');
    const rightBox = document.getElementById('right-box');
    const bottomBox = document.getElementById('bottom-box');


    const colors = ["#cb680bcf","#7c35decf","#d63605cf","#2ec4b5dc"];

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
            
            bottomBox.innerHTML = `<h3>${game.title}</h3> <small>${game.description}</small> <br><br><br><br>  <p>${game.details}</p> <a href="${game.link}" target="_blank" rel="noopener noreferrer" style="bottom:0px;">Game Link</a>`;
            gameList.style.display = 'none';
            gameDetails.style.display = 'block';
        }
    }

    // takes back to the project list
    function showGameList() {
        gameList.style.display = 'block';
        gameDetails.style.display = 'none';
    }

    function createGameCard(index, game) {
        const color = colors[index % colors.length];
        let title = game.title;
        if (game.iframe){
            title = `${game.title} <br><small style=\"font-style:italic;\">Play in browser</small>`;
        }

        return `
            <div class="compact-box d-flex align-items-center mt-3" style="background-color: ${color}; color: white;">
                <div class="compact-image">
                    <img src="${game.image}" alt="Placeholder Image" "> </div>
                <div class="compact-text ms-3">
                    <h3>${title}</h3>
                    <p>${game.description}</p> </div>
                <div class="compact-button d-grid col-8 col-sm-8 col-md-1 col-lg-1  justify-content-md-end">
                    <button class="btn btn-warning" onclick="location.href='#${index}'" >Game Details</button>
                </div>
            </div>`;
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