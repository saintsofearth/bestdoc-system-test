const Playlist = require('../model/Playlist');
const Songs = require('../model/Song');


exports.getHomePage = async (req, res, next) => {
    let songs = await Songs.find();
    let playlists = await Playlist.find().populate('songs').exec();
    res.status(200).render('index', {
        pageTitle: 'Playlist App',
        playlists: playlists,
        songs: songs
    }); 
}

exports.postPlaylist = (req, res, next) => {
    let playlistName = req.body.playlistName;
    let newPlaylist = new Playlist({
        name: playlistName,
        songs: []
    });
    newPlaylist
        .save()
        .then(playlistDoc => {
            res.status(200).json({ message: 'response from server' });
        })
        .catch(err => {
            console.log(err);
    })
    
}

exports.putPlaylist = (req, res, next) => {
    let playlistId = req.params.playlistId;
    let songIds = req.body.songIds;
    Playlist
        .findById(playlistId)
        .then(playlistDoc => {
            if (!playlistDoc) {
            // error handling
            }
            let existingSongIds = playlistDoc.songs;
            let songs;
            if (playlistDoc.songs.length > 0) {
                // update the playlist

                // if song already exists in playlist don't add
                let filteredSongIds = songIds.filter(id => {
                    let addSong = true;
                    for (let i = 0; i < existingSongIds.length; i++) {
                        if (id.toString() === existingSongIds[i].toString()) {
                            addSong = false;
                        }
                    }
                    if (addSong) {
                        return id;
                    }
                })
                songs = [...existingSongIds, ...filteredSongIds];
            } else {
                // playlist doesn't have any song
                songs = songIds.map(id => {
                    return { "_id": id };
                });
            }
            playlistDoc.songs = songs;
            return playlistDoc.save();
        })
        .then(result => {
            res.status(200).json({ message: 'your request has been processed' });
        })
        .catch(err => {
            console.log(err);
    })
}

exports.deletePlaylist = (req, res, next) => {
    let playlistId = req.params.playlistId;
    Playlist
        .findByIdAndDelete(playlistId)
        .then(deletedDoc => {
            res.status(200).json({ message: 'Playlist deleted' });
        })
        .catch(err => {
            console.log(err);
        })
}

exports.deleteSong = (req, res, next) => {
    let songId = req.body.songId;
    let playlistId = req.params.playlistId;
    Playlist
        .findById(playlistId)
        .then(playlistDoc => {
            if (!playlistDoc) {
                // error handling
            }
            let existingSongIds = playlistDoc.songs;
            let updatedSongIds = existingSongIds.filter(id => {
                if (id.toString() !== songId.toString()) return id;
            })
            // console.log(updatedSongIds);
            playlistDoc.songs = [...updatedSongIds];
            return playlistDoc.save();
        })
        .then(result => {
            res.status(200).json({ message: 'playlist updated' });
        })
        .catch(err => { console.log(err) });
}
