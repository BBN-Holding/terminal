const loadinglist = [
    'elastic',
    'pulse',
    'flashing',
    'collision',
    'revolution',
    'carousel',
    'typing',
    'windmill',
    'bricks',
    'fire',
    'spin',
    'falling',
    'stretching',
    'bouncing',
    'rolling']

document.getElementById('input-text').addEventListener('keyup', function (e) {
    if (e.keyCode === 13) {
        document.getElementById('input-button').click();
    }
})

document.getElementById('input-button').addEventListener('click', function () {
    const input = document.getElementById('input-text');
    if (input.value !== '') {
        const id = (Math.random() + 1).toString(36).substring(7);
        startCommand(input.value, id);
        fetch('/api/' + input.value).then(res => res.json()).then(data => {
            endCommand(data.content, id);
            document.getElementById('console').lastChild.classList.add('completed');
        });
        input.value = '';
        input.focus();
    }
})

document.getElementById('input-text').value = 'login';
document.getElementById('input-button').click();

function startCommand(text, id) {
    const consolediv = document.getElementById('console');

    // Prepare Div
    const outerdiv = document.createElement('div');
    outerdiv.id = id;
    outerdiv.classList.add('command');

    // Create Question
    const questiondiv = document.createElement('div');
    questiondiv.classList.add('question');
    questiondiv.innerHTML = '$ ' + text;
    outerdiv.appendChild(questiondiv);

    // Prepare Answer
    const answerdiv = document.createElement('div');
    answerdiv.classList.add('answer');

    // Create Loading
    const random = loadinglist[Math.floor(Math.random() * loadinglist.length)];
    const outerloadingdiv = document.createElement('div');
    outerloadingdiv.classList.add('loading');
    const loadingdiv = document.createElement('div');
    loadingdiv.classList.add('dot-' + random);
    
    outerloadingdiv.appendChild(loadingdiv);
    answerdiv.appendChild(outerloadingdiv);

    outerdiv.appendChild(answerdiv);

    consolediv.appendChild(outerdiv);
    outerdiv.scrollIntoView();
}

function endCommand(text, id) {
    const answerdiv = document.getElementById(id).getElementsByClassName('answer')[0];
    answerdiv.classList.remove(Array.from(answerdiv.classList.values()).find(x => x.startsWith('dot-')));
    answerdiv.innerHTML = text;
    answerdiv.scrollIntoView();
}