const pegaArquivo = require('../index');

//Criando uma array de exemplo de como queremos o retorno do nosso resultado
const arrayResult = [
  {
    FileList: 'https://developer.mozilla.org/pt-BR/docs/Web/API/FileList'
  }
]


//Cria uma sequencia de testes referente ao pegaArquivo
describe('pegaArquivo::', () => {
  it('deve ser uma função', () => {
    expect(typeof pegaArquivo).toBe('function');
  })
  it('deve retornar array com resultados', async () => {
    const resultado = await pegaArquivo('./test/arquivos/texto1.md')
    expect(resultado).toEqual(arrayResult)
  })
  it('deve retornar mensagem "não há links"', async () => {
    const resultado = await pegaArquivo('./test/arquivos/texto1_semlinks.md')
    expect(resultado).toBe("não há links")
  })
  it('deve lançar um erro na falta de arquivo', async () => {
    await expect(pegaArquivo('./test/arquivos/')).rejects.toThrow(/Falha ao ler o arquivo/)
  })
  it('deve resolver a função com sucesso', async () => {
    await expect(pegaArquivo('./test/arquivos/texto1.md')).resolves.toEqual(arrayResult)
  })
})

