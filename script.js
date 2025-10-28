document.addEventListener("DOMContentLoaded", function() {

    document.querySelectorAll('.menu a').forEach(function(link) {
        link.onclick = function(evento) {
            evento.preventDefault();

            let destinoID;
            const textoLink = link.textContent.trim();

            switch (textoLink) {
                case 'Início':
                    destinoID = '#principal';
                    break;
                case 'Serviços':
                    destinoID = '#servicos';
                    break;
                case 'Sobre nós':
                    destinoID = '#quemsomos';
                    break;
                case 'Contato':
                    destinoID = '#contato';
                    break;
                default:
                    return;
            }

            const targetElement = document.querySelector(destinoID);

            if (targetElement) {
                targetElement.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        };
    });

    const botaoPrincipal = document.querySelector('.botao-principal');
    if (botaoPrincipal) {
        botaoPrincipal.onclick = function(evento) {
            evento.preventDefault(); 
            const targetElement = document.querySelector('#contato');
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
        };
    }

    const botaoCampanha = document.querySelector('.botao-campanha');
    if (botaoCampanha) {
        botaoCampanha.onclick = function(evento) {
            evento.preventDefault(); 
        };
    }

    const slides = document.querySelectorAll('.campanha .slide-item');
    const setaEsquerda = document.querySelector('.campanha-wrapper .seta.esquerda');
    const setaDireita = document.querySelector('.campanha-wrapper .seta.direita');
    const indicadores = document.querySelectorAll('.scroll-img');
    let indiceAtual = 0;

    if (slides.length > 0 && indicadores.length > 0) {
        function mostrarSlide() {
            slides.forEach((slide, index) => {
                slide.style.display = (index === indiceAtual) ? 'flex' : 'none';
            });

            indicadores.forEach((indicador, index) => {
                indicador.classList.toggle('ativo', index === indiceAtual);
            });

            setaEsquerda.classList.toggle('desativada', indiceAtual === 0);
            setaDireita.classList.toggle('desativada', indiceAtual === slides.length - 1);
        }

        setaDireita.addEventListener('click', function(e) {
            e.preventDefault();
            if (indiceAtual < slides.length - 1) {
                indiceAtual++;
                mostrarSlide();
            }
        });

        setaEsquerda.addEventListener('click', function(e) {
            e.preventDefault();
            if (indiceAtual > 0) {
                indiceAtual--;
                mostrarSlide();
            }
        });
        
        indicadores.forEach(indicador => {
            indicador.addEventListener('click', function() {
                const novoIndice = parseInt(this.getAttribute('data-slide'));
                if (novoIndice !== indiceAtual) {
                    indiceAtual = novoIndice;
                    mostrarSlide();
                }
            });
        });

        mostrarSlide();
    }

    const formulario = document.querySelector('.formulario');
    if (formulario) {
        formulario.onsubmit = function(evento) {
            evento.preventDefault(); 
            alert('Mensagem enviada com sucesso!');
            this.reset();
        };
    }
    
    const avaliacoes = document.querySelectorAll('.avaliacao-item');
    const setaProxima = document.querySelector('.seta-proximo'); 
    const setaAnterior = document.querySelector('.seta-anterior');
    const spanPaginaAtual = document.querySelector('.paginacao span');

    const avaliacoesPorPagina = 3; 
    let paginaAtual = 0;

    const totalPaginas = Math.ceil(avaliacoes.length / avaliacoesPorPagina);

    function mostrarAvaliacoes() {
        avaliacoes.forEach(item => {
            item.style.display = 'none';
        });

        const indiceInicio = paginaAtual * avaliacoesPorPagina;
        const indiceFim = indiceInicio + avaliacoesPorPagina;

        for (let i = indiceInicio; i < indiceFim; i++) {
            if (avaliacoes[i]) {
                avaliacoes[i].style.display = 'flex'; 
            }
        }
        
        if (setaAnterior) {
            if (paginaAtual === 0) {
                setaAnterior.classList.add('desativada'); 
            } else {
                setaAnterior.classList.remove('desativada');
            }
        }

        if (setaProxima) {
            if (paginaAtual === totalPaginas - 1) {
                setaProxima.classList.add('desativada'); 
            } else {
                setaProxima.classList.remove('desativada');
            }
        }
        
        if (spanPaginaAtual) {
            spanPaginaAtual.textContent = paginaAtual + 1;
        }
    }

    if (setaProxima) {
        setaProxima.onclick = function(evento) {
            evento.preventDefault();
            if (paginaAtual < totalPaginas - 1) {
                paginaAtual++; 
                mostrarAvaliacoes();
            }
        };
    }

    if (setaAnterior) {
        setaAnterior.onclick = function(evento) {
            evento.preventDefault();
            if (paginaAtual > 0) {
                paginaAtual--; 
                mostrarAvaliacoes();
            }
        };
    }

    mostrarAvaliacoes();

});