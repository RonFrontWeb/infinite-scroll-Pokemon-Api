//offset starter med at være nul

var offset = 0;
var count;


function getThePokemons(offset) {
    

        fetch(`https://pokeapi.co/api/v2/pokemon?limit=10&offset=${offset}`,{
            method:"GET",
            Headers: {"Accept":"application/JSON;"},
        })
        // .then(Response => Response.json())
        // .then(data => console.log(data))
        // .catch(err => console.log(err))
            .then(function(Response){
                return Response.json();
            })

            .then(function(data){
                var template = document.getElementById("template");
                var ul = document.querySelector(".pokeList");

                console.log(data.count);
                count = data.count;

                data.results.forEach(function(results){
                    // console.log(results.name);
                    var clone = template.content.cloneNode(true);

                    clone.querySelector("li").innerText = results.name;
                    ul.appendChild(clone);
                });

                var lastChild = document.querySelector(".pokeList li:last-child");

                observer.observe(lastChild);    
            });

        }
        
        var observer = new IntersectionObserver(function (entries) {
            if (entries[0].intersectionRatio <=  0 )return ;
            // console.log(entries[0]);
            observer.unobserve(entries[0].target);
            offset = offset + 10;
            if(offset > count) return;
            getThePokemons(offset);
        },{threshold :1});


        // getThePokemons(offset);
        getThePokemons(0);



        // andet måde at skrive det på med function udenfor og lagt som parameter 

        // var observer = new IntersectionObserver(observerFunction,{threshold :1});

        // function observerFunction(entries) {
        //     if (entries[0].intersectionRatio >=  0 )return ;
        //     // console.log(entries[0]);
        //     observer.unobserve(entries[0].target);
        //     offset = offset + 10;
        //     if(offset > count) return;
        //     getThePokemons(offset);
        // }

      

