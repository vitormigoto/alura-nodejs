// importando o Node fetch
const fetch = require('node-fetch');


//Validando se houver erros nas validações
function manejaErros(erro){
    throw new Error(erro.message)
}

async function checaStatus(arrayURLs){
    try{
        //Passamos através da Array verificando o link e retornando o status na ArrayStatus
        const arrayStatus = await Promise
            .all(arrayURLs
                .map(async url => {
                    const res = await fetch(url)
                    return res.status;
        }))
        return arrayStatus;
    }catch(erro){
        manejaErros(erro);
    }
}

function geraArrayDeURLs(arrayLinks){
    // Object.values() -> Pega um objeto e retorna o valor em array (objeto -> [valor])
    // join() vai extrair da array e nos retornar uma string    
    return arrayLinks
        .map(objetoLink => Object
            .values(objetoLink)
                .join());
}

async function validaURLs(arrayLinks){
    //Pegamos as URLS como uma string
    const links = geraArrayDeURLs(arrayLinks);
    //Executamos a verificacao dos links
    const statusLinks = await checaStatus(links);
    // Montando o objeto de saida com o //spread operator
    const resultados = arrayLinks.map( (objeto, indice) => ({
        ...objeto,
        status: statusLinks[indice]
    }))
    return resultados;
}

module.exports = validaURLs;