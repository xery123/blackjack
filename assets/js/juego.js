(()=>{
    'use strict'
    

    let deck = [];
    const tipos = ['C','D','H','S'],
        especiales = ['A','J','Q','K'];

    let puntosJugadores=[];



    //eferencias del html
    const btnPedir = document.querySelector('#btnPedir'),
          btnDetener = document.querySelector('#btnDetener'),
          btnNuevo = document.querySelector('#btnNuevo');

    const puntosHtml = document.querySelectorAll('small');

    const divCartasJugador = document.querySelector('#jugador-cartas'),
          divCartasComputadora = document.querySelector('#computadora-cartas');

     const inicializarJuego=(numJugadores=2)=>{

            deck = crearDeck();
            for (let i = 0;i<numJugadores;i++){
                puntosJugadores.push(0);
            }
    
        }
    //crear deck
    const crearDeck = () => {
        deck=[];
            for(let i =2;i<=10;i++){
                for (let tipo of tipos){
                    deck.push(i+tipo);
                }
            }

            for(let tipo of tipos){
                for(let esp of especiales){
                    deck.push(esp+tipo);
                }
            }
            // console.log(deck);
            return_.shuffle(deck);

    }

    //tomar carta
    const pedirCarta = () => {

        if(deck.length === 0){
            throw 'No hay cartas en el deck';
        }

        return deck.pop(); 
    }


    //pedir Carta
    const valorCarta = (carta) => {
        const valor = carta.substring(0,carta.length-1);

        return(isNaN(valor)) ?
            (valor === 'A') ? 11 :10
            : valor * 1;
        
    }

    const acumularPuntos = (carta, turno) =>{
        puntosJugadores[turno] = puntosJugadores[turno] + valorCarta(carta);
        puntosHtml[turno].innerText=puntosJugadores[turno];
        return puntosJugadores[turno];

    }

    const turnoComputadora = (puntosMinimos) => {
        do{
            const carta = pedirCarta();
        
            acumularPuntos(carta,puntosJugadores.length - 1);
        
            const imgCarta = document.createElement('img');
            imgCarta.src =`assets/cartas/${carta}.png`;
            imgCarta.classList.add('carta');
        
            divCartasComputadora.append(imgCarta);
            
            if (puntosMinimos>21){
                break;
            }


        }
        while( (puntosComputadora< puntosMinimos) && (puntosMinimos<=21));

        setTimeout (()=>{
            if(puntosComputadora === puntosMinimos){
            alert('Nadie gana:(');
        } else if (puntosMinimos>21){
            alert('Computadora gana')
        } else if (puntosComputadora >21){
            alert('Jugador gana'); }
            else {
                alert('Computadora gana'); }
    
        },100);

    }

    //eventos
    btnPedir.addEventListener('click', () => {

        const carta = pedirCarta();
        
        const puntosJugador = acumularPuntos(carta,0) ;
        // puntosJugador = puntosJugador + valorCarta(carta);
        // console.log(puntosJugador);
        // puntosHtml[0].innerText=puntosJugador;

        const imgCarta = document.createElement('img');
        imgCarta.src =`assets/cartas/${carta}.png`;
        imgCarta.classList.add('carta');

        divCartasJugador.append(imgCarta);

        if (puntosJugador>21){
            console.warn('Lo siento mucho,perdiste');
            btnPedir.disabled = true;
            btnDetener.disabled=true;

            turnoComputadora(puntosJugador);
        } else if (puntosJugador === 21){
            btnPedir.disabled=true;
            btnDetener.disabled=true;

            turnoComputadora(puntosJugador);

        }

    });

    btnDetener.addEventListener('click',()=>{
        btnPedir.disabled=true;
        btnDetener.disabled=true;

        turnoComputadora(puntosJugador);
    });

    btnNuevo.addEventListener('click',()=>{
        inicializarJuego();
        console.clear();
        deck=[];
        deck = crearDeck();

        puntosJugador = 0;
        puntosComputadora = 0;

        puntosHtml[0].innerText=0;
        puntosHtml[1].innerText=0;

        divCartasComputadora.innerHTML='';
        divCartasJugador.innerHTML='';

        btnPedir.disabled=false;
        btnDetener.disabled=false;




    });
})();