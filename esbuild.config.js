// esbuild.config.js
import esbuild from 'esbuild';
import glob from 'fast-glob';

const isWatch = process.argv.includes('--watch');
const isMinify = process.argv.includes('--minify') || (!isWatch && !process.argv.includes('--dev'));
const enableSourcemap = isWatch || process.argv.includes('--sourcemap');

const entryPoints = await glob('src/static/js/**/*.js');

const config = {
  entryPoints,
  bundle: true,
  outdir: 'src/dist/js',
  format: 'esm',
  splitting: true,
  publicPath: '/static/js/',
  minify: isMinify,
  sourcemap: enableSourcemap,
  entryNames: '[dir]/[name]',
  loader: {
    '.png': 'file',
    '.jpg': 'file',
    '.svg': 'file',
  },
};

async function run() {
  if (isWatch) {
    const ctx = await esbuild.context(config);
    await ctx.watch();
    console.log('⚡ [esbuild] Assistindo alterações nos arquivos JS...');

    const cleanup = async () => {
      await ctx.dispose();
      process.exit(0);
    };
    process.on('SIGINT', cleanup);
    process.on('SIGTERM', cleanup);
  } else {
    await esbuild.build(config);
    console.log(
      `✨ [esbuild] Build JavaScript concluído com sucesso! (${isMinify ? 'produção/minificado' : 'desenvolvimento'})`
    );
  }
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});