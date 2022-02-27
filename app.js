
//su fetch funkcija
const randomImageUrl = 'https://dog.ceo/api/breeds/image/random';
const rezultatas = document.querySelector('#rezultatas');
const breedsListUrl = 'https://dog.ceo/api/breeds/list/all'


const getImage = (url, random = true) => {
    fetch(url)
        .then(response => response.json())
        .then(response => {
            if (response.status === "success")
                rezultatas.innerHTML = `<img src = "${response.message}" alt="">`;

            else
                rezultatas.textContent = random ? 'Nuotraukos užkrauti nepavyko' : 'Nepavyko rasti nuotraukos pagal tokią veislę';
        });
}

const getBreed = (url) => {
    fetch(url)
        .then(response => response.json())
        .then(response => response.message)
        .then(data => {
            let select = document.createElement('select')

            select.setAttribute('name', 'breedsList')
            document.querySelector('.select-form').appendChild(select)

            let breedsList = document.querySelector('select[name="breedsList"]')
            let emptyOption = document.createElement('option')
            emptyOption.textContent = 'Pasirinkite veisle'

            select.appendChild(emptyOption)

            Object.keys(data).forEach((value) => {
                // console.log(value, data[value])
                let breed = document.createElement('option')
                breed.textContent = value;
                breedsList.appendChild(breed)

                emptyOption.textContent = value;

                let subbreed = (data[value])
                subbreed.forEach((obj) => {
                    console.log(value + ' ' + obj)
                    let subBreed = document.createElement('option')
                    subBreed.textContent = `${value} ${obj}`;
                    subBreed.value = `${value}/${obj}`;

                    breedsList.appendChild(subBreed);
                    console.log(`https://dog.ceo/api/breed/${value}/${obj}/images/random`)
                })
            })
        })
}


window.addEventListener('load', () => {
    getImage(randomImageUrl)
    getBreed(breedsListUrl)
})

document.querySelector('.findBreed').addEventListener('click', () => {
    let breed = document.querySelector('input[name="dog-breed"]').value;
    if (breed === "") {
        rezultatas.textContent = 'Neįvesta jokia veislė'
        return false
    }
    let parsedBreed = breed.toLowerCase()
    let breedUrl = `https://dog.ceo/api/breed/${parsedBreed}/images/random`
    getImage(breedUrl, false)
})


document.querySelector('.select').addEventListener('click', () => {
    let breed = document.querySelector('select[name="breedsList"]').value;
    if (breed === "") {
        rezultatas.textContent = 'Neįvesta jokia veislė'
        return false
    };
    let parsedBreed = breed.toLowerCase()
    let breedUrl = `https://dog.ceo/api/breed/${parsedBreed}/images/random`
    selectBreed(breedUrl, false)

})

// pakeisti veisle
document.querySelector('.select').addEventListener('change', () => {
    let breed = document.querySelector('select[name="breedsList"]').value;
    if (breed === "") {
        rezultatas.textContent = 'Neįvesta jokia veislė'
        return false
    };
    let parsedBreed = breed.toLowerCase()
    let breedUrl = `https://dog.ceo/api/breed/${parsedBreed}/images/random`
    selectBreed(breedUrl, false)

})



