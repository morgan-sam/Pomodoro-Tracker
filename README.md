<h2>Pomodoro Tracker App</h2>

<p>Minimalistic app for keeping track of pomodoros.</p>
<p>Open with a keystroke. Focus on your work.</p>

<a href='https://pomodorotracker.app'>https://pomodorotracker.app</a>

![splash](/src/img/splash.jpeg?raw=true)

<h3>About</h3>

<p>The pomodoro technique is great way to maintain productivity.</p>
<p>However most pomodoro apps are only good while the timer is on.</p>
<p>As soon as the timer goes off? Unnecessarily loud distracting sounds, overlays that fill the screen blocking your work, unchangeable timer/break periods, losing the window to reset the timer, losing track of the total pomodoro count, pomodoro count not syncing across workstations... the list goes on.</p>
<p>This pomodoro tracker makes a few slight changes for a massive improvement in productivity:</p>
<ul>
  <li>No loud noises. Small, silent notification at the top of the screen.</li>
  <li>Script that maps to a keyboard shortcut. Reset timer with a keystroke.</li>
  <li>Portable. Download the script in a second and be up and running.</li>
  <li>Pomodoro count stored in a centralised database. Always in sync.</li>
  <li>View pomodoro timeline/graph/stats online. Easily visualise your productivity level.</li>
</ul>
<p>The result? The time between you finishing a pomodoro and going onto the next one is reduced to negligible.</p>
<p>A notification pops up at the top the screen.</p>
<p>You hit the keyboard shortcut.</p>
<p>You're back in the zone.</p>
<p>The focus on your work is unbroken.</p>

<h3>Getting Started</h3>
<ol>
  <li>Create an account at our signup page <a href='https://pomodorotracker.app/signup'>here</a> (you will be logged in automatically)</li>
  <li>Click the <code>Get Script</code> button at the top right of the main screen</li>
  <li>Choose either a bash or python script (bash is recommended)</li>
  <li>Enter your account password to download the script <b>[Note: encryption is not yet implemented so your password will be stored in the script as plaintext. Please do not use a password that you use for any other account]</b></li>
  <li>Got to your download folder and run <code>chmod +x ./pomodoro.sh</code> in the terminal (<code>pomodoro.py</code> if using the python script)</li>
  <li>Assign the script to a keyboard shortcut</li>
  <li>Ensure <a href='http://vaskovsky.net/notify-send/linux.html'>notify-send</a> is installed</li>
  <li>Run the script and get to work!</p>
</ol>

<h3>Python Packages</h3>
<p>Running the python version of the script will require some extra packages to be installed.</p>
<p>First ensure pip3 is installed:</p>
<p><code>sudo apt-get install pip3</code></p>
<p>Next install the required pip3 packages:</p>
<p><code>sudo pip3 install pyrebase psutil</code></p>
