# memory-game
A simple card matching game. Play it at https://ibtehajdoesdevelopment.on.drv.tw/webdev/games/memory_game/.

The game can also be enjoyed on most phones (tested on Firefox and Chrome).

This game was a part of the tutorial course given by Ania Kubow on the Free Code Camp YouTube channel.

Known Issues:

1. The game can be cheated by opening up the inspect bar and looking at the html code. I realized this after I was done writing the code, and I tried going for memory optimization by not maintaining a list (or array) of objects containing the images, and hence ended up saving the data on the HTML tags, which not only turned out to be tedious, but also defeated the purpose of the game.
