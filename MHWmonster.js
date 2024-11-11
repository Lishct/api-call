fetch('https://mhw-db.com/monsters')
    .then(response => {
        if (!response.ok) {
            switch (response.status) {
                case 404:
                    throw new Error('Error 404: Not Found - The requested resource could not be found.');
                case 500:
                    throw new Error('Error 500: Internal Server Error - Please try again later.');
                default:
                    throw new Error('An unexpected error occurred: ' + response.status);
            }
        }
        return response.json();
    })
    .then(data => {
        const monsterList = document.getElementById('monster-list');
        data.forEach(monster => {
            const listItem = document.createElement('li');
            listItem.innerHTML = `<strong>Name:</strong> ${monster.name} <br>
                                  <strong>Species:</strong> ${monster.species} <br>
                                  <strong>Type:</strong> ${monster.type} <br>
                                  <strong>Description:</strong> ${monster.description}`;
            monsterList.appendChild(listItem);
        });
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
        const errorMessage = document.getElementById('error-message');
        errorMessage.innerText = error.message;
    });