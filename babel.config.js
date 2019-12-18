module.exports = {
  env: {
    test: {
      plugins: [
        'transform-es2015-modules-commonjs',
        '@babel/plugin-proposal-object-rest-spread'
      ]
    }
  },
  presets: [
    [
      '@babel/preset-env', 
      {targets: {node: 'current'}}
    ]
  ],
}
