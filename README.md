# gulp_newsWorkflow
________
## reprise projet
## fusion s10; add autoprefixer; todo path + multiRender
## todo premailer on FR:root; BS multirender show br s9
## généraliser les divers destinations, rajouter BS sur css et html
### attention à la queu d'exec
## résolution de gulp > relative source paths to relative destination paths
@see [ici](https://laracasts.com/discuss/channels/general-discussion/gulp-source-and-destination-directories)
#### dernière branch
 **>branch simpl7**
### install step by step
#### domoti workflow > news loco + cat

-  voir les [infos](#infos)

## TODO
- revoir gulpfil.js > browser-sync à utiliser avec partialité mais rajouter **le scss dans la boucle au moins pour master...**.
- voir npm markdown to html file dans chaques dossiers domoti
## init

1. init node package modul in your pwd
  - **npm init** > to creat package.json file
2. **create** your own **directory** :
  - mkdir src/ render/
    + cd src > mkdir partial/ scss/ var/
      * cd scss/ && touch styles.scss
3. install Gulp in pwd
  - npm install gulp --save-dev (voir si plus rapide de cloner time = 1min)
  - create **gulpfile.js** file for your first tasck
    + touch gulpfile.js
  - contenu gulpfile :
    + // première étape consiste à le requérir (require)
    + var gulp = require('gulp');
4. install Sass
  - npm install gulp-sass --save-dev (time : 3min see clone cp -ri in cli)
  - add dependance to gulpfile
    + // Requires the gulp-sass plugin
    + var sass = require('gulp-sass');
5. install BrowserSync ****!!!attention!!!**** en ****admin****
 - **npm install browser-sync --msvs_version=2013**
 - déclarer BS
   + <pre><code>var browserSync = require('browser-sync');</code></pre>
 - lancer la tache BS dans gulpfile.js
 - <pre><code>gulp.task('browserSync',function () {
      browserSync({
        server: {
        baseDir: 'src'
        }
      })
    })</code></pre>
6. install slim
 - déclarer slim
 - **npm install gulp-slim --save-dev**
   + <pre><code>var slim = require('gulp-slim');</code></pre>
  - npm install gulp-slim --save-dev
  - time:-1min
  - 
____
## création de la liste de taches

1. //JS
  
 - <pre><code>gulp.task('sass', function(){  
      return gulp.src('src/scss/styles.scss')  
      .pipe(sass())  // ici on utilise gulp-sass  
      .pipe(gulp.dest('render/css'))
    });  
  </code></pre>
  - test : gulp sass
    + si aucune règle dans **.scss** = render/styles.scss
    + si règle dans .scss (ex:.test{va:t}) = render/styles.scss
    + dans tous les cas création du dossier css/
  - remplacer src/scss/styles.scss par un pattern src/scss/**/*.scss qui matchera tous les fichiers ayant une extension .scss dans src/scss ou dans un dossier enfant.
    + <pre><code>//JS
      gulp.task('sass', function() {
        return gulp.src('src/scss/**/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('render/css'))
    })</code></pre> 
  - Tout autre fichier Sass trouvé dans src/scss sera automatiquement inclus dans la tâche (ex: src/scss/outlook.scss > render/css/outlook.css)
_______
## Watch
##### Gulp lance les tâches automatiquement à chaque fois qu’un fichier est sauvegardé.

Gulp propose une méthode watch qui suit les modifications de fichiers. La syntaxe de la méthode watch est la suivante :
<pre><code>//JS
  gulp.watch('fichiers-a-suivre', ['tache1', 'tache2', 'tache3']);</code></pre>
- sur notre workflow
- <pre><code>// surveille tous les .scss et ses sfold/enfants
gulp.task('watch', function(){
  gulp.watch('src/scss/**/*.scss', ['sass']); 
  // autres observations
})</code></pre>

______
##  voir en live avec BrowserSync
- intsall :
  + ~~~~<pre><code>npm install browser-sync --save-dev</code></pre>~~~~
  + <pre><code>npm install browser-sync --save-dev</code></pre>
  + (time 2min show cp -ri) attention à windows install VS

#infos

- --save-dev ajouter le plugin aux dépendances de développement dans package.json.  
- ### Globbing avec Node
- Les globs sont des patterns de correspondance qui fonctionnent un peu comme les regex mais spécifiquement pour les chemins d’accès.
  + les Globs regex pour les paths (4 sont necessaires)
    + 1- \*.scss : pattern * joker tous les .scss dans le dossier courant
    + 2- \**/*.scss tous les .scss dans le dossier racine + enfants
    + 3- !not-me.scss pattern ! pour les fichiers à exclures ici not-me.css
    + 4- \*.+(scss|sass) .scss + .sass
