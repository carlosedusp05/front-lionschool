'use-strict'

async function pegarCursos() {
    const url = `https://lion-school-phbo.onrender.com/cursos`
    const response = await fetch(url)
    const cursos = await response.json()

    return cursos
}

const btnDS = document.getElementById('btnDS')
const btnREDES = document.getElementById('btnREDES')


const carregarCursos = async () => {
    const listaCursos = await pegarCursos()

    const h1DS = document.createElement('h1')
    h1DS.textContent = listaCursos[0].sigla

    btnDS.appendChild(h1DS)

    const h1REDES = document.createElement('h1')
    h1REDES.textContent = listaCursos[1].sigla

    btnREDES.appendChild(h1REDES)

}

async function alunos(id) {
    const url = `https://lion-school-phbo.onrender.com/alunos?curso_id=${id}`
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

    card.addEventListener('click', () => {
        perfilAluno(aluno.id)
    })

    return card
}


const tela1 = document.getElementById('tela1')
const tela2 = document.getElementById('tela2')
const tela3 = document.getElementById('tela3')
const container = document.getElementById('alunos')


btnDS.addEventListener('click', async () => {
    tela1.style.display = 'none'
    tela2.style.display = 'flex'

     container.replaceChildren()

     const listaCursos = await pegarCursos()

    const dados = await alunos(listaCursos[0].id)

    dados.forEach(aluno => {
       const card = criarCard(aluno)
       container.appendChild(card)
    });
})

btnREDES.addEventListener('click', async () => {
    tela1.style.display = 'none'
    tela2.style.display = 'flex'

    container.replaceChildren()

    const listaCursos = await pegarCursos()

    const dados = await alunos(listaCursos[1].id)

    dados.forEach(aluno => {
       const card = criarCard(aluno)
       container.appendChild(card)
    });
})

async function aluno(id) {
    const url = `https://lion-school-phbo.onrender.com/alunos/${id}`
    const response = await fetch(url)
    const aluno = await response.json()

    return aluno
}

const containerPerfil = document.getElementById('containerPerfil')
const containerEstatisticas = document.getElementById('containerEstatisticas')

const perfilAluno = async (id) =>{
    const dadosAlunos = await aluno(id)

    containerEstatisticas.replaceChildren()
    containerPerfil.replaceChildren()

    const imgPerfil = document.createElement('img')
    imgPerfil.src = dadosAlunos.foto

    const h1Perfil = document.createElement('h1')
    h1Perfil.textContent = dadosAlunos.nome

    containerPerfil.appendChild(imgPerfil)
    containerPerfil.appendChild(h1Perfil)

    dadosAlunos.desempenho.forEach((informacoes, indice) => {
        
        const barra = document.createElement('div')
        barra.classList.add(`barra${indice + 1}`)

        const spanPorcentagem = document.createElement('span')
        spanPorcentagem.classList.add('valor')
        spanPorcentagem.textContent = informacoes.valor

        const coluna = document.createElement('div')
        coluna.classList.add(`coluna`)

        const preenchimento = document.createElement('div')
        preenchimento.classList.add(`preenchimento`)

        preenchimento.style.height = `${informacoes.valor}%`

        coluna.appendChild(preenchimento)

        const spanLegenda = document.createElement('span')
        spanLegenda.classList.add('legenda')
        spanLegenda.textContent = informacoes.categoria

        barra.appendChild(spanPorcentagem)
        barra.appendChild(coluna)
        barra.appendChild(spanLegenda)

        containerEstatisticas.appendChild(barra)

    })

    tela2.style.display = 'none'
    tela3.style.display = 'flex'

}

const btnSair = document.getElementById('btnSair')

btnSair.addEventListener('click', () => {
    const displayTela1 = getComputedStyle(tela1).display
    const displayTela2 = getComputedStyle(tela2).display
    const displayTela3 = getComputedStyle(tela3).display

    if(displayTela1 === 'flex'){

        return

    } else if(displayTela2 === 'flex'){

        tela1.style.display = 'flex'
        tela2.style.display = 'none'
        tela3.style.display = 'none'

    } else if(displayTela3 === 'flex'){

        tela1.style.display = 'none'
        tela2.style.display = 'flex'
        tela3.style.display = 'none'
    }
})


window.addEventListener('DOMContentLoaded', carregarCursos)