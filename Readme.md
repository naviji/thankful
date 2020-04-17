# How to install
1. git clone ```https://github.com/naviji/Thankful.git```
2. cd Thankful
3. yarn install
4. expo start --android

# Things to do:
- [ ] Support import from other journal apps
- [ ] Writing prompts as default text input value
- [ ] Add a tomorrow card with a motivational quote
- [ ] Feature - attach images
- [ ] Feature - google sync
- [ ] Feature - Lockable (PIN or Biometric)
- [ ] Feature - Export journal entries
- [ ] Feature - Add calendar
- [ ] Feature - Entry deletion
- [ ] Feature - Persistance using SQLite database
- [ ] Enhancement - Dark mode
- [ ] Enhancement - Reward system
- [ ] Enhancement - Style cards to look pretty!
- [ ] Enhancement - Make app stylish :) 
- [ ] Enhancement - Better typography
- [ ] Enhancement - Icon and splash screen

# How to add a new feature
```
git checkout -b feature-name
```

This will create a branch named 'feature-name' and switch to that branch.

Now make your modifications.

Once finished and tested, commit changes to the upstream branch like this.

```
git push upstream feature-name
```

Once confident to merge into master, do this
```
git checkout master
git merge feature-name
```

Now your feature is available on the master branch. Hurrah!.