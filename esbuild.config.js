// esbuild.config.js
const esbuild = require('esbuild');

// Captura se você está rodando em modo watch ou apenas build único
const isWatch = process.argv.includes('--watch');

const config = {
  // Passamos os dois pontos de entrada para o esbuild gerar arquivos separados
  /* entryPoints: [
    'src/static/js/main.js',
    //'src/static/js/components/terreno/mapComponent.js' // <--- O caminho do seu componente de mapa
  ], */
  entryPoints: ['src/static/js/main.js'],
  bundle: true,
  outdir: 'src/static/dist/js',
  format: 'esm',
  splitting: true,
  publicPath: '/static/js/',
  minify: !isWatch, // Opcional: minifica apenas em produção (quando não for watch)
  sourcemap: isWatch, // Opcional: gera sourcemaps em desenvolvimento para ajudar no debug
  entryNames: '[name]',
};

async function run() {
  if (isWatch) {
    // Se o argumento --watch foi passado, cria um contexto e ativa o monitoramento nativo
    let ctx = await esbuild.context(config);
    await ctx.watch();
    console.log('⚡ [esbuild] Assistindo alterações nos arquivos JS...');
  } else {
    // Se não, faz apenas o build único de produção
    await esbuild.build(config);
    console.log('✨ [esbuild] Build JavaScript concluído com sucesso!');
  }
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});