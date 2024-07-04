const config = {
    baseUrl: 'https://nomoreparties.co/v1/wff-cohort-16',
    headers: {
      authorization: '39abbecd-917f-4c6d-8dbf-06f37eb82d0b',
      'Content-Type': 'application/json'
    }
  }

function getResponseData(res) {
    console.log(res)
    if (!res.ok) {
        return Promise.reject(`Ошибка: ${res.status}`); 
    }
    return res.json();
}
  
export function getInitialCards() {
    return fetch(`${config.baseUrl}/cards`, {
        headers: {
            authorization: config.headers.authorization,
            'Content-Type': config.headers['Content-Type']
        }
    })
    .then(res => getResponseData(res))
    .catch((err) => {
        console.log(err);
    });
}

export function getUserInfo() {
    return fetch(`${config.baseUrl}/users/me `, {
        headers: {
            authorization: config.headers.authorization,
            'Content-Type': config.headers['Content-Type']
        }
    })
    .then(res => getResponseData(res))
    .catch((err) => {
        console.log(err);
    });
}

export function getAllData() {
    return Promise.all([getInitialCards(), getUserInfo()])
    .then(([cards, userInfo]) => {
        return { cards, userInfo };
    })
        .catch((err) => {
        console.log('Error in Promise.all:', err);
    });
}

  export function addNewPlace(name, link) {  
    return fetch(`${config.baseUrl}/cards`, {
        method: 'POST',
        headers: {
        authorization: config.headers.authorization,
        'Content-Type': config.headers['Content-Type']
        },
        body: JSON.stringify({
            name: name,
            link: link
        })
    })
    .then(res => getResponseData(res))
        .catch((err) => {
            console.log(err);
          });  
}

export function deleteCardFromServer(id) {  
    return fetch(`${config.baseUrl}/cards/${id}`, {
        method: 'DELETE',
        headers: {
        authorization: config.headers.authorization,
        'Content-Type': config.headers['Content-Type']
        },
    }) 
}

export function giveLike(id) {  
    return fetch(`${config.baseUrl}/cards/likes/${id}`, {
        method: 'PUT',
        headers: {
        authorization: config.headers.authorization,
        'Content-Type': config.headers['Content-Type']
        }
    })
        .then(res => getResponseData(res))
            .catch((err) => {
                console.log(err);
              }); 
     
}

export function deleteLike(id) {  
    return fetch(`${config.baseUrl}/cards/likes/${id}`, {
        method: 'DELETE',
        headers: {
        authorization: config.headers.authorization,
        'Content-Type': config.headers['Content-Type'],
        }
    })
        .then(res => getResponseData(res))
            .catch((err) => {
                console.log(err);
              }); 
     
}

export function updateUserInfo(name, description) {  
    return fetch(`${config.baseUrl}/users/me `, {
        method: 'PATCH',
        headers: {
        authorization: config.headers.authorization,
        'Content-Type': config.headers['Content-Type']
        },
        body: JSON.stringify({
            name: name,
            about: description
        })
    }).then(res => getResponseData(res))
        .catch((err) => {
            console.log(err);
          });  
      }

      export function updateAvatar(avatar) {  
        return fetch(`${config.baseUrl}/users/me/avatar`, {
            method: 'PATCH',
            headers: {
                authorization: config.headers.authorization,
                'Content-Type': config.headers['Content-Type']
                },
            body: JSON.stringify({ avatar })
        })
        .then(getResponseData)
        .catch(err => {
            console.error('Error updating avatar:', err);
        });
    }
  
