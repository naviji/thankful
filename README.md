# How to install
1. git clone ```https://github.com/naviji/Thankful.git```
2. cd Thankful
3. yarn install
4. expo start --android

# Things to do:
- [ ] Writing prompts as default text input value
- [ ] Add a today card (What happened today?,  Add a note )
- [ ] Add a tomorrow card with a motivational quote (Future motivational quote?)
- [x] Feature - attach images
- [ ] Feature - google/dropbox sync
- [x] Feature - Lockable (PIN or Biometric*)
- [x] Feature - Add calendar
- [x] Feature - Entry deletion
- [x] Feature - Persistance using SQLite database
- [x] Enhancement - Dark mode
- [ ] Enhancement - Reward system (Not important)
- [x] Enhancement - Style cards to look pretty!
- [x] Enhancement - Make app stylish :) 
- [x] Enhancement - Better typography
- [ ] Enhancement - Icon and splash screen
- [ ] Important - Add some tests

# How to add a new feature
```
git checkout -b feature-name
```

This will create a branch named 'feature-name' and switch to that branch.

Just to make sure type
```
git branch
```
to make sure you are in the feature branch.

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
