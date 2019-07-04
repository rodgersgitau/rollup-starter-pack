import * as path from 'path';
import autoprefixer from 'autoprefixer'
import babel from 'rollup-plugin-babel';
import postcss from 'rollup-plugin-postcss';
import cleaner from 'rollup-plugin-cleaner';
import { terser } from 'rollup-plugin-terser';
import { uglify } from "rollup-plugin-uglify";
import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';

const srcDir = path.resolve(__dirname, 'src');
const distDir = path.resolve(__dirname, 'dist');
const production = !process.env.ROLLUP_WATCH;

export default [
    {
        input: {
            bundle: path.join(srcDir, 'app.js'),
        },
        output: {
            dir: distDir,
            format: "amd",
            entryFileNames: "[name].min.js",
            chunkFileNames: "[name]-[hash].min.js"
        },
        plugins: [
            cleaner({
                targets: ['./dist/'],
            }),
            postcss({
                extract: true,
                minimize: true,
                plugins: [
                    autoprefixer(),
                ],
            }),
            babel({
                exclude: 'node_modules/**',
            }),
            resolve(),
            commonjs(),
            uglify(),
            production && terser(),
        ]
    }
];