var gulp = require('gulp'),
    browserSync = require('browser-sync'),
    sass = require('gulp-sass'),
	autoprefixer = require('gulp-autoprefixer');

gulp.task('reload', function() {
    browserSync.reload();
});

gulp.task('sass', function() {
    return gulp.src('./scss/*.scss')
        .pipe(sass().on('error', sass.logError))
		.pipe(autoprefixer({
			browsers: ['last 3 versions']
		 }))
        .pipe(gulp.dest('./'))
        .pipe(browserSync.stream());
})

gulp.task('serve', gulp.series('sass', () => {
    browserSync({
        server: './'
    })
    
    gulp.watch('./*.html').on('change', browserSync.reload);
    //gulp.watch('./*.html', gulp.series('reload'));
    gulp.watch('./scss/**/*.scss', gulp.series('sass')).on('change', browserSync.reload);
}));

gulp.task('default', gulp.series('serve'));