# Plume Surfing Day

_Brackeys Game Jam 2025.1 Prototype._


# How to Run

Make sure you have [Node.js](https://nodejs.org/) and [Collider.JAM](http://collider.land) installed.

For quick launch in the production mode run the following command in the project root :

```
jam play
```

To run in the debug mode:

```
jam -d
```

To monitor for air raid alerts while debugging:

```
jam -d --war "Kyiv"
```

Where ```-war``` flag MUST be followed by your region name (e.g. "Chernihiv region").

To show an arbitraty message on boot:
```
jam -d --message "Doing Research"
```

To show a message with a timer, run:
```
jam -d --message "Lunch Break" --timer 30
```
With time provided in minutes.

