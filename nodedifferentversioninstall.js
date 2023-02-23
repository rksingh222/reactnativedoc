https://github.com/facebook/watchman/issues/751. // i moved my application to Users/rahulkumarsingh/my-app
https://apple.stackexchange.com/questions/171530/how-do-i-downgrade-node-or-install-a-specific-previous-version-using-homebrew
https://stackoverflow.com/questions/5056115/how-to-install-latest-version-of-node-using-brew
https://apple.stackexchange.com/questions/171530/how-do-i-downgrade-node-or-install-a-specific-previous-version-using-homebrew


nano ~/.zshrc
brew info node - to check which version of brew is installed in your system
brew switch node 5.7.0 - first see the version and copy this to switch between specific version
brew search node - to search for the version available
brew install node@16

I moved my application to Users/rahulkumarsingh
for running expo react native app

npx create-expo-app my-app
cd my-app
npx expo start
  
