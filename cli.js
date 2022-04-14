#!/usr/bin/env node

const chalk = require('chalk');
const pegaArquivo = require('./index');
const validaURLs = require('./http-validacao');

const caminho = process.argv;

async function processaTexto(caminhoDeArquivo){
    const resultado = await pegaArquivo(caminhoDeArquivo[2]);
    //Verificamos agora se existe o parametro validar para chamarmos a função de validação dos links
    if(caminho[3] === 'validar'){
        console.log(chalk.yellow('links validados'), await validaURLs(resultado));
    }else{
        console.log(chalk.yellow('Lista de Links'), resultado);
    }
    
}

processaTexto(caminho);