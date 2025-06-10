# 🌌 Solar System 3D Visualization

Explore the wonders of our Solar System in an immersive 3D experience! Witness the rotation of planets around the Sun and their self-rotation in this interactive web-based application developed using Three.js.

---

## Table of Contents

1. [Introduction](#1-introduction)  
2. [Project Overview](#2-project-overview)  
3. [Features](#3-features)  
4. [Demo Video](#4-demo-video)  
5. [How to Run](#5-how-to-run)  

---

## 1. Introduction

The **Solar System 3D Visualization** project is an interactive web application that allows users to explore the Solar System in a three-dimensional environment. Developed using the powerful [Three.js](https://threejs.org/) library, this project offers a realistic and immersive experience where users can observe planets rotating around the Sun as well as their own self-rotation. Dive into the beauty of space with smooth animations and interactive controls.

---

## 2. Project Overview

This project primarily consists of:

- An HTML file that sets up the web page, loads the necessary libraries, and defines the basic structure.  
- A JavaScript file (`solarSystem.js`) that creates the 3D scene, loads textures for planets and space, manages animations, and handles user interactivity.

Using Three.js’s rendering capabilities, the project simulates the orbits and rotations of planets with realistic lighting effects.

---

## 3. Features

- **Realistic 3D Visualization**: Experience the Solar System with detailed planets, accurate orbits, and smooth animations.  
- **Interactive Controls**: Use mouse and GUI controls to navigate, zoom, and explore different parts of the Solar System.  

### Speed Control

Adjust the animation speed using the `speed` slider in the GUI. Move the slider right to speed up the rotations and orbits of the planets, or left to slow them down according to your preference.

### Show/Hide Planet Paths

Toggle the visibility of the planets’ orbital paths with the "Show path" option in the GUI. Enabling this helps visualize each planet's trajectory around the Sun, while disabling it gives a cleaner view.

### Realistic Lighting

Enable the "Real view" mode to simulate space lighting conditions. In this mode, only the sides of the planets facing the Sun are illuminated, while the far sides appear darker, enhancing realism.

---

## 4. Demo Video

You can view the demo video locally:

👉 [Click here to watch the demo video](video/display.mp4)

> Note: GitHub doesn't support video playback directly in the README, so please download or play it locally after cloning the project.

---

## 5. How to Run

Follow these simple steps to run the project locally on your machine:

1. **Clone the repository:**

   ```bash
   git clone https://github.com/nimmi0428/solar-system.git
   cd solarSystem
   npm start
