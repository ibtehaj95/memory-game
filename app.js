let reveal_id_1 = "0";
let reveal_pair_1 = "0";
let reveal_id_2 = "0";
let reveal_pair_2 = "0";
let reveal_count = 0;
let record = 0;

card_imgs = document.querySelectorAll(".cards-col>img");
card_divs = document.querySelectorAll(".cards-col");
score_attempt_element = document.getElementById("attempts-number");
score_matches_element = document.getElementById("cards-matched-number");
score_record_element = document.getElementById("attempts-record");
score_attempt = parseInt(score_attempt_element.textContent);
score_matches = parseInt(score_matches_element.textContent);

update_record_onscreen();

card_divs.forEach(function(card_div){
    card_div.addEventListener("click", click_function);
});

shuffle_cards(card_imgs);

conceal_all();
// reveal_matched(card);

function click_function(event){
    const event_path = event.composedPath();
    const image_id = event_path[0].id;
    // console.log(image_id);
    const element_matched_status = document.getElementById(image_id).dataset.matched;
    if(element_matched_status == "0"){
        reveal_toggle(image_id);
        if(reveal_count == 2){
            reveal_count = 0;
            if (reveal_id_1 != reveal_id_2 && reveal_pair_1 == reveal_pair_2)
            {
                // console.log("It's a Match");
                const element_1 = document.getElementById(reveal_id_1);
                const element_2 = document.getElementById(reveal_id_2);
                element_1.dataset.matched = "1";
                element_2.dataset.matched = "1";
                score_matches++;
                score_matches_element.textContent = `${score_matches}`;
            }
            
            else if (reveal_id_1 != reveal_id_2 && reveal_pair_1 != reveal_pair_2)
            {
                // console.log("Swiped Left");
                setTimeout(conceal_one, 700, reveal_id_1);  //coudn't accomplish in rock, paper, scissors
                setTimeout(conceal_one, 700, reveal_id_2);
                reveal_id_1 = "0";
                reveal_pair_1 = "0";
                reveal_id_2 = "0";
                reveal_pair_2 = "0";
            }

            record_attempt();
        }
        // console.log(reveal_id);
        // console.log(reveal_pair);
    }
    else{
        ;   //no more actions on clicking allowed after matching
    }
}

function shuffle_cards(images){
    //get 2 shuffled arrays
    let arr1 = [0, 1, 2, 3, 4, 5, 6, 7];
    let arr2 = [0, 1, 2, 3, 4, 5, 6, 7];
    arr1 = shuffle_array(arr1);
    arr2 = shuffle_array(arr2);
    // console.log(arr1);
    // console.log(arr2);
    arr3 = new Array();
    for(let i=0; i<arr1.length; ++i){
        arr3[2*i] = arr1[i];
        arr3[2*i+1] = arr2[i];
    }
    // console.log(arr3);
    for(let i=0; i<arr3.length; ++i){
        images[i].src = `./assets/pair_${arr3[i]}.jpg`;
        images[i].dataset.pair = `${arr3[i]}`;
    }
}

function shuffle_array(us_array){
    // console.log(us_array);
    const overflow = us_array.length;
    let s_array = new Array();
    for(let i=0; i<us_array.length; ++i){
        s_array.push(overflow);
    }
    for (let i=0; i<us_array.length; ++i){
        let rand = 8;   //initialize rand for while
        while(s_array.includes(rand)){
            rand = get_rand_int(us_array.length);   //keep looking for a rand until one that isn't in s_array isn't found
        }
        s_array[i] = us_array[rand];    //assign s_array's i-index the us_array's rand-index
    }
    return s_array;
}

function get_rand_int(max){
    return Math.floor(Math.random()*max);
}

function conceal_all(){
    card_imgs = document.querySelectorAll(".cards-col>img");
    card_imgs.forEach(function(image){
        const image_parent = image.parentElement;
        const image_id = image.id;
        const image_dataset = image.dataset.pair;
        const new_inner = `<img src="./assets/template.jpg" id="${image_id}" data-pair="${image_dataset}" data-matched="0" alt="template">`;
        image_parent.innerHTML = new_inner;
        // console.log(image);
    });
}

function conceal_one(image_id){
    // console.log(image_id);
    image_element = document.getElementById(image_id);
    const alt = `template`;    //alt
    const src = `./assets/template.jpg`;   //src
    image_element.alt = alt;
    image_element.src = src;
}

function reveal_toggle(image_id){
    const image_element = document.getElementById(image_id);
    let display_state = image_element.alt;
    // console.log(image_element);
    if(display_state.includes("template")){
        // const old_parent_inner = image_element.parentElement.innerHTML;
        const data_pair = image_element.dataset.pair;
        // console.log(data_pair);
        const alt = `card_${data_pair}`;    //alt
        const src = `./assets/pair_${data_pair}.jpg`;   //src
        image_element.src = src;
        image_element.alt = alt;
        // console.log(image_element);
        reveal_count++;

        if(reveal_count == 1){
            reveal_id_1 = image_id;
            reveal_pair_1 = `pair_${data_pair}`;
        }

        else if (reveal_count == 2){
            reveal_id_2 = image_id;
            reveal_pair_2 = `pair_${data_pair}`;
        }

        else{
            console.log("Error with Reveal Count");
        }
    }

    else if(display_state.includes("card")){
        // console.log("card");
        conceal_one(image_id);
        reveal_id_1 = "0";
        reveal_pair_1 = "0";
        reveal_id_2 = "0";
        reveal_pair_2 = "0";
        reveal_count = 0;
        record_attempt();
    }

    else{
        console.log("Error deciding between card display states");
    }
}

function record_attempt(){
    score_attempt++;
    score_attempt_element.textContent = `${score_attempt}`;
    if(score_matches == 8){
        console.log(parseInt(record));
        console.log(parseInt(`${score_attempt}`));
        if((parseInt(record)>parseInt(`${score_attempt}`) && parseInt(record) != 0) || (parseInt(record) == 0)){
            score_record_element.textContent = `${score_attempt}`;
            localStorage.setItem("record",JSON.stringify(`${score_attempt}`));
        }
    }
}

function update_record_onscreen(){
    const score_acq = JSON.parse(localStorage.getItem("record"));
    if(score_acq){
        score_record_element.textContent = score_acq;
        record = score_acq;
    }
    // console.log(score_acq);
}