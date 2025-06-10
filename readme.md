# 🌌 Solar System 3D Visualization

Explore the wonders of our Solar System in an immersive 3D experience! Witness the rotation of planets around the Sun and their self-rotation in this interactive web-based application developed using **Three.js**.

---

## 📚 Table of Contents

1. [Introduction](#1-introduction)  
2. [Project Overview](#2-project-overview)  
3. [Features](#3-features)  
4. [Demo Video](#4-demo-video)  
5. [How to Run](#5-how-to-run)  

---

## 1. 📖 Introduction

The **Solar System 3D Visualization** project is an interactive web application that allows users to explore the Solar System in a three-dimensional environment. Developed using the powerful [Three.js](https://threejs.org/) library, this project offers a realistic and immersive experience where users can:

- Observe planets rotating around the Sun
- Watch self-rotation of each planet
- Interact with the simulation in real-time
- Pause and resume animations with a single click

Dive into the beauty of space with smooth animations and intuitive controls!

---

## 2. 🚀 Project Overview

This project primarily consists of:

- An HTML file that sets up the web page and structure  
- A JavaScript file (`solarSystem.js`) that creates the 3D scene, loads textures for planets and space, manages animations, and handles interactivity  
- Real-time controls powered by [dat.GUI](https://github.com/dataarts/dat.gui)

Using Three.js’s rendering capabilities, the project simulates the orbits and rotations of planets with realistic lighting effects and smooth transitions.

---

## 3. ✨ Features

### 🌐 Realistic 3D Visualization
Experience the Solar System with textured planets, accurate orbits, and fluid movement.

### 🧭 Interactive Controls
- Orbit the camera using mouse drag
- Zoom in/out to inspect planets
- Real-time settings via GUI panel

### ⏩ Speed Control
- Adjust animation speed with the `speed` slider  
- Speed up or slow down planetary motion to match your curiosity

### 🛣️ Show/Hide Planet Paths
- Toggle orbital paths of planets  
- Visualize movement or enjoy a clean, minimal look

### 💡 Realistic Lighting (Real View Mode)
- Enable "Real view" to simulate space lighting  
- Only the sun-facing side of planets is illuminated

### ⏸️ Pause/Resume Animation
- **New Feature!** Click the **Pause/Resume** button to stop or restart the simulation  
- Great for taking screenshots or observing planetary positions

---

## 4. 🎥 Demo Video

You can view the demo video locally:

👉 [Click here to watch the demo video](video/display.mp4)

> ⚠️ GitHub doesn’t support embedded video playback in READMEs. Please download or play the video locally after cloning the project.

---

## 5. 🛠️ How to Run

Follow these steps to run the project locally on your system:

1. **Clone the repository**
   ```bash
   git clone https://github.com/nimmi0428/solar-system.git
   cd solar-system
   npm install
   npm start

