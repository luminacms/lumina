module.exports = ({ file }) => {
  let isVant = file && file.dirname && file.dirname.indexOf("vant") > -1;
  let rootValue = isVant ? 37.5 : 75; // 判断条件 请自行调整
 return {
  "plugins": [
    require('postcss-import')(),
    require('tailwindcss'),
    require('postcss-url')(),
    require('autoprefixer')(),
    require('postcss-px2rem')({
      'remUnit':rootValue
     })
  ]
 }
}

