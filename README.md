

## Note
  
### Polling music queue from the server
- Since song duration is approx 2 min
- we can polling the playlist after every 2 min to get the updated playlist.


### How to transition a into a new song.
- __For now__: we're just going to play a new song  after the current one finishes
- __Future_: we might want to smoothly change before the song finishes


### Prioritizing requests
- add a priority attr to the song request object


### Page and API route protection



### Skip song
- we probably going to need a state machine to  keep track of different states of a song,
- e.g: `PENGING`, `SKIPPED` `PLAYED` 


## Keep track and switch between Clubs (Dj)
- have a dropdown to switch



## Prevent users from queuing the same song multiple time in a row (debouncing)
- protect the api endpoint
- give user a friendly message in the ui


