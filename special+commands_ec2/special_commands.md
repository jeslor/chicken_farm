#!/bin/bash

echo "Updating system packages ..."
sudo dnf update -y

echo "Installing Docker..."
sudo dnf install -y docker

echo "Adding ec2-user to docker group..."
sudo usermod -aG docker ec2-user

echo "Enabling and starting Docker service..."
sudo systemctl enable docker
sudo systemctl start docker

echo "Verifying Docker installation...."
docker --version || echo "Docker not found in the current session (re-login might be rewuired)."

echo ""
echo "Docker installation completed onAmazon Linuz 2023"
echo "IMPORTANT: Logout and back in (or run 'newgrp docker)"
echo "so that 'ec2-user' can run docker without sudo"
echo ""
echo "After re-login, test with:"
echo After run hello world"

<!-- 1. The "Update & Cleanup" (dnf update)
What it does: Updates every piece of software already on the computer to the latest security version.

Analogy: It's like your iPhone saying "Software Update Available." This ensures you aren't starting with old, buggy code.

2. The "Installation" (dnf install docker)
What it does: Downloads and installs the actual Docker engine.

Analogy: Like downloading an app from the App Store.

3. The "VIP Access" (usermod -aG docker)
What it does: By default, only the "Root" (Super Admin) can run Docker. This command adds your user (ec2-user) to the "Docker Club" so you don't have to type sudo before every single command.

The "Catch": Linux only checks your "Club Membership" when you first log in. That’s why the script tells you to log out and back in—it needs to refresh your permissions.

4. The "Engine Start" (systemctl enable/start)
What it does: start turns Docker on right now. enable makes sure that if your AWS server reboots (e.g., after a power flicker), Docker starts back up automatically.

5. The "Verification" (docker --version)
What it does: Just a health check to make sure the previous steps worked.

Why this is better than doing it manually:
If you did this by hand, you'd have to remember 6–8 long commands. With this script, you just:

Create a file: nano setup.sh

Paste the text.

Run it: bash setup.sh -->
