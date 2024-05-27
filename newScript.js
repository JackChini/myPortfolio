document.addEventListener('DOMContentLoaded', function () {



    const sentences = [
      /*JAVA*/   ["java", `System.out.println(<span class="code-block-green">"Hi! I'm Giacomo Chini"</span>);
System.out.println(<span class="code-block-green">"Software Developer"</span>);`],
      /*PYTHON*/  ["python", `<span class="code-block-orange">print</span>(<span class="code-block-green">"Hi! I'm Giacomo Chini"</span>)
<span class="code-block-orange">print</span>(<span class="code-block-green">"Software Developer"</span>)`],
      /*Cpp*/  ["cpp", `std::cout &lt;&lt; <span class="code-block-green">"Hi! I'm Giacomo Chini"</span> &lt;&lt; std::endl;
std::cout &lt;&lt; <span class="code-block-green">"Software Developer"</span> &lt;&lt; std::endl;`],
      /*JAVASCRIPT*/  ["javascript", `<span class="code-block-pink">console</span>.<span class="code-block-red">log</span>(<span class="code-block-green">"Hi! I'm Giacomo Chini"</span>);
<span class="code-block-pink">console</span>.<span class="code-block-red">log</span>(<span class="code-block-green">"Software Developer"</span>);`],
      /*C*/  ["c", `<span class="code-block-orange">printf</span>(<span class="code-block-green">"Hi! I'm Giacomo Chini"</span>);
<span class="code-block-orange">printf</span>(<span class="code-block-green">"Software Developer"</span>);`]
    ];
    let timer;
    const typeInInput = (inputId, text, speed = 100, callback) => {
        let index = 0;
        let inputElement = document.getElementById(inputId);
    
        const type = () => {
            inputElement.value = text.slice(0, index) + '|';
            index++;
            
            if (index > text.length) {
                clearInterval(timer);
                inputElement.value = text; // Rimuove il cursore alla fine
                setTimeout(() => {
                    callback();
                }, 700); // Aggiungi un piccolo ritardo prima di avviare la funzione successiva
            }
        };
    
        timer = setInterval(type, speed);
    };

        const printSentence = (id, sentence, speed = 50, callback) => {
            let index = 0;
            let element = document.getElementById(id);
            timer = setInterval(() => {
                const char = sentence[index];
                if (char === '<') {
                    index = sentence.indexOf('>', index);
                }
                element.innerHTML = sentence.slice(0, index + 1);
        
                if (++index === sentence.length) {
                    clearInterval(timer);
                    setTimeout(() => {
                        callback();
                    }, 3000);
                }
            }, speed);
        };
        
        const clearContent = (id, speed = 50, callback) => {
            let element = document.getElementById(id);
            let content = element.innerHTML;
            let index = content.length;
        
            timer = setInterval(() => {
                const char = content[index - 1];
        
                if (char === ';' && content[index - 4] === '&') {
                    index -= 4;
                } else if (char === '>') {
                    index = content.lastIndexOf('<', index - 1);
                } else {
                    index--;
                }
        
                element.innerHTML = content.slice(0, index);
        
                if (index === 0) {
                    clearInterval(timer);
                    setTimeout(() => {
                        callback();
                    }, 500);
                }
            }, speed);
        };
        
        const cycleSentences = (id, sentences, speed = 50) => {
            let current = 0;
        
            const nextSentence = () => {
                if (current < sentences.length) {
                    let [language, sentence] = sentences[current];
                    document.getElementById('code-language').textContent = language; // Aggiorna l'elemento con il linguaggio corrente
                    printSentence(id, sentence, speed, () => {
                        clearContent(id, speed, () => {
                            current++;
                            nextSentence();
                        });
                    });
                } else {
                    current = 0;
                    nextSentence();
                }
            };
        
            nextSentence();
        };
        
      //  cycleSentences('contentDiv', sentences);
      
      function startSearch() {
        typeInInput('searchInput', 'let me introduce myself', 100, () => {
            document.getElementById('search-button').innerHTML = '<div class="square"></div>';
            cycleSentences('contentDiv', sentences, 35, () => {
                document.getElementById('search-button').innerHTML = '<span class="material-symbols-outlined">arrow_upward_alt</span>';
                // Qui riavviamo l'intero processo dopo un breve ritardo (ad esempio, 2 secondi)
                setTimeout(startSearch, 2000);
            });
        });
    }
    
    // Avvia il processo
    startSearch();
    
/*
    const searchButton = document.getElementById('search-button');

    searchButton.addEventListener('click', () => {
    const square = document.querySelector('.square');
    
    if (square) {
        
        clearInterval(timer); // Interrompi la funzione di scrittura
        document.getElementById('search-button').innerHTML = '<span class="material-symbols-outlined">arrow_upward_alt</span>';
    } else {
        // Fai ripartire la funzione di scrittura
        startSearch();
    }
});
*/
    
      /*
    const printSentence = (id, sentence, speed = 50) => {
        let index = 0;
        let element = document.getElementById(id);

        let timer = setInterval(function () {
            const char = sentence[index];
            
            if (char === '<') {
                index = sentence.indexOf('>', index);  // skip to greater-than
            }
            element.innerHTML = sentence.slice(0, index);

            if (++index === sentence.length) {
                document.getElementById('arrowContainer').classList.remove('hidden');
                clearInterval(timer);
            }
        }, speed);
    } 

    printSentence(
        'contentDiv',
        `<span class="java-purple">public void</span> addInfo(Developer <span class="java-brown">dev</span>) {
    <span class="java-brown">dev</span>.setName(<span class="java-blue">"Giacomo Chini"</span>);
    <span class="java-brown">dev</span>.setJob(<span class="java-blue">"Software Developer"</span>);
            
    <span class="java-green">//Main skills</span>
    List&lt;String&gt; <span class="java-brown">list</span> = <span class="java-purple">new</span> ArrayList&lt;&gt;();
    <span class="java-brown">list</span>.add(<span class="java-blue java-constant">JAVA</span>);
    <span class="java-brown">list</span>.add(<span class="java-blue java-constant">ANDROID</span>);
    <span class="java-brown">list</span>.add(<span class="java-blue java-constant">BACKEND_DEVELOPMENT</span>);
    <span class="java-brown">list</span>.add(<span class="java-blue java-constant">DATABASE</span>);
    <span class="java-brown">dev</span>.setMainSkills(<span class="java-brown">list</span>);
} `, 20
    );
    */

    var navbarLinks = document.querySelectorAll(".navbar-nav a");

    navbarLinks.forEach(function(navbarLink) {
        navbarLink.addEventListener("click", function() {
            var navbarCollapse = document.querySelector(".navbar-collapse");
            navbarCollapse.classList.remove("show");
        });
    });

    function adjustFontSize() {
        var contentDiv = document.getElementById('contentDiv');
        var screenWidth = window.innerWidth;
        var screenHeight = window.innerHeight;
        var fontSize = Math.min(screenWidth, screenHeight) * 0.035; // Regola questo valore a seconda della dimensione desiderata del font
        if(fontSize > 24){
            fontSize=24;
        }
        contentDiv.style.fontSize = fontSize + 'px';
        document.getElementById('arrowContainer').style.fontSize = 1.5+"em";
    }
    
    window.onload = adjustFontSize;
    window.onresize = adjustFontSize;
    
    function scrollToSection(sectionId) {
        const targetSection = document.getElementById(sectionId);
        targetSection.scrollIntoView({ behavior: 'smooth', block: 'center'});
        event.preventDefault();
    }
});



