const chalk = require('chalk');
// Lib File System para ler arquivos
const fs = require('fs');

function extraiLinks(texto){
    const regex = /\[([^\]]*)\]\((https?:\/\/[^$#\s]*.[^\s]*)\)/gm;
    const arrayResultados = []
    let temp

    while((temp = regex.exec(texto)) !== null){
        arrayResultados.push({ [temp[1]] : temp[2] })
    }
    return arrayResultados.length === 0 ? 'não há links' : arrayResultados;
}

//Tratamento do Erro
function trataErro(erro){
    //Error é um objeto do node
    throw new Error(chalk.red(erro.code, 'Falha ao ler o arquivo'))
}

//Função Assincrona usando async e await
async function pegaArquivo(caminhoDoArquivo){    
    const encoding = 'utf-8'
    try{
        const texto = await fs.promises.readFile(caminhoDoArquivo, encoding)
        return extraiLinks(texto)
    } catch(erro){
        trataErro(erro)
    }finally{ // O Finally é opcional e ele não tem parametros, ele executa uma ação após nossa função try ou catch ser executada.
        console.log(chalk.yellow('Operação Concluida'))
    }
    
}

module.exports = pegaArquivo;


//Função Assincrona com uso do then catch
// function pegaArquivo(caminhoDoArquivo){
//     const encoding = 'utf-8'
//     fs.promises
//     .readFile(caminhoDoArquivo, encoding)
//     .then((texto) => console.log(chalk.green(texto)))
//     .catch((erro) => trataErro(erro))
// }

// Função Sincrôna
// function pegaArquivo(caminhoDoArquivo){
//     const encoding = 'utf-8'
//     // readFile(caminhoArquivo, codificacao, funcao de callnack)
//     fs.readFile(caminhoDoArquivo, encoding, (erro , texto)=>{
//         //Tratando o Erro
//         if(erro){
//             trataErro(erro)
//         }
//         console.log(chalk.green(texto))
//     })
// }




