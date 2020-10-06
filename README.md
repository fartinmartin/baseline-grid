# baseline-grid

A tool for print designers to build perfect baseline grids and horizontal guides.

---

*Psst!* All this tool really does is [check](https://github.com/fartinmartin/baseline-grid/blob/a295d586693d5b98e36f3257f53411427da0b262/src/composables/useToolbar.ts#L77) that: 

- your leading is a factor of your margin safe area 
- your horizontal rows are a multiple of your leading
- your gutter is a multiple of your leading

It also offers solutions that are closest to your original values.

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
