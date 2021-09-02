

    /* Função para ativar determinada função ao dar 'keyUp' na tela 
    event.code vai mostrar a tecla que foi pressionada
    Após isso, ela vai dar play e tocar o som determinado para cada tecla
    com a função playSound()  */

document.body.addEventListener('keyup', (event)=>{
    playSound( event.code.toLowerCase() );
}); 

    /* A função abaixo vai adicionar um evento de click na tag <button> 
    em seguida vai verificar se o input possui informação, caso sim,
    ela vai pegar o (value) do #input e transformar em array com o evento
    .split */

document.querySelector('.composer button').addEventListener('click', () => {
    let song = document.querySelector('#input').value;

    if(song !== null) {
        let songArray = song.split('');  /*.split transformar em array*/
        console.log(songArray)
        playComposition(songArray);
    }
});

    /* a função abaixo (playSound) vai ser utilizada para dar play no som, após verificar os seguinte requisitos:
    1: Transformar em "#s_letra" o código da tecla pressionada
    2: selecionar o atributo do data key 
    if (audioElement) Se houver algum elemento que esteja de acordo com a variavel (audioElement)
    a função irá dar play no audio, mas voltar o player dela para 0
    automaticamente, para poder tocar mais de uma letra simultaneament
    if (KeyElement) Irá adicionar uma class na div para que ela seja destacada,
    com um setTimeout para que a class seja apagada após o período determinado*/

function playSound(sound) {
    let audioElement = document.querySelector(`#s_${sound}`);
    let keyElement = document.querySelector(`div[data-key="${sound}"]`);

    if(audioElement) {
        audioElement.currentTime = 0;
        audioElement.play();
    }

    if(keyElement) {
        keyElement.classList.add('active');

        setTimeout(()=>{
            keyElement.classList.remove('active');
        }, 300);
    }
}

    /* A função abaixo vai tocar uma composição conforme as teclas digitadas
    a variavel wait=o foi utilizada para que todas as teclas fossem tocadas na
    ordem do looping for, ou seja
    loop 1 (tecla 1): toca imediatamente
    loop 2 (tecla 2): toca 250ms após a primeira (let wait = 0 + 250)
    loop 3 (tecla 3): toca 500ms após a primeira ( agora let wait = 250 + 250 )
    loop ...*/

function playComposition(songArray) {
    let wait = 0;
    /* o loop (for..of) percorre o objeto em cada array
    enquanto o loop (for..in) percorre o objeto pelo índice, ex: [1] */
    for(let songItem of songArray) {
        setTimeout(()=>{
            playSound(`key${songItem}`);
        }, wait);

        wait += 250;   /* wait = wait(atual) + 250*/
    }
}