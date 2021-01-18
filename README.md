# Player class

Player class has implemented methods for creating the player, updating player position, destroying the player, and winning

```
create($container, imgSrc)
```

Create a new player (Dom element)

```
update(dt, $container)
```
Update the position of the player on the screen. It calculates the distance based on the physics law: distance=time*speed.

```
destroy(container, player)
```
Removes the player, the DOM element, from the screen after getting hit by the enemy weapon (eggs).

```
won()
```
Returns true if all enemies are destroyed and no presents on the screen.