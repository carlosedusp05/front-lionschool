'use-strict'

async function alunosDS() {
    const url = `https://lion-school-phbo.onrender.com/alunos?curso_id=1`
    const response = await fetch(url)
    const alunos = await response.json()

    return alunos
}

const criarCard = (aluno) => {
    const card = document.createElement('div')
    card.classList.add('card')

    const cardImg = document.createElement('img')
    cardImg.src = aluno.foto 
    
    const cardNome = document.createElement('h2')
    cardNome.textContent = aluno.nome

    card.appendChild(cardImg)
    card.appendChild(cardNome)

    return card
}

const btnDS = document.getElementById('btnDS')
const tela1 = document.getElementById('tela1')
const tela2 = document.getElementById('tela2')
const container = document.getElementById('alunos')


btnDS.addEventListener('click', async () => {
    tela1.style.display = 'none'
    tela2.style.display = 'flex'

    const dados = await alunosDS()
    console.log(dados)
    dados.forEach(aluno => {
       const card = criarCard(aluno)
       container.appendChild(card)
    });
})
   
console.log(container)
