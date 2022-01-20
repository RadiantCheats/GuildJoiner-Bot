# GuildJoiner-Bot
A Discord bot used for authenticating and migrating users. 

## Creating the bot account

1. Go to the [discord developer portal](https://discord.com/developers/applications)
2. Login to your discord account
3. Click on `New Application`
4. Enter the name of your bot and press create
5. Click on the `Bot` tab on the left menu bar
6. Click on `Add Bot`
7. Scroll down and enable `PRESENCE INTENT` and `SERVER MEMBERS INTENT`, then press `Save Changes`
8. Press `OAuth2` on the left menu bar
9. Check the `bot` checkbox and press `Copy`
10. You can paste this link in your browser and add this bot to any discord server you want. You can use this link again to add the bot into other servers!

## Setting up the files

1. You should have git pre-installed if you are using mac or linux. If not, download and install git [here](https://git-scm.com/downloads)
2. Go to the github page of this repo and press `⬇Code`, select `HTTPS`, then copy the link
3. Start a terminal
4. Use the `cd` command to navigate to wherever you want the bot files to be placed in
5. Type `git clone [paste in the link here]` (add sudo if you are on linux and it gives you an error)
6. Login to your github account in the terminal
7. Navigate to the folder that contains the bot's code in a file explorer
8. Rename all files ending with `.json.example` to `.json`, removing the `.example`, such as renaming `config.json.example` to `config.json`

## Configuration

### Getting the bot token

1. Click on the `Bot` tab on the left menu bar
2. Click on `Copy` under `TOKEN`. Remember, never give this token to strangers, as they can gain full access to your bot if they gain access to this token!
3. Fill in the token into config.json

   Here is an example:

   ```
   ...
   "TOKEN": "ODE4NDY3Mzc0NzE3OTkzMDAx.YEYfJA.j_vM2raH-LOsGDcZGavrBjqk9hk"
   ...
   ```

### Getting the client ID and secret

1. Click on the `General Information` tab on the left menu bar
2. Copy the `CLIENT ID`
3. Fill in the ID into config.json

   Here is an example:

   ```
   ...
   "ID": "761048219479421520"
   ...
   ```

4. Copy the `CLIENT SECRET`
5. Fill in the secret into config.json

   Here is an example:

   ```
   ...
   "SECRET": "c9sPUBgO1cj4y3v-wK9rNKb5jOVgkiIe"
   ...
   ```

### Setting up ngrok for request handling

1. Go [here](https://ngrok.com/download) to download ngrok
2. Unzip the zip file that you just downloaded
3. Get your authentication token [here](https://dashboard.ngrok.com/get-started/your-authtoken)
4. Run `./ngrok authtoken [TOKEN]` at the location that you unqipped the file to. Replace `[TOKEN]` with your authentication token
5. Run `./ngrok http [PORT]`. Replace `[PORT]` with the port that you want to use (if you don't know which port to use, use 3000)
6. Copy the link that is displaying in the window. It should look something like `http://3af3b4364d80.ngrok.io` (not the https one)
7. Paste it into the config.json, after the `"REDIRECT"` attribute
8. Also enter the port you used after the `"PORT"` attribute

## Hosting the bot

A. Host it locally on your computer (which needs to be on 24/7)
B. Rent a VPS yourself and pay a one-time $20 fee for me to help you set up the bot on it.
C. Pay $10 a month for me to host the bot for you, with setup included.

You will have to do the config steps above yourself anyways, since there is no way for me to access your accounts to do them for you. If you chose step A, or if you have a VPS and would like to do the setup yourself, proceed:

1. Go to the [NodeJs website](https://nodejs.org/en)
2. Download and install NodeJs on your computer/server
3. Start a command prompt/terminal
4. Use the `cd` command to navigate to the folder that cointains the bot's code
5. Type `npm install` in the terminal and then press enter
6. Type `node .` in the terminal to run the bot! Press `ctrl + c` to stop the bot.
