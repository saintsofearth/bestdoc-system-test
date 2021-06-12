
let DOMDebugElement;
let playlistToUpdate;

let closePlaylistDOM = document.querySelector('.playlistFormCloseIcon');

let closeSongDOM = document.querySelector('.songFormCloseIcon');
let addPlaylistBtn = document.querySelector('#addPlaylistBtn');
let addSongBtn = document.querySelector('#addSongBtn');




let tableControl = document.querySelector('#table-control');

/**************** EVENT LISTENERS **************************** */


closePlaylistDOM.addEventListener('click', removePlaylistForm);
closeSongDOM.addEventListener('click', removeSongForm);
tableControl.addEventListener('click', tableController);
addPlaylistBtn.addEventListener('click', addPlaylist);
addSongBtn.addEventListener('click', addSong);



/**************** HELPER FUNCTIONS **************************** */


function tableController(event) {
    let element = event.target;
    if (element && element.value === 'addNewPlaylist') {

        displayPlaylistForm();

    } else if (element && element.value === 'deleteSong') {
        
        deleteSong(element);

    } else if (element && element.value === 'addSong') {
        addSongForm(element);
    } else if (element && element.value === 'deletePlaylist') {

        deletePlaylist(element);

    }
}

function displayPlaylistForm() {
    let playlistFormDOM = document.querySelector('.playlistForm');
    playlistFormDOM.classList.remove('out-view');
    playlistFormDOM.classList.add('in-view');
}



function addPlaylist() {
    let playlistName = document.querySelector('#playlistNameInput');
    const data = { playlistName: playlistName.value };
    fetch('http://localhost:3000/user/add-playlist', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .then(result => {
            window.location.reload();
        })
        .catch(err => {
            console.log(err);
        })

}

function deletePlaylist(element) {
    let playlistId = element.parentElement.parentElement.childNodes[1].querySelector('input[type="hidden"]').value;
    fetch(`http://localhost:3000/user/delete-playlist/${playlistId}`, {
        method: 'DELETE'
    })
        .then(response => response.json())
        .then(result => {
            window.location.reload();
        })
        .catch(err => console.log(err));
}

function deleteSong(element) {
    let songId = element.parentElement.childNodes[3].value;;
    let playlistId = element.parentElement.parentElement.parentElement.parentElement.childNodes[1].querySelector('input[type="hidden"]').value;;
    fetch(`http://localhost:3000/user/delete-song/${playlistId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ "songId": songId })
    })
        .then(response => response.json())
        .then(result => {
            window.location.reload();
        })
        .catch(err => { console.log(err) })
    
}

function addSong() {
    let songsDOM = document.querySelectorAll(`.songs-list input[type='checkbox']`);
    let selectedSongIds = [];
    for (let i = 0; i < songsDOM.length; i++) {
        if (songsDOM[i].checked) { 
            selectedSongIds.push(songsDOM[i].parentElement.childNodes[5].value);
        }
    }
    let data = {
        songIds: selectedSongIds
    }
    fetch(`http://localhost:3000/user/edit-playlist/${playlistToUpdate}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .then(result => {
            window.location.reload();
        })
        .catch(err => console.log(err));
}

function addSongForm(element) {
    let songFormDOM = document.querySelector('.songForm');
    songFormDOM.classList.remove('out-view');
    songFormDOM.classList.add('in-view');
    DOMDebugElement = element;
    playlistToUpdate = element.parentElement.parentElement.childNodes[1].querySelector('input[type="hidden"]').value;
}

function removePlaylistForm() {
    let playlistFormDOM = document.querySelector('.playlistForm');
    playlistFormDOM.classList.remove('in-view');
    playlistFormDOM.classList.add('out-view');
    clearAllInputs();
}

function removeSongForm() {
    let songFormDOM = document.querySelector('.songForm');
    songFormDOM.classList.remove('in-view');
    songFormDOM.classList.add('out-view');
    clearAllInputs();
}

function clearAllInputs() {
    let textInput = document.querySelector(`input[type='text']`);
    let checkboxInput = document.querySelectorAll(`input[type='checkbox']`);
    textInput.value = '';
    for (let i = 0; i < checkboxInput.length; i++) {
        checkboxInput[i].checked = false;
    }
}